
import * as React from 'react';
import {Link} from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './login.css';
import logo_yellow from './image/logo_yellow.png'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Home', 'About Us', 'Menu', 'Comment'];
const pagesRoute = ['/', '/about', '/menu', '/comment'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settingsRoute = ['/profile', '/profile/account', '/dashboard', '/logout'];

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    let userMenuStatus = -1;
    let NavMenuStatus = -1;

    const handleOpenNavMenu = (event) => {
        console.log("before: ", NavMenuStatus);
        if (NavMenuStatus == -1)
        {
            setAnchorElNav(event.currentTarget);
            NavMenuStatus = 1;
        }
        else handleCloseNavMenu();
        console.log("after: ", NavMenuStatus);
    };
    const handleOpenUserMenu = (event) => {
        if (userMenuStatus == -1)
        {
            setAnchorElUser(event.currentTarget);
            userMenuStatus = 1;
        }
        else handleCloseUserMenu();
        
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
        NavMenuStatus = -1;
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        userMenuStatus = -1;
    };

    return (

    <AppBar position="sticky" style={{ background: '#5D4E99', color: '#F4CB86'}}>
        <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        <img src={logo_yellow} width="auto" height="30" alt=""></img> CU EATS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton 
                            size="small" 
                            aria-label="account of current user" 
                            aria-controls="menu-appbar" 
                            aria-haspopup="true" 
                            onClick={handleOpenNavMenu} 
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu 
                            id="menu-appbar" 
                            anchorEl={anchorElNav} 
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left',}}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left',}}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{mt: '15px', display: { xs: 'block', md: 'none'}, zIndex: 'tooltip'}}
                        >
                        {pages.map((page, index) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu} linkButton href={pagesRoute[index]} style={{color: '#5D4E99'}}>
                                {page}
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <img src={logo_yellow} width="auto" height="30" alt=""></img> CU EATS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#F4CB86', display: 'block', ':hover': {color: 'white'}}}
                            href={pagesRoute[index]}
                        >
                            {page}
                        </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Shopping Cart">
                        <Button variant="outlined" color="inherit" sx={{':hover': {bgcolor: '#F4CB86', color: '#5D4E99'}}} href="/shoppingCart">
                            <ShoppingCartIcon />
                        </Button>
                        </Tooltip>
                    </Box>

                    <Box sx={{ flexGrow: 0, pl:3}}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Hemy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px', zIndex: 'tooltip'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right',}}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting, index) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <a href={settingsRoute[index]} style={{color: '#5D4E99', textDecoration: 'none' }}>{setting}</a>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                </Toolbar>
        </Container>
    </AppBar>
  );
};


/*
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
*/

class Footer extends React.Component{
    render(){
        return(
            <footer className="text-md-center text-light bg-secondary p-2 mt-sm-3 fixed-bottom" style={{fontSize:"10px"}}>
                © 2022 CSCI 3100 Group D2
            </footer>
        )
    }
}

/*export default function FixedBottomNavigation() {
     
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
                <BottomNavigationAction label="Profile" icon={<AccountCircleIcon />} value="/profile" to="/profile" component={Link} />
                
                <BottomNavigationAction label="Login"  value="/login" to="/login" component={Link}/>
                <BottomNavigationAction label="AboutUs"  value="/about" to="/about" component={Link}/>
            </BottomNavigation>
        </Paper>
        </div>
    );
}*/


  
export {NavBar, Footer};