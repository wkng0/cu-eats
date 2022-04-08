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
    const [receiptID, setReceiptID] = React.useState('');
    const [res, setRestaurant] = React.useState('');
    const [orderItem, setItem] = React.useState(null);
    const [point, setPoint] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);
    const [subtotal, setSubtotal] = React.useState(0);
    const [timestamp, setTime] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [address, setAddress] = React.useState(null);
    const [cutlery, setCutlery] = React.useState(true);
    const [status, setStatus] = React.useState(false);
    const [fetchFinish, setFetch] = React.useState(false);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit',day: '2-digit' ,hour: '2-digit', minute: '2-digit'}
        return new Intl.DateTimeFormat('en-US', options).format(dateString);
    }
    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit'}
        return new Intl.DateTimeFormat('en-US', options).format(dateString);
    }
    const handleTaken = () => {setStatus(true);};
    const handleCutlery = () => {
        if (cutlery) {
            return (
                <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={1} sx={{color: '#5D4E99'}}><b>{cutleryNo}</b></Grid>
                    <Grid item xs={9}>x &nbsp;Cutlery</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>$</Grid>
                    <Grid item xs={1} sx={{textAlign:'right'}}>0.0</Grid>
                </Grid>
            )
        }
    }

    React.useEffect(()=>{
        fetch("http://localhost:7000/dbReceipt/get/"+window.location.pathname.replace('/receipt/',''))
        .then(res=>res.json())
        .then(data=>{
            setReceiptID(data[0].id);
            setRestaurant(data[0].rid);
            setName(data[0].ctName);
            setPoint(data[0].point);
            setPhone(data[0].phone);
            setAddress(data[0].address);
            setCutlery(data[0].cutlery)
            setItem(JSON.parse(data[0].item));
            setSubtotal(data[0].subtotal);
            setDiscount(data[0].discount);
            setTotal(data[0].total);
            setStatus(data[0].status);
            setTime(data[0].timestamp);
            setFetch(true);
            console.log(orderItem[0])
            console.log(formatDate(timestamp))
            console.log(formatTime(timestamp))
        })
        .then(console.log("Successfully get to receipt info"))
        .catch(err=>{console.log(err);})
    },[fetchFinish])

    let cutleryNo = 0;
    if (fetchFinish) {
    if (status == false) {
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
        <h3 style={{color: '#5D4E99'}}>Receipt <span style={{color: '#FFC107'}}>{receiptID}</span></h3><br/>
        <div style={{textAlign: 'center'}}>
            <h5 style={{color: '#5D4E99'}}>Order time: {formatDate(timestamp)}</h5>
            <h5 style={{color: '#5D4E99'}}>Expected delivery time: {formatTime(timestamp+900000)} - {formatTime(timestamp+1800000)}</h5><br/>
            <h5 style={{color: '#5D4E99'}}>Name: {name}&nbsp;&nbsp;&nbsp;Tel: {phone}</h5>
            <h5 style={{color: '#5D4E99'}}>Address: {address}</h5>
        </div>
         
        <Table style={{width:'80%', margin:'auto', maxWidth:650}} aria-label="spanning table" padding='normal'>
            <br/><Divider /><br/> 
            {orderItem.map((item) => (
                cutleryNo += item.amount,
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
            {handleCutlery()}
            <br/><Divider /><br/>          
            <Grid container>
                <Grid item xs={9}>Points Rebate</Grid>
                <Grid item xs={3} style ={{textAlign:'right', color:'#5D4E99'}}>{point} Points</Grid>
            </Grid><br/>
            <Grid container>
                <Grid item xs={10}>Subtotal</Grid>
                <Grid item xs={2} sx ={{textAlign:'right', color: '#5D4E99'}}><b>${subtotal.toFixed(1)}</b></Grid>
            </Grid><br/>  
            <Grid container>
                <Grid item xs={6}>Use Points</Grid>
                <Grid item xs={6} style ={{textAlign:'right', color: '#707070'}}><small>{discount} point(s)</small></Grid>
            </Grid>
            <div style={{textAlign:'right'}}><b style={{fontSize: 12, color:'#5D4E99'}}>Get ${(discount/10).toFixed(1)} off</b></div>
            <br/><Divider /><br/>  
            <Grid container sx ={{color:'#5D4E99'}}>
                <Grid item xs={10}> <b>Total</b></Grid>
                <Grid item xs={2} sx={{textAlign:'right'}}> <b>${(total).toFixed(1)}</b></Grid>
            </Grid><br/><br/>
            <div style={{margin: 'auto', textAlign: 'center'}}>
                <Button 
                    size="large" 
                    onClick={handleTaken}
                    sx={{border: 2,bgcolor: '#transparent', color: '#5D4E99', ':hover': {borderColor: '#5D4E99', bgcolor: '#5D4E99', color: '#F4CB86'}}}
                >
                    Confirm order delivered
                </Button>
            </div>
            <br/>
        </Table>
        </>
    );} else {
        return(
            <div>Order taken</div>
        )
    }
    } else return (<p>Loading receipt...</p>)
}

export {Receipt};