import './rest.css'
import StarRatings from 'react-star-ratings';

export default function Rest({resta}){
  console.log('resta', resta);
  return (
    <div className="card">

      <div className="card-container">
        <a href={resta['url']}>{ resta['name'] }</a>
        <div className = 'price-star'>{resta['price']+'  '}

        </div>
        <div>Phone: {resta['display_phone']}</div>
        <div>Address: {resta['location']['address1']}, {resta['location']['city']}</div>

      </div>
      <div className='card-image'>
      <img id="resta" src={ resta['image_url'] } alt=""/>
      </div>
    </div>
  );
}
