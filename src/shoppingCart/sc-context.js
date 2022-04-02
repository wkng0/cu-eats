import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './sc-data'
import CartContainer from './sc-CartContainer'
import './sc-context.css';

const AppContext = React.createContext()

const CartItem = ({ id, img, title, price, amount }) => {
    const {remove, increase, decrease} = useGlobalContext();
    return (
      <article className='sc-cart-item'>
        <img src={img} alt={title} width='100' display='block'/>
        <div>
          <h4 letter-spacing='0.25' line-height='1.25' margin-bottom='0.75' font-size='0.875' >{title}</h4>
          <h4 className='sc-item-price'>${price}</h4>
          {/* remove button */}
          <button className='sc-remove-btn' onClick={() => remove(id)}>
            remove
          </button>
        </div>
        <div>
          {/* increase amount */}
          <button className='sc-amount-btn' viewBox='0 0 20 20' onClick={() => increase(id) }>
            <svg xmlns='http://www.w3.org/2000/svg' >
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

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const clearCart = () => {
    dispatch( { type:'CLEAR_CART' } )
  }

  const remove = (id) => {
    dispatch( { type:'REMOVE', payload: id })
  }

  const increase = (id) => {
    dispatch( { type:'INCREASE', payload: id})
  }

  const decrease = (id) => {
    dispatch( { type:'DECREASE', payload: id})
  }

  // const fetchData = async () => {
  //   dispatch({ type:'LOADING' });
  //   const response = await fetch(url);
  //   const cart = await response.json();
  //   dispatch({ type:'DISPLAY_ITEMS', payload: cart})
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  useEffect(() => {
    dispatch({ type:'GET_TOTALS'})
  }, [state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        return { ...state, cart: [] }
    }

    if (action.type === 'REMOVE') {
        return { 
        ...state, 
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
        }
    }

    if (action.type === 'INCREASE') {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem
        })
        return { ...state, cart: tempCart }
    }

    if (action.type === 'DECREASE') {
        let tempCart = state.cart
            .map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount - 1 }
            }
            return cartItem
        }).filter((cartItem) => cartItem.amount !== 0)
        return { ...state, cart: tempCart }
    }

    if (action.type === 'GET_TOTALS') {
        let { total, amount } = state.cart.reduce(
            (cartTotal, cartItem) => {
            const { price, amount } = cartItem
            const itemTotal = price * amount;

            cartTotal.total += itemTotal
            cartTotal.amount += amount
            return cartTotal
        }, {
            total: 0,
            amount: 0
        })
        total = parseFloat(total.toFixed(2))

        return { ...state, total, amount }
    }

    // if (action.type === 'LOADING') {
    //     return { ...state, loading: true }
    // }

    if (action.type === 'DISPLAY_ITEMS') {
        return { ...state, cart: action.payload, loading: false }
    }

    return state
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

function App() {
  const {loading} = useGlobalContext()
  if (loading) {
    
  }
  return (
    <main>
      <CartContainer />
    </main>
  )
}

function ShoppingCart(){
  return(
    <AppProvider>
      <App />
    </AppProvider>
  )
}

export { AppContext, AppProvider, ShoppingCart}