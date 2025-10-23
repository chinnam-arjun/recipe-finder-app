import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import '../styles/FoodCard.css';

const FoodCard = () => {
  const [foodInfo, setFoodInfo] = useState(null);
  const {id}= useParams();
  try {
    const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const RECIPE_API = import.meta.env.VITE_SPOONACULAR_API;
    const ApiFoodMakeInfo = async () => {
      const res = await fetch(`${RECIPE_API}/${id}/information?apiKey=${API_KEY}&includeNutrition=true`);
      const data = await res.json();
      setFoodInfo(data);
    }
    ApiFoodMakeInfo();
  } catch (error) {
    alert(`fetching error ${error.message}`);
  }
  return (
    <div className='recipe-details'>
      <div className='recipe-container'>
        {foodInfo ? (
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
        ) : (
          <div>Loading recipe details...</div>
        )}
      </div>
    </div>
  )
}

export default FoodCard