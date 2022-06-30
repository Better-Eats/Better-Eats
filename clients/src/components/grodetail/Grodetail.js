import './grodetail.css';
import Carousel from 'react-material-ui-carousel'

export default function Grodetail({resta, setView}){
  const pseudo = [{"name": "tomato", "calories": 400, "image": resta.photos[0],'fat':5, 'carbohydrates':7, 'protein':6.8,'dietLabel':'keto plan', 'price': 8}, {"name": "potato", "calories": 450, "image": resta.photos[1],'fat':4, 'carbohydrates':9.8, 'protein':5.4,'dietLabel':'carb baby', 'price': 8}, {"name": "mushroom", "calories": 380, "image": resta.photos[0],'fat':3.5, 'carbohydrates':20, 'protein':64,'dietLabel':'all meat plan', 'price': 8},{"name": "fish", "calories": 218, "image": resta.photos[2],'fat':5.5, 'carbohydrates':9.12, 'protein':2.8,'dietLabel':'food forbidden', 'price': 15}, {"name": "tomato", "calories": 400, "image": resta.photos[0],'fat':5, 'carbohydrates':7, 'protein':6.8,'dietLabel':'keto plan', 'price': 8}, {"name": "potato", "calories": 450, "image": resta.photos[1],'fat':4, 'carbohydrates':9.8, 'protein':5.4,'dietLabel':'carb baby', 'price': 8}, {"name": "mushroom", "calories": 380, "image": resta.photos[0],'fat':3.5, 'carbohydrates':20, 'protein':64,'dietLabel':'all meat plan', 'price': 8},{"name": "fish", "calories": 218, "image": resta.photos[2],'fat':5.5, 'carbohydrates':9.12, 'protein':2.8,'dietLabel':'food forbidden', 'price': 15}];




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
          <img src={dish.image} alt="" className="menuImg"/>
          <button className="itemAdd" >
            Add
          </button>
              <div className="dishName">{dish.name}</div>
              <div className="dishInfo">
            <div className="dishInfoleft">
              <div className="dishCalorie">{dish.calories} Calories</div>
            </div>
          </div>
          <div className="dishInforight">$ {dish.price}</div>
        </div>)}
      </div>

    </div>
  )
}