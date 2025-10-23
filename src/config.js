// Central app configuration
export const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

export const SPOONACULAR = {
  BASE: import.meta.env.VITE_SPOONACULAR_API || 'https://api.spoonacular.com/recipes',
  KEY: import.meta.env.VITE_SPOONACULAR_API_KEY || '',
  // default cache TTL: 24 hours
  CACHE_TTL: Number(import.meta.env.VITE_SPOONACULAR_CACHE_TTL_MS) || 24 * 60 * 60 * 1000,
};

// Utility to build full API url
export function buildSpoonacularUrl(path, params = {}) {
  const url = new URL(`${SPOONACULAR.BASE}${path}`);
  // add api key
  if (SPOONACULAR.KEY) url.searchParams.set('apiKey', SPOONACULAR.KEY);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  return url.toString();
}
