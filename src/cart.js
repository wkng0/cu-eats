import * as React from 'react';
import { Button } from '@mui/material';
//import { CartItemType } from "../Menu";
import cartItems from "./cart.json";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


/*
const Props = {
  item: CartItemType,
  addToCart: (clickedItem={CartItemType}),
  removeFromCart: (id={number})
};
*/



const CartItem = ({ item }) => {
  return (    
    <div>
      <TableRow >
        {item.image && <TableCell rowSpan={2} sx={{pr: 0}}><img src={item.image} alt={item.title} width='100' height='100'/></TableCell> }
        <TableCell colSpan={2} sx={{borderBottom: "none", pb: 0, pl: item.image? 1 : 3}}>
          <h4 style={{color: '#5D4E99'}}>{item.title}</h4>
          <p style={{color: '#707070'}}>{item.description}</p>
        </TableCell> 
      </TableRow>
      <TableRow>
        <TableCell sx={{ width: item.image? "50%" : "70%", pt: 0, pb: 0, pl: item.image? 1 : 3}}>
          <p>Price: ${item.price.toFixed(1)}</p>
        </TableCell>
        <TableCell sx={{ width: '30%', pt: 0}}>
          <div className='container'>
            <Button 
              size="small" 
              //onClick={(e) => item.amount -= 1}
              sx={{bgcolor: '#F4CB86', color: '#5D4E99', ':hover': {bgcolor:'#ffe082'}}}
            >
              -
            </Button>
            <Button disabled sx={{':disabled':{color: 'black'}}}>{item.amount}</Button>
            <Button 
              size="small" 
              //onClick={(e) => item.amount += 1}
              sx={{bgcolor: '#F4CB86', color: '#5D4E99', ':hover': {bgcolor:'#ffe082'}}}
            >
              +
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </div>
  );
};

class Cart  extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
        total: 0,
    };
}
/*
var Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
*/

  addTotal(item, e){ 
    this.setState({total: this.state.total + item.price * item.amount});
  }

  render(){
    return (
      <div>
        <h2 className='text-center'>Shopping Cart</h2>
        {cartItems.cartItems.length === 0 ? <p>No items in cart.</p> : null}
       
          <Table style={{ tableLayout: "auto" }} aria-label="spanning table" padding='normal'>
            {cartItems.cartItems.map((item) => (
              <TableRow >
              <CartItem
                key={item.id}
                item={item}
                //addToCart={addToCart}
                //removeFromCart={removeFromCart}
              />
              
              </TableRow>
            ))}
            <TableRow >
              <h2>Total: ${this.state.total.toFixed(1)}</h2>
            </TableRow>
          </Table>
      </div>
    );
  }
};

export {Cart};
