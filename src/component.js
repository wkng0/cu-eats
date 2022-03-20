
import React from 'react';
import {Link} from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';

import './login.css';
import logo_yellow from './image/logo_yellow.png'



class NavBar extends React.Component{
    render(){
        return(
            <header className="navbar navbar-expand-sm nav-bg navbar-dark shadow ps-2 pe-2 sticky-top"style={{zIndex:9999 ,position:"sticky", marginBottom:"2rem"}}>
                <a className="navbar-brand" href="index.html">
                    <img src={logo_yellow} width="auto" height="30" alt=""></img><strong className="brand"> CU EATS</strong>
                </a>
                <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                    <span className="navbar-toggler-icon"></span> Menu
                </button>
                <div className="collapse navbar-collapse" style={{textAlign: 'right'}} id="navbarCollapse">
                    <ul className="navbar-nav ms-auto" style={{textAlign: 'center'}}>
                        <li className="nav-item"><a className="nav-link" href="about.html">About Us</a></li>
                        <li className="nav-item"><a className="nav-link" href="menu.html">Menu</a></li>
                        <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">
                            <i className="bi bi-basket-fill icon"></i>
                            <b className="collapse" id="navbarCollapse">&ensp;Shopping Cart</b>
                        </button>
                    </ul>
                </div>
            </header>
        )
    }
}

class Footer extends React.Component{
    render(){
        return(
            <footer className="text-md-center text-light bg-secondary p-2 mt-sm-3 fixed-bottom" style={{fontSize:"10px"}}>
                © 2022 CSCI 3100 Group D2
            </footer>
        )
    }
}

export default function FixedBottomNavigation() {
     
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{zIndex:9999 ,position:"relative",marginTop:"8rem"}}>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={6}>

            <BottomNavigation
                showLabels
                value={value}
                onChange={handleChange}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} value="/" to="/" />
                <BottomNavigationAction label="Order" icon={<StoreIcon />} value="/order"/>
                <BottomNavigationAction label="Comment" icon={<CommentIcon  />} value="/comment" to="/comment" component={Link} />
                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} value="/profile" />
                
                <BottomNavigationAction label="Login"  value="/login" to="/login" component={Link}/>
                <BottomNavigationAction label="AboutUs"  value="/about" to="/about" component={Link}/>
            </BottomNavigation>
        </Paper>
        </div>
    );
}


  
export {NavBar, Footer, FixedBottomNavigation}