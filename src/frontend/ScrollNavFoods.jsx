import React from 'react';
import '../styles/ScrollNavFoods.css';

const foodItems = [
  'Pasta', 'Biryani', 'Roti', 'Chapathi', 'Pizza', 'Burger', 'Salad', 'Sushi','payasam','cova','fried rice','tamride rice','noodles'
];

const ScrollNavFoods = () => {
  return (
    <div className="scroll-nav-container">
      <div className="scroll-nav-track">
        {foodItems.map((item, index) => (
          <span key={index} className="scroll-nav-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default ScrollNavFoods;