import './cart.css';
import {useState} from 'react';

export default function CartItems({item}){
  const [count, setCount] = useState(item["count"]);
  console.log("item", item);
  return(
    <div>
    { item.count === 0? (<div></div>) : (<div className="Cart-Items">
    <div className="image-box">
    <img src={item.image} alt="" style={{ height: '120px' }} />
    </div>
    <div className="about">
      <h1 className="title">{item.name}</h1>
      <h3 className="subtitle">{item.dietLabel}</h3>
    </div>
    <div className="counter">
      <div className="btn" onClick={() =>setCount(count+1)}>+</div>
      <div className="count">{item.count}</div>
      <div className="btn"  onClick={() => setCount(count-1)}>-</div>
    </div>
    <div className="prices">${item.calories}</div>
    </div>)}
    </div>
  )
}