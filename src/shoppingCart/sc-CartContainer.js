import React,{useContext, useEffect} from 'react'
import { DishContext } from './sc-context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom';

// PROGRAM CartItem - Program to display selected food dishes
// PROGRAMMER: Tam, Lee Yau
// CALLING SEQUENCE: CALL CartItem(id, img, title, variant, price, amount)
// VERSION 1: written 2-4-2022
// REVISION 1.1: 5-4-2022 refined the display items
// PURPOSE: To show the food dishes, canteen, quantities, and functions allowed for users to operate 
// DATA STRUCTURES:
//  Variable id - STRING
//  Variable img - STRING
//  Variable title - STRING
//  Variable variant - STRING
//  Variable price - INTEGER
//  Variable amount - INTEGER
// ALGORITHM: 
//  if the 'increase' button is clicked, the quantity is increased by 1
//  if the 'decrease' button is clicked, the quantity is decreased by 1
//  if the 'remove' button is clicked, the selected food dish is deleted

const CartItem = ({ id, img, title, variant, price, amount }) => {
    
    const {cart,remove, increase, decrease,clearCart, amount:totalAmount } = useContext(DishContext);
    localStorage.setItem("cart",JSON.stringify(cart))
    return (
      <article className='sc-cart-item'>
          <img src={img} alt={title} width='100' display='block' className='sc-cart-photo'/>
        
        <div>
          <h5 letter-spacing='0.25' line-height='1.25' margin-bottom='0.75' font-size='0.875'>{title}</h5>
          <h6 className='sc-item-price'>{variant}</h6>
          <h6 className='sc-item-price'>$&nbsp;{price}</h6>
          {/* remove button */}
          <button className='sc-remove-btn' onClick={() =>{
            remove({id:id,variant:variant})
            if(cart.length==1){
              clearCart();
            }
          }}
          >
            remove
          </button>
        </div>
        <div>
          {/* increase amount */}
          <button className='sc-amount-btn' disabled={amount===5} onClick={() => increase({id:id,variant:variant}) }>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
            </svg>
          </button>
          {/* amount */}
          <p className='sc-amount'>{amount}</p>
          {/* decrease amount */}
          <button 
            className='sc-amount-btn'  
            onClick={() => {
              decrease({id:id,variant:variant})
              if(totalAmount==1){
                clearCart();
              }
              
            
            }}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </button>
        </div>
      </article>
    )
  }

// PROGRAM CartContainer - Program to display calculated total prices and functions
// PROGRAMMER: Tam, Lee Yau
// CALLING SEQUENCE: CALL CartContainer
// VERSION 1: written 2-4-2022
// REVISION 1.1: 9-4-2022 update on font
// REVISION 1.2: 13-4-2022 add checkout link
// PURPOSE: To show the calculated total prices and empty cart messages
// DATA STRUCTURES:
//  Variable cart - OBJECT ARRAY
//  Variable total - INTEGER
// ALGORITHM: 
//  if the 'INCREASE' / 'DECREASE' / 'REMOVE' is clicked, the total price will be updated
//  if the 'CLEAR CART' is clicked, the empty shopping cart message is shown
//  if the 'CHECKOUT' button is clicked, the shopping status would proceed to check out

const CartContainer = () => {

  const { canteen, cart, total, clearCart } = useContext(DishContext);
  /*
  const checkout = ()=>{
    if(localStorage.getItem('type')=="guest"){
      window.location.assign("/login");
    }else if(localStorage.getItem('type')=="user"){
      window.location.assign("/checkout");
    }
  }
  */

  if (cart.length === 0) {
    localStorage.setItem("cart","[]")
    localStorage.setItem("cart","[]")
    localStorage.setItem("cart","[]")
    return (
      <section className='sc-cart'>
        {/* cart header */}
        <header>
          <h2>Your Shopping Cart</h2>
          <h4 className='sc-empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className='sc-cart'>
      {/* cart header */}
      <header>
        <h3>Your Shopping Cart</h3>
        <h6>{localStorage.getItem("cartCanteen")}</h6>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='sc-cart-total'>
          <h5>
            total <span>$&nbsp;{total}</span>
          </h5>
        </div>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button 
                size="small" 
                sx={{border: 2, bgcolor: '#transparent', color: '#86888A', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
                onClick={clearCart}>
            <DeleteIcon fontSize="small" />
              CLEAR CART
          </Button>
          <Link to={localStorage.getItem('type')=="guest"?"/login":"/checkout"} style={{textDecoration: 'none'}}>
            <Button 
                  size="small" 
                  //onClick={checkout}
                  sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
            >
              <ShoppingCartCheckoutIcon fontSize="small"/>
                CHECKOUT
            </Button>
          </Link>
        </Box>
      </footer>
    </section>
  )
}

export default CartContainer