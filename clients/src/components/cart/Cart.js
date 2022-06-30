import './cart.css';
import Button from '@mui/material/Button';
import CartItems from './CartItems.js'
export default function Cart(){

  return(
    <div className="cart">
      <div className="Cart-Container">
        <div className="Header">
          <h3 className="Heading">Shopping Cart</h3>
          <h5 className="Action">Remove all</h5>
        </div>
       <CartItems />
        <div className="checkoutBtn">
          <Button variant="contained" color="success">
          Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}
