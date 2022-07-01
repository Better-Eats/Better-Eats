import './cart.css';
import {useState} from 'react';

export default function CartItems({item}){
  const [count, setCount] = useState(item["count"]);
  console.log("count", count);

  return(
    <div>
    { item.count === 0? (<div></div>) : (<div className="Cart-Items">
    <div className="image-box">
    <img src={item.url || item.image} alt="" style={{ height: '120px' }} />
    </div>
    <div className="about">
      <h1 className="title">{item.description ||item.name}</h1>
      <h3 className="subtitle">Serving Size: {item.servingSize}</h3>
    </div>
    <div className="counter">
      <div className="btn"  onClick={() => setCount(count-1)}>-</div>
      <div className="count">{count >= 0 ? count : 0}</div>
      <div className="btn" onClick={() =>setCount(count+1)}>+</div>
    </div>
    <div className="prices">{item.calories} calories</div>
    </div>)}
    </div>
  )
}