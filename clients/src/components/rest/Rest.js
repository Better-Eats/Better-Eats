import './rest.css'
import StarRatings from 'react-star-ratings';

export default function Rest({resta}){
  console.log('resta', resta);
  function openYelp(url) {
    window.open(url, '_blank');
  }
  const distance = resta['distance']*0.000621371192;
  return (
    <div className="card">
      <div className="card-container">
        <div className="resta-name" onClick={() => openYelp(resta['url'])}>{ resta['name'] }</div>
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
      <div className='card-image'>
      <img id="resta" src={ resta['image_url'] } alt=""/>
      </div>
    </div>
  );
}
