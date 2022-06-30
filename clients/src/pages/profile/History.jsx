import React from 'react';

const HistoryList = ({item}) => {




  return (
    <div className="historyList">
      <div className='date'>{item.date}</div>
      {item.items.map((food, index) =>
        <div className="items" key={index}>
          <span>{food.foodName}</span>
          <span>calories: {food.calories}</span>
          <span>carbohydrates: {food.carbohydrates}</span>
          <span>fat: {food.fat}</span>
          <span>protein: {food.protein}</span>
        </div>
      )}
    </div>
  )
};


export default HistoryList;