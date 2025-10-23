import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/FoodCard.css';
import { spoonFetch } from '../api/spoonacular';

const FoodCard = () => {
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await spoonFetch(`/${id}/information`, { includeNutrition: true });
        if (mounted) setFoodInfo(data);
      } catch (err) {
        console.error('FoodCard fetch error', err);
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);
  return (
    <div className='recipe-details'>
      <div className='recipe-container'>
        {loading ? (
          <div>Loading recipe details...</div>
        ) : foodInfo ? (
          <>
            <img src={foodInfo.image} alt={foodInfo.title} className='recipe-image' />
            <h2 className='recipe-title'>{foodInfo.title}</h2>
            <p className='recipe-summary' dangerouslySetInnerHTML={{ __html: foodInfo.summary }}></p>
            <h3>Ingredients:</h3>
            <ul className='ingredients-list'>
              {foodInfo.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <h3>Instructions:</h3>
            <p className='instructions' dangerouslySetInnerHTML={{ __html: foodInfo.instructions }}></p>
          </>
        ) : error ? (
          <div>Error loading recipe: {error}</div>
        ) : (
          <div>No recipe data.</div>
        )}
      </div>
    </div>
  )
}

export default FoodCard