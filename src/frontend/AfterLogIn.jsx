import { getAuth, signOut } from 'firebase/auth'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FoodItemsInAfter from './FoodItemsInAfter';
import ScrollNavFoods from './ScrollNavFoods';
import SearchBar from './SearchBar';
import '../styles/FoodItemsInAfter.css'

const AfterLogIn = () => {
  const [dropDown , setDropDown] = useState(false);
  const [displayName,setDisplayName] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const DropDownRef = useRef();
  const navigate = useNavigate()
  const auth = getAuth();

  const handleClick = async (id)=>{
    navigate(`/recipe/${id}`)
  }

  const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
  const RECIPE_API = import.meta.env.VITE_SPOONACULAR_API;
 
  useEffect(()=>{
    const user = auth.currentUser;
    if(user){
      setDisplayName(user.displayName || user.email.split('@')[0]);
    }
  },[])

  useEffect(()=>{
    const handleClickOutSide = (e)=>{
      if(DropDownRef.current && !DropDownRef.current.contains(e.target)){
        setDropDown(false);
      }
    }
    document.addEventListener('mousedown',handleClickOutSide);
    return ()=> document.removeEventListener('mousedown',handleClickOutSide);
  },[])

  const handleSignOut = ()=> {
    signOut(auth).then(()=> navigate('/SignIn'))
  }

  const handleSearch = async (query) => {
    const res = await fetch(`${RECIPE_API}/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`);
    const data = await res.json();
    setResults(data.results);
    setShowResults(true);
    //console.log(`${RECIPE_API}/complexSearch?query=${query}&apiKey=${API_KEY}`);
  }

  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>🍽 Recipe App</div>
        <div style={styles.userSection} ref={DropDownRef}>
          <span style={styles.username} onClick={() => setDropDown(!dropDown)}>
            {displayName} ⌄
          </span>
          {dropDown && (
            <div style={styles.dropdown}>
              <div style={styles.item} onClick={() => navigate("/signin")}>
                🔁 Switch Account
              </div>
              <div style={styles.item} onClick={handleSignOut}>
                🚪 Sign Out
              </div>
            </div>
          )}
        </div>
      </header>

      <SearchBar onSearch={handleSearch} />
      <ScrollNavFoods />
      
        <div className='food-items-container'>
          {showResults ? (
            Array.isArray(results) &&
            results.length > 0 ? (
              results.map((item) => (
                  <div key={item.id} className="food-card" onClick={() => handleClick(item.id)}>
                    <h3 className="food-title" >{item.title}</h3>
                    <img src={item.image} alt={item.title} width="200" className="food-image"/>
                  </div>
              ))
            ) : (
              <div>
                <p>No matching</p>
                <button onClick={() => setShowResults(false)}>🔙 Go Back</button>
              </div>
            )
          ) : (
            <FoodItemsInAfter />
          )}
      </div>
          <button onClick={() => setShowResults(false)}>🔙 home</button>
     </div>
  )

}
const styles = {
  header : {
    position:'sticky',
    top:0,
    zIndex:1000,
    padding : '10px 20px',
    backgroundColor : '#282c34',
    color :'white',
    display : 'flex',
    justifyContent : 'space-between',
    alignItems : 'center'
  },
  logo : {
    fontWeight :'bold',
    fontSize : '20px'
  },
  userSection : {
    position : 'relative',
    cursor : 'pointer'
  },
  username :{
    fontWeight : '500'
  },
  dropdown : {
    position : 'absolute',
    top : '100%',
    right : 0,
    backgroundColor : '#fff',
    color : '#000',
    border : '1px solid #ccc',
    borderRadius : '4px',
    overflow : 'hidden',
    minWidth : '150px',
    zIndex : 10
  },
  item:{
    padding :'10px',
    borderBottom : '1px solid #eee',
    cursor : 'pointer'
  }
}
export default AfterLogIn