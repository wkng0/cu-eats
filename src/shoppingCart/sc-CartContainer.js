import React from 'react'
import { useGlobalContext } from './sc-context'

const CartItem = ({ id, img, title, price, amount }) => {
    const {remove, increase, decrease} = useGlobalContext();
    return (
      <article className='sc-cart-item'>
        <img src={img} alt={title} width='100' display='block'/>
        <div>
          <h4 letter-spacing='0.25' line-height='1.25' margin-bottom='0.75' font-size='0.875'>{title}</h4>
          <h4 className='sc-item-price'>${price}</h4>
          {/* remove button */}
          <button className='sc-remove-btn' onClick={() => remove(id)}
          >
            remove
          </button>
        </div>
        <div>
          {/* increase amount */}
          <button className='sc-amount-btn' onClick={() => increase(id) }>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
            </svg>
          </button>
          {/* amount */}
          <p className='sc-amount'>{amount}</p>
          {/* decrease amount */}
          <button className='sc-amount-btn' onClick={() => decrease(id) }>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </button>
        </div>
      </article>
    )
  }

const CartContainer = () => {
  const { cart, total, clearCart } = useGlobalContext()
  if (cart.length === 0) {
    return (
      <section className='sc-cart'>
        {/* cart header */}
        <header>
          <h2>your shopping cart</h2>
          <h4 className='sc-empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className='sc-cart'>
      {/* cart header */}
      <header>
        <h3>your shopping cart</h3>
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
          <h4>
            total <span>{total}</span>
          </h4>
        </div>
        <button className='sc-btn sc-clear-btn' onClick={clearCart}>
          clear cart
        </button>

        <button className='sc-btn sc-pay-btn' onClick={clearCart}>
          proceed to payment
        </button>
      </footer>
    </section>
  )
}

export default CartContainer