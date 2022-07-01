import './grodetail.css';
import Carousel from 'react-material-ui-carousel'
import axios from 'axios';
import {auth} from '../../firebase-config.js';
import {useEffect,useState} from 'react';

export default function Grodetail({resta, setView}){

  const [pseudo, setPseudo] = useState([])
  useEffect(()=> {
    const getGro = async()=>{
      try{
        const data = await axios.get('/gro');
        setPseudo(data.data);
      }catch(err){
        console.log(err)
      }
    }
    getGro();
  },[pseudo])



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
     <div><button onClick={()=>setView('map')} >Back</button></div>
     <div className='restHeaderSection'>
          <div className="restName">{resta.name}</div>
        </div>
      <Carousel>
          {resta.photos?.map((photo, i) => (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <img height='350' key={i} src={photo} alt="" />
            </div>
          ))}
        </Carousel>
      <div className="restMenulist">
        {pseudo.map((dish) => <div className="restMenu">
          <img src={dish.url} alt="" className="menuImg"/>
          <button className="itemAdd" onClick={(e)=>addCart(e, dish)}>
            Add
          </button>
              <div className="dishName">{dish.description}</div>
              <div className="dishInfo">
            <div className="dishInfoleft">
              <div className="dishCalorie">{dish.calories} Calories</div>
              <div className="dishCalorie">{dish.fat} g</div>
              <div className="dishCalorie">{dish.carbohydrates}g</div>

              <div className="dishCalorie">{dish.protein} g</div>

            </div>
          </div>
        </div>)}
      </div>

    </div>
  )
}