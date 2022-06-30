import './cart.css';
import {useState} from 'react';

export default function CartItems(){

  const [count, setCount] = useState(1);

  return(
    <div>
    { count === 0? (<div></div>) : (<div className="Cart-Items">
    <div className="image-box">
    <img src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80" alt="" style={{ height: '120px' }} />
    </div>
    <div className="about">
      <h1 className="title">Apple Juice</h1>
      <h3 className="subtitle">250ml</h3>
    </div>
    <div className="counter">
      <div className="btn" onClick={() =>setCount(count+1)}>+</div>
      <div className="count">{count}</div>
      <div className="btn"  onClick={() => setCount(count-1)}>-</div>
    </div>
    <div className="prices">$8</div>
    </div>)}</div>
  )
}