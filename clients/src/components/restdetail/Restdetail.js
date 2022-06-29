import "./restdetail.css";
import Carousel from 'react-material-ui-carousel'
import StarRatings from 'react-star-ratings';

export default function Restdetail({resta, setView}){
  const distance = resta['distance']*0.000621371192;

  return(
   <div className="restDescription-container">
     <div><button onClick={()=>setView('map')} >Back</button></div>
      <Carousel>
          {resta.photos?.map((photo, i) => (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <img height='400' key={i} src={photo} />
            </div>
          ))}
        </Carousel>
        {/* <img className='descCoverImg' height='400' src={resta.image_url} alt="" /> */}
        <div className='restHeaderSection'>
          <div className="restName">{resta.name}</div>
           <div className = 'price-star'>{resta['price']+'  '}
          <StarRatings rating={resta['rating']} starRatedColor="#DA2C38"
              numberOfStarts={5} starDimension="15px" starSpacing="1px" name='rating'/>
          </div>
          <div>Phone: {resta['display_phone']}</div>
          <div>Address: {resta['location']['address1']}, {resta['location']['city']}</div>
          <div className='open-info'>
            <div>{resta['open_now']? 'Open': 'Closed'}</div>
            <div>{distance.toFixed(2)} miles away</div>
          </div>
        </div>
    </div>
  )
}