import './rest.css'
import StarRatings from 'react-star-ratings';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import {useState} from 'react';

export default function Rest({resta, setView, setClicked}){

  function openYelp(url) {
    window.open(url, '_blank');
  }

  const getDetail = (e) => {
    e.preventDefault();
    axios.post('/yelp/details', {id: resta['id']})
    .then((res) => {
      setClicked(res.data);
      setView('resta');
    })
    .catch((err) => console.log(err));

  }

  const distance = resta['distance']*0.000621371192;
  return (
    <div className="card">
      <div className="card-container" onClick={getDetail}>
        <div className="resta-name" onClick={() => openYelp(resta['url'])}>{ resta['name'] }</div>
        <div className = 'price-star'>{resta['price']+'  '}
        <StarRatings rating={resta['rating']} starRatedColor="#DA2C38"
            numberOfStars={5} starDimension="15px" starSpacing=".5px" name='rating'/>
        </div>
        <div>Phone: {resta['display_phone']}</div>
        <div>Address: {resta['location']['address1']}, {resta['location']['city']}</div>
        <div className='open-info'>
          <div>{distance.toFixed(2)} miles away</div>
        </div>
        {/* {resta.categories?.map((cat) => (
          <Chip key={cat.title} size='small' label={cat.title} className='chip' />
        ))} */}
      </div>
      <div className='card-image'>
      <img id="resta" src={ resta['image_url'] } alt=""/>
      </div>
    </div>
  );
}
