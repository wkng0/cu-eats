import React,{useContext, useEffect} from 'react'
import { DishContext } from './shoppingCart/sc-context';

import { AddNewAddress } from "./profile";
import {UserContext} from './UserContext';
import DiningIcon from '@mui/icons-material/LocalDining';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RefreshIcon from '@mui/icons-material/Refresh';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom"

import { v4 as uuid } from 'uuid';
import { styled, FormGroup, FormControlLabel, Switch, Grid, Table, Divider, Box, Radio, RadioGroup, 
        FormControl, FormHelperText,TextField, Button, IconButton, Dialog, DialogContent, Snackbar, Alert } from '@mui/material/';
import { Link } from "react-router-dom";

const CutlerySwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {backgroundColor: '#5D4E99',opacity: 1,},
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': { content: '""', position: 'absolute', top: '50%',transform: 'translateY(-50%)', width: 16, height: 16,},
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {backgroundColor: '#F4CB86', boxShadow: 'none', width: 16, height: 16, margin: 2,}
}));

function RadioIcon(props) {
    return (
      <Radio size="small"  sx={{color: '#5D4E99', '&.Mui-checked': {color:'#5D4E99'}}} {...props}/>
);}

const CartItem = ({ id,img ,title, variant,price,amount }) => {
    
    const {cart ,remove, increase, decrease} = useContext(DishContext);
    localStorage.setItem("cart",JSON.stringify(cart))
    return (
      <article className='sc-cart-item'>
          <img src={img} alt={title} width='100' display='block' className='sc-cart-photo'/>
        
        <div>
          <h5 letter-spacing='0.25' line-height='1.25' margin-bottom='0.75' font-size='0.875'>{title}</h5>
          <h6 className='sc-item-price'>{variant}</h6>
          <h6 className='sc-item-price'>$&nbsp;{price}</h6>
        </div>
        <div>
          <p className='sc-amount'>x {amount}</p>
        </div>
      </article>
    )
  }

function Checkout() {
    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserContext);
    const { cart, total, clearCart } = React.useContext(DishContext);
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [point, setPoint] = React.useState(0);
    const [pointUse, setPointUse] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);
    const [address, setAddress] = React.useState(null);
    const [cutlery, setCutlery] = React.useState(true);
    const [fetchFinish, setFetch] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [savedAddress,setdbAddress] = React.useState([]);
    const [anchorElNew, setAnchorElNew] = React.useState(null);
    const [phoneText, setText] = React.useState('');
    const [pointText, setpText] = React.useState('Get $0.0 off');
    const [helperText, setHelperText]=React.useState('Please insert address so we can deliver the food to you');
    const [open, setOpen]=React.useState(false);
    const handleChangeName = (event) => {setName(event.target.value);};
    const handleChangePhone = (event) => {setPhone(event.target.value);};
    const handleChangePoint = (event) => {setPointUse(event.target.value);};
    const handleAddress = (event) => {setAddress(event.target.value);};
    const handleCutlery = () => {setCutlery(!cutlery);};
    const handleAddNew = (event) => {setAnchorElNew(event);};
    const handleCloseNew = () => {setAnchorElNew(null);};
    const handleRefresh = () => {setRefresh(!refresh);};
    const receiptID = uuid();
    const handleReceipt = (event) => {
        if(name!=''&&phone!=''&&address!=null){
            console.log('receipt:', receiptID);
            fetch("http://localhost:7000/dbReceipt/user", {
                method: 'POST', 
                body: new URLSearchParams({
                    "irid": receiptID,
                    "uid": user,
                    "res": localStorage.getItem("cartCanteen"),
                    "name": name,
                    "phone": phone,
                    "address": address==null? savedAddress[0]:address,
                    "cutlery": cutlery,
                    "items": localStorage.getItem('cart'),
                    "subtotal": total,
                    "discount": discount,
                    "total": total-discount,
                    "point": point,
                    "pointEarn": ~~(total/50)*5,
                    "pointRemain": point - discount*10 + ~~(total/50)*5,
                    "timestamp": Date.now()
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            })
            .then(response => {console.log(response);
                localStorage.setItem('cart',"");
                navigate('/receipt/' + receiptID)}
                )
            .then(clearCart)
            .catch((error) => {console.error('Error:', error);});
        }else{
            setOpen(true)
        }
    }
        

    const fetchAddress = () => {
        console.log("start fetch")
        fetch('http://localhost:7000/dbAccount/getAddress/' + user)
            .then(res=>res.json())
            .then(res=>setdbAddress(res))
            .then(()=>setFetch(true))
            .catch(err=>{console.log(err); setFetch(false);})
    }

    const showAddress = (event) => { 
        if (fetchFinish == false) return(<p>loading address...</p>)
        else {
            if (savedAddress[0] == null) return (
            <>
                <p>No address record has been inserted.</p>
                <FormHelperText error={address==null}>{helperText}</FormHelperText>
            </>
            );
            else {
                return(
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={savedAddress[0]}
                        name="radio-buttons-group"
                        color="secondary"
                        onChange={handleAddress}
                        value={address}
                    >
                        {savedAddress.map((address)=>(
                            <FormControlLabel value={address} control={<RadioIcon/>} label={address} />
                        ))}
                    </RadioGroup>
        )}}
    }
    const handleCloseSubmitAlert=(event, reason)=>{
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    React.useEffect(()=>{
        if (phone === "") 
            setText('Entry cannot be empty!');
        else if (phone < 20000000 || (phone>=70000000 && phone<90000000) || phone>99999999) 
            setText('Invalid entry!');
        else setText('');
    },[phone])
    React.useEffect(()=>{ 
        setDiscount(pointUse/10); 
        if (pointUse === "")  setpText('Entry cannot be empty!');
    },[pointUse])
    React.useEffect(()=>{
        if (pointUse < 0) 
            setpText('Point must be non-negative!');
        else if (pointUse > point)
            setpText('Not enough valid points!');
        else if (pointUse >= 0) 
            setpText('Get $'+ discount.toFixed(1)+ ' off');
        else if (pointUse === "") setText('Entry cannot be empty!');
    },[discount])
    React.useEffect(()=>{ fetchAddress();},[refresh])
    React.useEffect(()=>{
        if (localStorage.getItem('user') != ""){
            setUser(localStorage.getItem('user'));
            console.log("set!",user);
        }
        if (fetchFinish== false){
        fetch('http://localhost:7000/dbAccount/getByUID/'+user)
        .then(res=>res.json())
        .then(data=>{
            setName(data[0].user_name);
            setPoint(data[0].point);
            setPhone(data[0].phone);
            setFetch(true);
        })
        .then(fetchAddress())
        .catch(err=>{
          console.log(err);
          setFetch(false);
        })}
    })
    
    return (
        <>
        <div style={{width:'80%', margin:'auto'}}>
        <Link to="/menu" style={{textDecoration: 'none'}}>
            <Button 
              size="small" 
              sx={{bgcolor: "transparent", color: '#5D4E99', ':hover': {bgcolor:'#5D4E99', color: '#F4CB86'}}}
            >
            <ArrowBackIosIcon/>Continue Shopping
            </Button>
        </Link>
        </div>

        <br/>
        <h3 style={{color: '#5D4E99'}}>Your Order</h3>
        <br/>
        <Table style={{width:'80%', margin:'auto', maxWidth:650}} aria-label="spanning table" padding='normal'>
            {cart.map((item) => {
                return <CartItem key={item.id} {...item} />
                })}
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
                            onChange={handleChangeName}
                            error={name===''}
                            helperText={name===''? 'Entry cannot be empty!':''}
                        />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <TextField fullWidth required
                            label="Phone"
                            id="fullWidth"
                            color="secondary"
                            value={phone}
                            onChange={handleChangePhone}
                            error={phone==='' || phone < 20000000 || (phone>=70000000 && phone<90000000) || phone>99999999}
                            helperText={phoneText}
                        />
                    </Grid>
                </Grid>
            </Box><br/>
            <br/><Divider /><br/>
            <Box>
                <Grid container>
                    <Grid item xs={9}>
                        <h4 style={{color: '#5D4E99'}}>Delivery Address
                        <IconButton 
                            size='small'
                            onClick={handleRefresh}
                            sx={{color:'#5D4E99', ':hover':{bgcolor:'transparent',color:'#5D4E99'}}}
                        >
                            <RefreshIcon/>
                        </IconButton>
                        </h4>
                    </Grid>
                    <Grid item xs={3}  style ={{textAlign:'right'}}>
                        <Button 
                            size='small'
                            onClick={handleAddNew}
                            sx={{color:'#5D4E99', ':hover':{bgcolor:'transparent',color:'#5D4E99'}}}
                        >
                            + Add New
                        </Button>
                    </Grid>
                </Grid>
                <Dialog fullWidth
                component={"div"} 
                width="md"height="md" 
                open={anchorElNew} 
                onClose={handleCloseNew} 
                scroll="paper" 
                style={{zIndex:9999, overflowY:"visible"}} 
                >
                    <DialogContent>
                        <IconButton 
                            size='small' onClick={handleCloseNew}
                            sx={{color:'#5D4E99', ':hover':{bgcolor:'transparent',color:'#5D4E99'}}}  
                        >
                            <CloseIcon/>
                        </IconButton><br/>
                        <div style={{width:'90%', margin:'auto'}}>
                            <AddNewAddress email={user}/>
                        </div><br/>
                    </DialogContent>
                </Dialog>
                <FormControl>
                    {showAddress()}
                </FormControl>
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
                value={pointUse}
                sx={{mt:1}}
                color="secondary"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                onChange={handleChangePoint}
                error={pointUse<0 || pointUse>point || pointUse===""}
                helperText={pointText}
            />
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
                    <FormControlLabel
                        control={<CutlerySwitch  defaultChecked  onChange={handleCutlery}/>}
                        label=''
                    />
                </Grid>
            </Grid>
        </FormGroup>
        <br/>
        <div style={{margin: 'auto', textAlign: 'right'}}>

            <Button 
                size="large" 
                onClick={handleReceipt}
                sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
            >
              Submit Order
            </Button>
        </div>
        <br/>
        </Table>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSubmitAlert}>
            <Alert onClose={handleCloseSubmitAlert} severity="error" sx={{ width: '100%' }}>
                Please filled in the required information
            </Alert>
        </Snackbar>
        </>
    );
}

export default Checkout;