import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import MainComponent from './frontend/MainComponent';
import SignIn from './frontend/SignIn';
import SignUp from './frontend/SignUp';
import AfterLogIn from './frontend/AfterLogIn'
import SearchBar from './frontend/SearchBar'
import FoodItemsInAfter from './frontend/FoodItemsInAfter';
import FoodCard from './frontend/FoodCard';
// import SearchResults from './frontend/SearchResults';

const App = () => {
  // try {
  //   const ApiFetch = async ()=>{ 
  //     const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  //     const RECIPE_API = import.meta.env.VITE_SPOONACULAR_API;
  //     const query = `pasta`
  //     const API = async ()=>{ 
  //       const response = await fetch(`${RECIPE_API}/716429/information?apiKey=${API_KEY}&includeNutrition=true`);
  //       if (!response.ok) {
  //         alert(`error occured ${response.status}`,response.status)
  //       }
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //     API();
  //   }
  //   ApiFetch();
  // } catch (error) {
  //   // Improved error message
  //   console.error('Error while fetching:', error);
  //   alert(`Error while fetching: ${error.message}`);
  // }
  return (
   <Router>
    <Routes>
      <Route path='/' element={<MainComponent />}></Route>
      <Route path='/SignIn' element={<SignIn/>}></Route>
      <Route path='/SignUp' element={<SignUp/>}></Route>
      <Route path='/Home' element={<AfterLogIn />} />
      <Route path='/OnSearchIcon' element={<SearchBar/>}></Route>
      <Route path='/RecipeCardOnSearch' element={<FoodItemsInAfter />}></Route>
      {/* <Route path='/SearchResults' element={<SearchResults/>}/> */}
      <Route path='/recipe/:id' element={<FoodCard/>}/>
    </Routes>
   </Router>
  )
}

export default App