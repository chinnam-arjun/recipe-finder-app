import React, { useState, useEffect } from 'react';
import '../styles/FoodItemsInAfter.css';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const FoodItemsInAfter = () => {
  const Navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);    
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [lastFetched, setLastFetched] = useState(null);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showLoaderOverlay, setShowLoaderOverlay] = useState(false);

  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const RECIPE_API = import.meta.env.VITE_SPOONACULAR_API;

  // fetch function so we can refresh on demand
  const fetchRecipesOrCache = async (force = false) => {
    setLoading(true);
    setError(null);
    try {
      const cachedData = !force && localStorage.getItem('cachedFoodItems');
      if (cachedData) {
        setFoodItems(JSON.parse(cachedData));
        setLastFetched(new Date().toISOString());
        setLoading(false);
        return;
      }

      const res = await fetch(`${RECIPE_API}/random?number=30&include-tags=vegetarian,dessert&apiKey=${API_KEY}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      // cache a smaller subset to keep localStorage reasonable
      const recipes = Array.isArray(data.recipes) ? data.recipes : [];
      localStorage.setItem('cachedFoodItems', JSON.stringify(recipes));
      setFoodItems(recipes);
      setLastFetched(new Date().toISOString());
      setLoading(false);
    } catch (err) {
      setError(err.message || String(err));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipesOrCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(()=>{
  //     const cachedData = localStorage.getItem('cachedFoodItems');
  //     if(cachedData) {
  //       setFoodItems(JSON.parse(cachedData));
  //       setLoading(false);
  //     }
  // },[])
  const handleClick = async (id)=>{
    Navigate(`/recipe/${id}`)
  }

  const handleRefresh = () => fetchRecipesOrCache(true);

  const toggleView = () => setViewMode((v) => (v === 'grid' ? 'list' : 'grid'));

  const openLoaderPreview = () => {
    // show overlay briefly to preview loader
    setShowLoaderOverlay(true);
    setTimeout(() => setShowLoaderOverlay(false), 1200);
  };

  return (
    <div className='food-items-root'>
      <div className='food-items-toolbar'>
        <div className='toolbar-left'>
          <button className='btn' onClick={toggleView} aria-pressed={viewMode === 'list'}>
            {viewMode === 'grid' ? 'Switch to list' : 'Switch to grid'}
          </button>
          <button className='btn' onClick={handleRefresh}>Refresh</button>
        </div>
        <div className='toolbar-right'>
          <button className='btn' onClick={() => setShowInfoPanel((s) => !s)}>Loading Info</button>
          <button className='btn' onClick={openLoaderPreview}>Preview Loader</button>
        </div>
      </div>

      {showInfoPanel && (
        <div className='loading-info-panel'>
          <div><strong>Loading:</strong> {String(loading)}</div>
          <div><strong>Last fetched:</strong> {lastFetched || 'never'}</div>
          <div><strong>Items:</strong> {foodItems.length}</div>
          <div><strong>Error:</strong> {error || 'none'}</div>
        </div>
      )}

      <div className={viewMode === 'grid' ? 'food-items-container' : 'food-items-list'}>
        {loading ? (
          <Loading count={8} />
        ) : foodItems.length > 0 ? (
          foodItems.map((item) => (
            <div key={item.id} className={viewMode === 'grid' ? 'food-card' : 'food-card list-view'} onClick={() => handleClick(item.id)}>
              <img src={item.image} alt={item.title} className="food-image" />
              <h3 className="food-title">{item.title}</h3>
              {viewMode === 'list' && <p className='food-summary'>{item.summary ? item.summary.replace(/<[^>]+>/g, '').slice(0,160) : ''}</p>}
            </div>
          ))
        ) : (
          <div>No food items found.</div>
        )}
      </div>

      {showLoaderOverlay && (
        <div className='loader-overlay'>
          <Loading count={6} message={'Simulating loading...'} />
        </div>
      )}
    </div>
  );

};

export default FoodItemsInAfter;
