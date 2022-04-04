import Cart from "./cart.json";
import { AddNewAddress } from "./profile";
import {UserContext} from './UserContext';
import DiningIcon from '@mui/icons-material/LocalDining';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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
import Menu from '@mui/material/Menu';

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

function Checkout() {
    const [name, setName] = React.useState('Chris Wong');
    const [phone, setPhone] = React.useState('98765432');
    const [email, setEmail] = React.useState('0.0@link.cuhk.edu.hk');
    const [pointUse, setPoint] = React.useState(null);
    const [discount, setdiscount] = React.useState(0);
    const [address, setAddress] = React.useState(null);
    const [cutlery, setCutlery] = React.useState(true);
    const [userEmail,setUserEmail] = React.useState('0.0@link.cuhk.edu.hk');
    const [fetchFinish, setFetch] = React.useState(false);
    const [savedAddress,setdbAddress] = React.useState([]);
    const {user, setUser} = React.useContext(UserContext);
    const [anchorElNew, setAnchorElNew] = React.useState(null);
    const handleChangeName = (event) => {setName(event.target.value);};
    const handleChangePhone = (event) => {setPhone(event.target.value);};
    const handleChangeEmail = (event) => {setEmail(event.target.value);};
    const handleChangePoint = (event) => {setPoint(event.target.value);};
    const handleAddress = (event) => {setAddress(event.target.value);};
    const handleCutlery = (event) => {setCutlery(!cutlery);};
    const handleReceipt = (event) => {
        fetch("http://localhost:7000/dbReceipt/user", {
            method: 'POST', 
            body: new URLSearchParams({
                "receiptId": receiptID,
                "userID": userID,
                "name": name,
                "email": email,
                "phone": phone,
                "address": address,
                "cutlery": cutlery,
                "items": Cart,
                "subtotal": total,
                "discount": discount,
                "total": total-discount,
                "pointEarn": ~~(total/50)*5
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
        })
        .then(response => {
            console.log(response)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const handleAddNew = (event) => {
        setAnchorElNew(event.currentTarget);
    };
    const handleCloseNew = () => {
        setAnchorElNew(null);
    };
    const fetchAddress = (event) => {
        console.log("start fetch")
        fetch('http://localhost:7000/dbAccount/getAddress/' + user)
            .then(res=>res.json())
            .then(res=>setdbAddress(res))
            .then(()=>setFetch(true))
            .catch(err=>{console.log(err); setFetch(false);})
    }
    const showAddress = (event) => 
    { 
        if(fetchFinish == false){
            return(
                <h1>loading address...</h1>
            )
        }
        if(fetchFinish == true){
            console.log("Address:",savedAddress);
            return(
                <>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={savedAddress[0]}
                    name="radio-buttons-group"
                    color="secondary"
                    onChange={handleAddress}
                >
                    {savedAddress.map((address)=>(
                        <FormControlLabel value={address} control={<RadioIcon/>} label={address} />
                    ))}
                </RadioGroup>
                </>
            )
          }
      }
    React.useEffect(()=>{setdiscount(pointUse/10);},[pointUse])
    React.useEffect(()=>{fetchAddress()},[address])
      
    let receiptID = 'r001';
    let userID = 'user001';
    let total = 0;
    let point = 310;
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
        <h3 style={{color: '#5D4E99'}}>Your Order</h3>
        <br/>
        <Table style={{width:'80%', margin:'auto', maxWidth:650}} aria-label="spanning table" padding='normal'>
            {Cart.cartItems.map((item) => (
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
            ))}
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
                        />
                    </Grid>
                </Grid>
                <br/>
                <TextField fullWidth required
                    label="Email"
                    id="fullWidth"
                    color="secondary"
                    value={email}
                    onChange={handleChangeEmail}
                />
            </Box>
            <br/><Divider /><br/>
            <Box>
                <Grid container>
                    <Grid item xs={9}><h4 style={{color: '#5D4E99'}}>Delivery Address</h4></Grid>
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
                <Menu 
                    id="menu-appbar" 
                    anchorEl={anchorElNew} 
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'left',}}
                    open={Boolean(anchorElNew)}
                    sx={{mt: '15px', zIndex: '99999 !important'}}
                >
                    <Button 
                        size='small' onClick={handleCloseNew}
                        sx={{color:'#5D4E99', ':hover':{bgcolor:'transparent',color:'#5D4E99'}}}  
                    >
                        <ArrowBackIosIcon/>
                    </Button>
                    <AddNewAddress email={userEmail}/>
                </Menu>
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
                //href="/receipt"
                onClick={handleReceipt}
                sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
                //disabled={!formIsValid()}
            >
              Submit Order
            </Button>
        </div>
        <br/>
        </Table>
        </>
    );
}

export {Checkout};