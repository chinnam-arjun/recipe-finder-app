import { buildSpoonacularUrl, SPOONACULAR } from '../config';

const inFlight = new Map();

function cacheKey(url) {
  return `spoon_cache::${url}`;
}

function getCached(url) {
  try {
    const raw = localStorage.getItem(cacheKey(url));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.t > (SPOONACULAR.CACHE_TTL || 24 * 60 * 60 * 1000)) {
      localStorage.removeItem(cacheKey(url));
      return null;
    }
    return parsed.v;
  } catch (e) {
    console.error('Cache read error', e);
    return null;
  }
}

function setCached(url, value) {
  try {
    localStorage.setItem(cacheKey(url), JSON.stringify({ t: Date.now(), v: value }));
  } catch (e) {
    console.error('Cache write error', e);
  }
}

export async function spoonFetch(path, params = {}, { force = false } = {}) {
  const url = buildSpoonacularUrl(path, params);

  if (!force) {
    const cached = getCached(url);
    if (cached) return cached;
  }

  // Deduplicate in-flight requests
  if (inFlight.has(url)) {
    return inFlight.get(url);
  }

  const p = fetch(url).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Spoonacular API ${res.status}: ${text}`);
    }
    const json = await res.json();
    setCached(url, json);
    inFlight.delete(url);
    return json;
  }).catch((err) => {
    inFlight.delete(url);
    throw err;
  });

  inFlight.set(url, p);
  return p;
}
