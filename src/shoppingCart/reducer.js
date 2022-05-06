
const reducer = (state, action) => {
    
    if (action.type === 'ADD_TO_CART'){
        //may not be this
        //const item = state.cart.find((prod)=>prod.id===action.payload.id);
        const inCart = state.cart.find((item)=>
          item.id===action.payload.id?(item.variant===action.payload.variant.name?true:false):false
        );
        return{
          ...state,
          canteen: localStorage.getItem("cartCanteen"),
          cart: inCart? state.cart.map(item=>
            item.id === action.payload.id
            ? {...item,amount: item.amount+action.payload.quantity}
            : item
            )
            :[...state.cart, {
                id:action.payload.id,
                title:action.payload.title,
                variant: action.payload.variant.name,
                price: action.payload.variant.price,
                img:action.payload.image, 
                amount:action.payload.quantity,                 
            }]
        };
    }
    if (action.type === 'CLEAR_CART') {
        localStorage.setItem("cartCanteen","")
        return { ...state, cart: [], canteen: ""}
    }

    if (action.type === 'REMOVE') {
        return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id ||cartItem.variant!==action.payload.variant),
        }
    }

    if (action.type === 'INCREASE') {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload.id && cartItem.variant===action.payload.variant) {
                return { ...cartItem, amount: cartItem.amount + 1 }
            }
            return cartItem
        })
        return { ...state, cart: tempCart }
    }

    if (action.type === 'DECREASE') {
        let tempCart = state.cart
            .map((cartItem) => {
            if (cartItem.id === action.payload.id && cartItem.variant===action.payload.variant) {
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

export default reducer;
