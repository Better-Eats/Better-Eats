import "./restdetail.css";
import Carousel from 'react-material-ui-carousel'
import StarRatings from 'react-star-ratings';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {menuData} from './menuData.js';
import axios from 'axios';
import {auth} from '../../firebase-config.js';

export default function Restdetail({resta, setView}){
  const distance = resta['distance']*0.000621371192;
  console.log({resta})
  const addCart = async(e, order) =>{
    e.preventDefault()
    try{
      const res = await axios.post('/cart', {uid: auth.currentUser.email, order});
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }

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
              <img className='carouselimage' height='350' key={i} src={photo} alt="" />
            </div>
          ))}
        </Carousel>
       </div>
        {/* <div className='restHeaderSection'>
           <div className = 'price-star'>{resta['price']+'  '}
          <StarRatings rating={resta['rating']} starRatedColor="#DA2C38"
              numberOfStarts={5} starDimension="15px" starSpacing="1px" name='rating'/>
          </div>
          <div>Phone: {resta['display_phone']}</div>
          <div>Address: {resta['location']['address1']}, {resta['location']['city']}</div>
          <div className='open-info'>
            <div>{resta['open_now']? 'Open': 'Closed'}</div>
          </div>
        </div> */}
        <div className='menu-container'>
        {menuData.map(menu=>(
          <>
          <div className='menu-card'>
            <div className='menu-top'>
                <button className="addBtn" onClick={(e)=>addCart(e, menu)} >
                Add
              </button>
              <img className='menu-img' src={menu.image} alt=''/>
            </div>
            <div className='menu-desc'>
              <div className='menu-title'>
                  <div>{menu.name}</div>
                  <div>${menu.price}</div>
                </div>
                {/* <div className='menu-calories'>{menu.calories} Calories</div> */}
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
                {menu?.ingredients.map(ingr=>{
                  return(
                    <div className='ingredient'>
                      {ingr}
                    </div>
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