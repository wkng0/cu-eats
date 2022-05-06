import React, { useState, useContext, useReducer, useEffect } from 'react'
import './sc-context.css';
import reducer from './reducer'

// PROGRAM SHOPPINGCARTCONTEXT - Program to define initialstate and the action objects
// PROGRAMMER: Tam, Lee Yau
// CALLING SEQUENCE: CALL useReducer(reducer, initialState) 
//  Where reducer is the reducer functions and the second argument is the predefined state
// VERSION 1: written 28-3-2022
// REVISION 1.1: 3-4-2022 update on action types
// REVISION 1.2: 13-4-2022 add dishcontext
// REVISION 1.3: 13-4-2022 update on useEffect
// PURPOSE: To provide various functionalities for shopping cart
// DATA STRUCTURES:
//  Variable loading - BOOLEAN
//  Variable cart - ARRAY
//  Variable total - NUMBER
//  Variable amount - NUMBER
//  Variable canteen - STRING
//  Variable type - STRING
//  Variabke payload - ANY
// ALGORITHM: 
//  Defined the values the state to initialized with
//  DishProvider defines action objects and the corresponding carried payload
//  for each constant action object



const DishContext = React.createContext()

const initialState = {
  loading: false,
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
  total: 0,
  amount: 0,
  canteen: localStorage.getItem("cartCanteen") || "",
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
  const addToCart = async(item) => {
    dispatch({type:"ADD_TO_CART", payload: item})
  }

  // const fetchData = async () => {
  //   dispatch({ type:'LOADING' });
  //   const response = await fetch(url);
  //   const cart = await response.json();
  //   dispatch({ type:'DISPLAY_ITEMS', payload: cart})
  // }

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