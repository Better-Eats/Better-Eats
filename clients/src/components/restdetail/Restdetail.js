import "./restdetail.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Restdetail({resta, setView}){
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    const getRestItems = async () => {
      try {
        const restItems = await axios.get('/menu/items');
        setMenuItems(restItems.data)
      } catch(err){
        console.log(err)
      }
    };
    getRestItems()
  }, [resta])

  return(
    <div className="restDescription-container">
      <div>
        <div className='top'>
          <IconButton aria-label="back" onClick={()=>setView('map')}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="restName">{resta.name}</div>
          <Carousel >
            {resta.photos?.map((photo, i) => (
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <img className='carouselimage' alt='carousel' height='350' key={i} src={photo} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className='menu-container'>
          {menuItems.map(menu => (
            <>
            <div className='menu-card'>
              <div className='menu-top'>
                <button className="addBtn">Add</button>
                <img className='menu-img' src={menu.image} alt=''/>
              </div>
              <div className='menu-desc'>
                <div className='menu-title'>
                  <div>{menu.name}</div>
                  <div>${menu.price}</div>
                </div>
                <div className='nut-grid'>
                  <div className='menu-na'>Calories</div>
                  <div className='menu-na'>Fat</div>
                  <div className='menu-na'>Carbs</div>
                  <div className='menu-na'>Protein</div>
                </div>
                <div className='nut-grid'>
                  <div className='menu-calories'>{menu.calories}kcal</div>
                  <div className='menu-calories'>{menu.fat}g</div>
                  <div className='menu-calories'>{menu.carbohydrates}g</div>
                  <div className='menu-calories'>{menu.protein}g</div>
                </div>
                <div className='ingredients-cont'>
                  {menu?.ingredients.map(ingr => {
                    return(
                      <div className='ingredient'>{ingr}</div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
          ))}
        </div>
    </div>
  )
}