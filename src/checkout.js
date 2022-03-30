import Cart from "./cart.json";
import DiningIcon from '@mui/icons-material/LocalDining';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';

var total;

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

function Checkout() {
    let total = 0;
    return (
        <>
        <h3>Your Order</h3>
        <Table style={{ width: '80%', margin: 'auto' }} aria-label="spanning table" padding='normal'>
            {Cart.cartItems.map((item) => (
                total += item.amount * item.price,
                <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={1} sx={{color: '#5D4E99'}}>{item.amount}</Grid>
                    <Grid item xs={9}>x &nbsp;{item.title}</Grid>
                    <Grid item xs={2}>${(item.amount * item.price).toFixed(1)}</Grid>
                </Grid>
            ))}
            <br/>
            <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={10}> <b>Subotal</b></Grid>
                    <Grid item xs={2}> <b>${total.toFixed(1)}</b></Grid>
            </Grid>
            <Grid container sx ={{color: '#707070'}}>
                    <Grid item xs={10}> <b>Subotal</b></Grid>
                    <Grid item xs={2}> <b>${total.toFixed(1)}</b></Grid>
            </Grid>
            <br/>
            <Grid container sx ={{color: '#5D4E99'}}>
                    <Grid item xs={10}> <b>Total</b></Grid>
                    <Grid item xs={2}> <b>${total.toFixed(1)}</b></Grid>
            </Grid>
            <br/><Divider /><br/>
            <FormGroup>
            <div className='container'><Grid container>
                <Grid item xs={11}>
                    <h6><DiningIcon sx={{color: '#5D4E99'}}/> Do you need cutlery?</h6>
                </Grid>
                <Grid item xs={1}>
                    <FormControlLabel
                    control={<CutlerySwitch defaultChecked />}
                    label=""
                    />
                </Grid>
            </Grid></div>
        </FormGroup>
        </Table>

        </>
    );
}

export {Checkout};