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
        const res =  await axios.get(`/cart?uid=${auth?.currentUser?.uid}`);
        let obj = {};
        var orderTemp = [];
        res.data[0]?.order.forEach((order) => {
          if(obj[order["description"]]) {
            obj[order["description"]] += 1;
          } else {
            orderTemp.push(order);
            obj[order["description"]] = 1;
          }
        });
        console.log("temp", orderTemp);
        for(var item of orderTemp) {
          item["count"] = obj[item["description"]];
        }

      }catch(err){
        console.log(err)
      }
      setOrder(orderTemp);
    }
    getOrder();
  },[]);
  const submitOrder = async() =>{
    try{
      let items = [];
      let totalCarbs =0;
      let totalFat = 0;
      let totalProtein = 0;
      let totalcal = 0;
      order.map((item) => {
        totalCarbs += item["carbohydrates"];
        totalFat += item["fat"];
        totalProtein += item["protein"];
        totalcal += item["calories"];
        items.push({"foodName": item['description'], "calories": item['calories'], "carbohydrates": item["carbohydrates"], "fat": item["fat"],"protein": item["protein"]});
      })
      const date = new Date()
      date.setHours(0, 0, 0, 0);
      await axios.post('/cal/cart', {"uid": auth.currentUser.uid, "date": date.toISOString(), "items": items, totalCarbs, totalFat, totalProtein, totalcal});
      await axios.post('/cart/empty', {"uid": auth.currentUser.uid})
        setOrder([]);
    }catch(err){
      console.log(err)
    }
  }
  return(
    <div className="cart">
      <div className="Cart-Container">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
        </div>
        <div className="itemList" >
        {order?.map((item) => (
          <CartItems item={item}/>
        ))}
        </div>
        <div className="checkoutBtn">
          <Button variant="contained" color="success" onClick={submitOrder}>
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
