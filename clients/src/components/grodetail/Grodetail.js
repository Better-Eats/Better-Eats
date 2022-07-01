import './grodetail.css';
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';
import {auth} from '../../firebase-config.js';
import {useEffect,useState} from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Grodetail({resta, setView}){
  const [pseudo, setPseudo] = useState([])

  useEffect(()=> {
    const getGro = async()=>{
      try{
        const data = await axios.get('/gro');
        setPseudo(data.data);
        console.log(data.data);
      }catch(err){
        console.log(err)
      }
    }
    getGro();
  },[])



const addCart = async(e, order) =>{
  e.preventDefault()
  try{
    // order['image']=order['url'];
    // order['name'] =order['description'];
    const res = await axios.post('/cart', {uid: auth.currentUser.uid, order});
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
                <img className='carouselimage' alt='carousel' height='350' key={i} src={photo} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className='menu-container'>
          {pseudo.map(menu => (
            <>
            <div className='menu-card'>
              <div className='menu-top'>
                <button className="addBtn" onClick={(e)=>addCart(e, menu)}>
                  Add
                </button>
                <img className='menu-img' src={menu.url} alt=''/>
              </div>
              <div className='menu-desc'>
                <div className='menu-title'>
                  <div>{menu.description}</div>
                  {/* <div>${menu.price}</div> */}
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
                  {menu?.ingredients?.split(',').map(ingr => {
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

    // <div className="restDescription-container">
    //     <div>
    //       <IconButton aria-label="back" onClick={()=>setView('map')}>
    //         <ArrowBackIcon />
    //       </IconButton>
    //     </div>
    //   <div className='restHeaderSection'>
    //     <div className="restName">{resta.name}</div>
    //   </div>
    //   <Carousel>
    //     {resta.photos?.map((photo, i) => (
    //       <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    //         <img height='350' key={i} src={photo} alt="" />
    //       </div>
    //     ))}
    //   </Carousel>
    //   <div className="restMenulist">
    //     {pseudo.map((dish) => <div className="restMenu">
    //       <img src={dish.url} alt="" className="menuImg"/>
    //       <button className="itemAdd" onClick={(e)=>addCart(e, dish)}>
    //         Add
    //       </button>
    //       <div className="dishName">{dish.description}</div>
    //       <div className="dishInfo">
    //         <div className="dishInfoleft">
    //           <div className="dishCalorie">{dish.calories} Calories</div>
    //           <div className="dishCalorie">{dish.fat} g</div>
    //           <div className="dishCalorie">{dish.carbohydrates}g</div>
    //           <div className="dishCalorie">{dish.protein} g</div>
    //         </div>
    //       </div>
    //     </div>)}
    //   </div>
    // </div>
  )
}