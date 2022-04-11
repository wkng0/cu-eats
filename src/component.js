
import * as React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Fab } from '@mui/material';
import './login.css';
import logo_yellow from './image/logo_yellow.png'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { List,ListItem,ListItemIcon,ListItemText,ListItemButton } from '@mui/material';
import { SwipeableDrawer } from '@mui/material';
import { Divider } from '@mui/material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useParams, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { DishContext } from './shoppingCart/sc-context';
import { useContext } from 'react';

const pages = ['Home', 'Menu', 'Comment', 'Checkout'];
const pagesRoute = ['/', '/menu', '/comment', '/checkout'];
const settings = ['Profile', 'Account', 'Dashboard'];
const settingsRoute = ['/profile', '/profile/account', '/dashboard'];

var userMenuStatus = -1;
var NavMenuStatus = -1;



function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [pic, setPic] = React.useState(null);
    const [fetchFinish, setFetch] = React.useState(false);
    const { cart, total, clearCart } = useContext(DishContext);
    

    const handleOpenNavMenu = (event) => {
        if (NavMenuStatus == -1)
        {
            setAnchorElNav(event.currentTarget);
            NavMenuStatus = 1;
        }
        else handleCloseNavMenu();
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

    const logout = () =>{
      localStorage.setItem('user',undefined);
      localStorage.setItem('type',"guest");
      window.location.assign("/");
    }

    React.useEffect(()=>{
      if(fetchFinish== false){
      if(type== null){
        setUser(localStorage.getItem('user'));
        setType(localStorage.getItem('type'));
        console.log("set!",user);
        console.log("type!",type);
      }
      if(fetchFinish== false){
        fetch('http://localhost:7000/dbAccount/getByUID/'+user)
        .then(res=>res.json())
        .then(data=>{
            setPic(data[0].pic);
            setFetch(true);
        })
        .catch(err=>{
          console.log(err);
          setFetch(false);
        })}
      }
    })


    if(type=="user" && user!="")
    {return (
    <AppBar position="sticky" sx={{ background: '#5D4E99', color: '#F4CB86', mb: '1em' ,overflow: 'visible'}} >
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
                            sx={{mt: '15px', display: { xs: 'block', md: 'none'}, zIndex: '99999 !important'}}
                        >
                        {pages.map((page, index) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu} linkButton href={pagesRoute[index]} style={{color: '#5D4E99'}}>
                                <Link to={pagesRoute[index]} style={{color: '#5D4E99', textDecoration: 'none' }}>{page}</Link>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <img src={logo_yellow} width="auto" height="30" alt=""></img> CU EATS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                        <Link to={pagesRoute[index]} style={{textDecoration: 'none'}}>
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#F4CB86', display: 'block', ':hover': {color: 'white'}}}
                        
                        >
                            {page}
                        </Button>
                        </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                          
                        <Tooltip title="Shopping Cart">
                        <Link to='/ShoppingCart' style={{color:"#F4CB86"}}>

                            <IconButton aria-label="cart">
                              <Badge badgeContent={cart.length} color="secondary">
                                <ShoppingCartIcon sx={{color: '#F4CB86'}}/>
                              </Badge>
                            </IconButton>
                        </Link>
                        
                        </Tooltip>

                        
                        
                    </Box>
                    <Box sx={{ flexGrow: 0, pl:3}}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Hemy Sharp" src={'http://localhost:7000/dbAccount/photo/get/'+pic} />
                        </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{mt: '45px', zIndex: '99999 !important'}}
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
                        <MenuItem onClick={logout}>
                        <a style={{color: '#5D4E99', textDecoration: 'none' }}> Logout </a>
                        </MenuItem>
                        
                        </Menu>
                    </Box>
                </Toolbar>
        </Container>
    </AppBar>
  );}
  if(type=="admin"){
    return(
      <AdminDrawer></AdminDrawer>
    );
  }
  else{
  return (
    <AppBar position="sticky" sx={{ background: '#5D4E99', color: '#F4CB86', mb: '1em'}}>
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
                            sx={{mt: '15px', display: { xs: 'block', md: 'none'}, zIndex: '99999 !important'}}
                        >
                        {pages.map((page, index) => (
                            <MenuItem key={page} onClick={handleCloseNavMenu} linkButton href={pagesRoute[index]} style={{color: '#5D4E99'}}>
                                <Link to={pagesRoute[index]} style={{color: '#5D4E99', textDecoration: 'none' }}>{page}</Link>
                            </MenuItem>
                        ))}
                        </Menu>
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <img src={logo_yellow} width="auto" height="30" alt=""></img> CU EATS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                        <Link to={pagesRoute[index]} style={{textDecoration: 'none'}}>
                        <Button
                            key={page}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#F4CB86', display: 'block', ':hover': {color: 'white'}}}
                        
                        >
                            {page}
                        </Button>
                        </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                          
                        <Tooltip title="Shopping Cart">
                        <Link to='/ShoppingCart' style={{color:"#F4CB86"}}>
                            <Button 
                              variant="outlined"
                              color="inherit" 
                              sx={{':hover': {bgcolor: '#F4CB86', color: '#5D4E99'}}}
                              
                            >
                                <ShoppingCartIcon />
                            </Button>
                        </Link>
                        </Tooltip>
                    </Box>
                    <Box sx={{ flexGrow: 0, pl:3}}>
                        <Tooltip title="Login">
                        <Link to='/login' style={{color:"#F4CB86"}}>
                            <Button 
                              variant="outlined"
                              color="inherit" 
                              sx={{':hover': {bgcolor: '#F4CB86', color: '#5D4E99'}}}
                              
                            >
                                <LoginIcon/>
                            </Button>
                        </Link>
                        </Tooltip>
                    </Box>
                </Toolbar>
        </Container>
    </AppBar>
  );}

};

function AdminDrawer(props){
  const [state,setState]=React.useState(false);
  const [open, setOpen] = React.useState(true);
  const drawerWidth=180;
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
};
const data = [
  { icon: <BackupTableIcon />, label: 'User Info' , link: '/admin/profile',},
  { icon: <PasswordIcon />, label: 'Change Password' , link:'/admin/change',},
  { icon: <DeleteIcon />, label: 'Delete Account' ,link:'/admin/delete',},
];
  const drawer = (
    <div>
     
      <List>
            <Box
              sx={{
                // bgcolor: open ? 'rgba(71, 98, 130, 0.2)' : null,
                pb: open ? 2 : 0,
              }}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={{
                  px: 3,
                  pt: 2.5,
                  pb: open ? 0 : 2.5,
                  '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                }}
              >
                 <ListItemIcon sx={{color:"white"}}>
              <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                    color: "white"
                  }}
                  // secondary="User Info, Change Password, Delete Account"
                  // secondaryTypographyProps={{
                  //   noWrap: true,
                  //   fontSize: 12,
                  //   lineHeight: '16px',
                  //   color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                  // }}
                  // sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={{
                    mr: -1,
                    opacity: 0,
                    transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                    transition: '0.2s',
                  }}
                />
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                      onClick={()=>{
                        if(item.label=="User Info"){
                          window.location.href= '/admin/profile'
                        }else if(item.label=="Change Password"){
                          window.location.href = '/admin/change'
                        }else{
                          window.location.href = '/admin/delete'
                        }
                      
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
            <Divider/>
          <ListItem 
            button 
            key="Comment" 
            sx={{
              color:"white"
            }}
            onClick={()=>{
              window.location.href='/admin/comment'
            }}
          >
            <ListItemIcon>
              <CommentIcon sx={{color:"white"}}/>
            </ListItemIcon>
            <ListItemText primary="Comment" />
          </ListItem>
          <Divider/>
          <ListItem
            button 
            key="Logout" 
            sx={{
              color:"white"
            }}
            onClick={()=>{
              localStorage.setItem('type',"guest");
              window.location.href = "/"
          }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{color:"white"}}/>
              <ListItemText primary="Logout" sx={{color:"white"}}/>
            </ListItemIcon>
          </ListItem>
      </List>
  
    </div>
  );
  return(
    <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },p:0 }}            
        
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Fab 
            color="secondary" 
            sx={{
                position: 'fixed', 
                bottom: 30 ,
                left:30,
                zIndex:10000,
                display:"block",
            }}
            onClick={toggleDrawer(true)}
          >   
          <AdminPanelSettingsIcon />
        </Fab>
        <SwipeableDrawer
           anchor='left'
           open={state}
           onClose={toggleDrawer(false)}
           onOpen={toggleDrawer(true)}
          sx={{
            '& .MuiDrawer-paper': {bgcolor: '#152342', boxSizing: 'border-box', width: drawerWidth },
            zIndex: 10000, 
          }}
        >
          {drawer}
        </SwipeableDrawer>
      
      </Box>
  );
}
/*
function NavBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static"  style={{ background: '#5D4E99', color: '#F4CB86'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
*/



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


  
export {NavBar, Footer, AdminDrawer};