import Cart from "./cart.json";
import {UserContext} from './UserContext';
import {useParams} from 'react-router-dom'
import DiningIcon from '@mui/icons-material/LocalDining';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CloseIcon from '@mui/icons-material/Close';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

function Receipt() {
    const {user, setUser} = React.useContext(UserContext);
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [receiptID, setReceiptID] = React.useState('');
    const [res, setRestaurant] = React.useState('');
    const [item, setItem] = React.useState(null);
    const [point, setPoint] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);
    const [subtotal, setSubtotal] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [address, setAddress] = React.useState(null);
    const [cutlery, setCutlery] = React.useState(true);
    const [status, setStatus] = React.useState(false);
    const [fetchFinish, setFetch] = React.useState(false);

    React.useEffect(()=>{
        if(fetchFinish== false){
        fetch("http://localhost:7000/dbReceipt/get" + param.id)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setReceiptID(data.receiptID);
            setRestaurant(data.rid);
            setEmail(data.email);
            setName(data.user_name);
            setPoint(data.point);
            setPhone(data.phone);
            setAddress(data.address);
            setCutlery(data.cutlery)
            setItem(data.item);
            setSubtotal(data.subtotal);
            setDiscount(data.discount);
            setTotal(data.total);
            setStatus(data.status);
            setFetch(true);
        })
        .catch(err=>{
          console.log(err);
          setFetch(false);
        })}
    })

    let param=useParams();

    return (
        <>
        <div style={{width:'80%', margin:'auto'}}>
            <Button 
              size="small" 
              href="/menu"
              sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'#5D4E99', color: '#F4CB86'}}}
            >
            <ArrowBackIosIcon/>Continue Shopping
            </Button>
        </div>
        <br/>
        <h3 style={{color: '#5D4E99'}}>Your Order {receiptID}</h3>
        <br/>
        <Table style={{width:'80%', margin:'auto', maxWidth:650}} aria-label="spanning table" padding='normal'>
            {/*Cart.cartItems.map((item) => (
                total += item.amount * item.price,
                <>
                <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={1} sx={{color: '#5D4E99'}}><b>{item.amount}</b></Grid>
                    <Grid item xs={9}>x &nbsp;{item.title}</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>$</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>{(item.amount * item.price).toFixed(1)}</Grid>
                </Grid>
                <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={1} />
                    <Grid item xs={11}><pre>{item.description && '   - '}{item.description}</pre></Grid>
                </Grid>
                </>
            ))*/}
            <br/><Divider /><br/>
            <Box>

                <h4 style ={{color: '#5D4E99'}}>Personal Information</h4>
                <br/>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField fullWidth required
                            label="Name"
                            id="fullWidth"
                            color="secondary"
                            value={name}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <TextField fullWidth required
                            label="Phone"
                            id="fullWidth"
                            color="secondary"
                            value={phone}
                            disabled
                        />
                    </Grid>
                </Grid>
                <br/>
                <TextField fullWidth required
                    label="Email"
                    id="fullWidth"
                    color="secondary"
                    value={email}
                    disabled
                />
            </Box>
            <br/><Divider /><br/>
            <Box>
                <h4 style={{color: '#5D4E99'}}>Delivery Address</h4>
                {address}
            </Box>
            <br/><Divider /><br/>          
            <h4 style={{color: '#5D4E99'}}>Payment</h4>
            <Grid container>
                <Grid item xs={9}>Members ordering entitlement</Grid>
                <Grid item xs={3} style ={{textAlign:'right', color:'#5D4E99'}}>{~~(total/50)*5} Points</Grid>
            </Grid>
            <p><small>5 CU EATS Points rebate for every HK$50 net ordering amount of each eligible CUHK email.</small></p>  
            <Grid container>
                <Grid item xs={10}>Subtotal</Grid>
                <Grid item xs={2} sx ={{textAlign:'right', color: '#5D4E99'}}><b>${total.toFixed(1)}</b></Grid>
            </Grid>
            
            <Grid container>
                <Grid item xs={6}>Your Points</Grid>
                <Grid item xs={6} style ={{textAlign:'right', color: '#707070'}}><small>{point} valid point(s)</small></Grid>
            </Grid>
            <TextField fullWidth 
                    label="Use Points"
                    autoComplete="off"
                    id="fullWidth"
                    variant="standard"
                    value={point}
                    sx={{mt:1}}
                    color="secondary"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    disabled
            />
            <b style={{fontSize: 12, color:'#5D4E99'}}>Get ${discount.toFixed(1)} off</b>
            <br/><br/>
            <Grid container sx ={{color:'#5D4E99'}}>
                <Grid item xs={10}> <b>Total</b></Grid>
                <Grid item xs={2} sx={{textAlign:'right'}}> <b>${(total-discount).toFixed(1)}</b></Grid>
            </Grid>
            <br/><Divider /><br/>
            <FormGroup>
            <Grid container>
                <Grid item xs={11}>
                    <h6><DiningIcon sx={{color:'#5D4E99'}}/> Do you need cutlery?</h6>
                </Grid>
                <Grid item xs={1} sx={{textAlign:'right'}}>
                </Grid>
            </Grid>
        </FormGroup>
        <br/>
        <div style={{margin: 'auto', textAlign: 'right'}}>
            <Button 
                size="large" 
                //href="/receipt"
                //onClick={handleReceipt}
                sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
                //disabled={!formIsValid()}
            >
              Taken
            </Button>
        </div>
        <br/>
        </Table>
        </>
    );
}

export {Receipt};