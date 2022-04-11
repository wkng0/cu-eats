import React,{useContext, useEffect} from 'react'
import { DishContext } from './sc-context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


const CartItem = ({ id,img ,title, variant,price,amount }) => {
    
    const {cart,remove, increase, decrease} = useContext(DishContext);

    localStorage.setItem("cart",JSON.stringify(cart))
    return (
      <article className='sc-cart-item'>
          <img src={img} alt={title} width='100' display='block' className='sc-cart-photo'/>
        
        <div>
          <h5 letter-spacing='0.25' line-height='1.25' margin-bottom='0.75' font-size='0.875'>{title}</h5>
          <h6 className='sc-item-price'>{variant}</h6>
          <h6 className='sc-item-price'>$&nbsp;{price}</h6>
          {/* remove button */}
          <button className='sc-remove-btn' onClick={() => remove({id:id,variant:variant})}
          >
            remove
          </button>
        </div>
        <div>
          {/* increase amount */}
          <button className='sc-amount-btn' disabled={amount===2} onClick={() => increase({id:id,variant:variant}) }>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
            </svg>
          </button>
          {/* amount */}
          <p className='sc-amount'>{amount}</p>
          {/* decrease amount */}
          <button className='sc-amount-btn'  onClick={() => decrease({id:id,variant:variant}) }>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </button>
        </div>
      </article>
    )
  }

const CartContainer = () => {

  const { canteen, cart, total, clearCart } = useContext(DishContext);

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
        <h6>{canteen}</h6>
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
          <Button 
                size="small" 
                href="/checkout"
                sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
          >
            <ShoppingCartCheckoutIcon fontSize="small"/>
              CHECKOUT
          </Button>
        </Box>
      </footer>
    </section>
  )
}

export default CartContainer