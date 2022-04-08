import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './sc-data'
import CartContainer from './sc-CartContainer'
import './sc-context.css';
import reducer from './reducer'
import NewNACanteen from '../newNaCanteen';

const DishContext = React.createContext()



const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
}



const DishProvider = ({ children }) => {
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
  const addToCart = (id)=>{
    console.log("added to cart")
    dispatch({type:"ADD_TO_CART", payload: id})
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
    <DishContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        addToCart
      }}
    >
      {children}
    </DishContext.Provider>
  )
}




export { DishContext, DishProvider}