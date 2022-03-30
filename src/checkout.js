import Cart from "./cart.json";
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
import Radio, { RadioProps }  from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <Radio
        size="small" 
        sx={{color: '#5D4E99', '&.Mui-checked': {color:'#5D4E99'}}}
        {...props}
      />
);}


function Checkout() {
    const [name, setName] = React.useState('Chris Wong');
    const [phone, setPhone] = React.useState('98765432');
    const [email, setEmail] = React.useState('chriswong@gmail.com');
    const [pointUse, setPoint] = React.useState(null);
    const [discount, setdiscount] = React.useState(0);
    const handleChangeName = (event) => {setName(event.target.value);};
    const handleChangePhone = (event) => {setPhone(event.target.value);};
    const handleChangeEmail = (event) => {setEmail(event.target.value);};
    const handleChangePoint = (event) => {setPoint(event.target.value);};
    React.useEffect(()=>{setdiscount(pointUse/10);},[pointUse])
    
    let total = 0;
    let point = 310;
    console.log("width:", window.innerWidth);
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
                    <Grid item xs={11}>{item.description && <pre>   - {item.description}</pre>}</Grid>
                </Grid>
                </>
            ))}
            <br/><Divider /><br/>
            <Box>
                <h4 style ={{color: '#5D4E99'}}>Personal Information</h4>
                <br/>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField fullWidth 
                            label="Name"
                            id="fullWidth"
                            color="secondary"
                            value={name}
                            onChange={handleChangeName}
                        />
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={5}>
                        <TextField fullWidth 
                            label="Phone"
                            id="fullWidth"
                            color="secondary"
                            value={phone}
                            onChange={handleChangePhone}
                        />
                    </Grid>
                </Grid>
                <br/>
                <TextField fullWidth 
                    label="Email"
                    id="fullWidth"
                    color="secondary"
                    value={email}
                    onChange={handleChangeEmail}
                />
            </Box>
            <br/><Divider /><br/>
            <Box>
                <h4 style={{color: '#5D4E99'}}>Delivery Address</h4>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        color="secondary"
                    >
                        <FormControlLabel value="AddressA" control={<RadioIcon/>} label="Address A" />
                        <FormControlLabel value="AddressB" control={<RadioIcon/>} label="Address B" />
                        <FormControlLabel value="AddressC" control={<RadioIcon/>} label="Address C" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <br/><Divider /><br/>          
            <h4 style={{color: '#5D4E99'}}>Payment</h4>
            <Grid container>
                <Grid item xs={9}>Members ordering entitlement</Grid>
                <Grid item xs={3} style ={{textAlign:'right', color:'#5D4E99', textAlign:'right'}}>{~~(total/50)*5} Points</Grid>
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
                    id="fullWidth"
                    variant="standard"
                    value={pointUse}
                    sx={{mt:1}}
                    color="secondary"
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
                    control={<CutlerySwitch defaultChecked />}
                    label=''
                    />
                </Grid>
            </Grid>
        </FormGroup>
        <br/>
        <div style={{margin: 'auto', textAlign: 'right'}}>
            <Button 
              size="large" 
              href="/receipt"
              sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
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