import './cart.css';
import Button from '@mui/material/Button';
import CartItems from './CartItems.js'
import axios from 'axios';
import {useEffect,useState} from 'react';
import {auth} from '../../firebase-config.js';

export default function Cart(){
  const [order, setOrder] = useState([]);
  useEffect(()=>{
    const getOrder = async() =>{
      try{
        const res =  await axios.get(`/cart?uid=${auth?.currentUser?.email}`);
        let obj = {};
        var orderTemp = [];
        res.data[0]?.order.forEach((order) => {
          if(obj[order["name"]]) {
            obj[order["name"]] += 1;
          } else {
            orderTemp.push(order);
            obj[order["name"]] = 1;
          }
        });
        console.log("temp", orderTemp);
        for(var item of orderTemp) {
          item["count"] = obj[item["name"]];
        }

      }catch(err){
        console.log(err)
      }
      setOrder(orderTemp);
    }
    getOrder();
  },[]);
  // const submitOrder = async() =>{
  //   try{

  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  return(
    <div className="cart">
      <div className="Cart-Container">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
        </div>
        {order?.map((item) => (
          <CartItems item={item}/>
        ))}
        <div className="checkoutBtn">
          <Button variant="contained" color="success">
          Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
