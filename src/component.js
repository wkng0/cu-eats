import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import logo_yellow from './image/logo_yellow.png'
import { DishContext } from './shoppingCart/sc-context';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentIcon from '@mui/icons-material/Comment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import PasswordIcon from '@mui/icons-material/Password';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Fab, AppBar, Box, Toolbar, IconButton, Typography, Menu , Container, Avatar, Button, Tooltip, MenuItem, SwipeableDrawer, Divider, Badge,
  List, ListItem, ListItemIcon, ListItemText, ListItemButton} from '@mui/material';

const pages = ['Home', 'Menu', 'Comment'];
const pagesRoute = ['/', '/menu', '/comment'];

var userMenuStatus = -1;
var NavMenuStatus = -1;

/*
    PROGRAM NavBar - Program to display the respective content
    PROGRAMMER: LAM Yan Yu
    CALLING SEQUENCE:   CALL NavBar()
    VERSION 1: written 3-3-2022
    REVISION 1.1: 12-4-2022 to show user icon according to user name 
    REVISION 1.2: 12-4-2022 to add function for logging in and out
    REVISION 1.2: 12-4-2022 to add interface for canteen side
    PURPOSE: To show navbar options according to user type
    DATA STRUCTURE:
        Variable anchorElNav - BOOLEAN
        Variable anchorElUser - BOOLEAN
        Variable fetchFinish - BOOLEAN
        Variable amount - INTEGER
        Variable userData - ARRAY
    ALGORITHM: 
        Show different menu option according to user type and login status
        Allow user to click in options to proceed to respective page
        Allow user to log in and out
*/
function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [fetchFinish, setFetch] = React.useState(false);
    const { amount } = useContext(DishContext);
    const [userData, setUserData]=React.useState({
      type: null,
      user: null,
      name: null,
      pic: null,
    })
    

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
      localStorage.setItem('user',"");
      localStorage.setItem('name',"")
      localStorage.setItem('type',"guest");
      window.location.assign("/");
    }

    const openProfile = () =>{
      setAnchorElUser(null);
      userMenuStatus = -1;
      window.location.assign("/profile");
    }

   const addDish = () =>{
    setAnchorElUser(null);
    userMenuStatus = -1;
    window.location.assign("/AddDishes");
   }

   const delDish = () =>{
    setAnchorElUser(null);
    userMenuStatus = -1;
    window.location.assign("/deleteDishes");
   }

   const menuDelDish = () =>{
    setAnchorElNav(null);
    NavMenuStatus = -1;
    window.location.assign("/deleteDishes");
   }

   const menuAddDish = () =>{
    setAnchorElNav(null);
    NavMenuStatus = -1;
    window.location.assign("/AddDishes");
   }
    React.useEffect(()=>{
      if(fetchFinish== false||(userData.pic!=""&&userData.type!="admin")){
        if(userData.type== null){
          fetch('/dbAccount/getByUID/'+localStorage.getItem('user'))
          .then(res=>res.json())
          .then(data=>{
              setUserData({
                user: localStorage.getItem('user'),
                type: localStorage.getItem('type'),
                name: localStorage.getItem('name'),
                pic: data[0].pic
              })
              setFetch(true);
          })
          .catch(err=>{
            console.log(err);
            setFetch(false);
          })
        }
      }
    }, [])


    if(userData.type=="user")
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
                              <Badge badgeContent={amount} color="secondary">
                                <ShoppingCartIcon sx={{color: '#F4CB86'}}/>
                              </Badge>
                            </IconButton>
                        </Link>
                        
                        </Tooltip>

                        
                        
                    </Box>
                    <Box sx={{ flexGrow: 0, pl:3}}>
                        <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                           <Avatar src={'/dbAccount/photo/get/'+userData.pic} />
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
                        <MenuItem onClick={openProfile}>
                        <a style={{color: '#5D4E99', textDecoration: 'none' }}> Profile </a>
                        </MenuItem>
                        <MenuItem onClick={logout}>
                        <a style={{color: '#5D4E99', textDecoration: 'none' }}> Logout </a>
                        </MenuItem>
                        
                        </Menu>
                    </Box>
                </Toolbar>
        </Container>
    </AppBar>
  );}
  else if(userData.type=="restaurant")
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
                            <MenuItem onClick={handleCloseNavMenu} linkButton href='/comment' style={{color: '#5D4E99'}}>
                                <Link to='/comment' style={{color: '#5D4E99', textDecoration: 'none' }}>Comment</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} linkButton href='/dashboard' style={{color: '#5D4E99'}}>
                                <Link to='/' style={{color: '#5D4E99', textDecoration: 'none' }}>Dashboard</Link>
                            </MenuItem>
                            <MenuItem onClick={menuAddDish} linkButton href='/dashboard' style={{color: '#5D4E99'}}>
                                <Link to='/' style={{color: '#5D4E99', textDecoration: 'none' }}>Add Dishes</Link>
                            </MenuItem>
                            <MenuItem onClick={menuDelDish} style={{color: '#5D4E99'}}>
                                {/* <Link to='/' style={{color: '#5D4E99', textDecoration: 'none' }}> */}
                                  Delete Dishes
                                  {/* </Link> */}
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <img src={logo_yellow} width="auto" height="30" alt=""></img> CU EATS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link to='/comment' style={{textDecoration: 'none'}}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#F4CB86', display: 'block', ':hover': {color: 'white'}}}
                        
                        >
                            Comment
                        </Button>
                        </Link>
                        <Link to='/dashboard' style={{textDecoration: 'none'}}>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: '#F4CB86', display: 'block', ':hover': {color: 'white'}}}
                        
                        >
                            Dashboard
                        </Button>
                        </Link>
                        <Button onClick={handleOpenUserMenu} sx={{ p: 2 ,color: '#F4CB86'}}>
                           Edit Menu
                        </Button>
                        <Menu
                            sx={{mt: '45px', zIndex: '99999 !important'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'left',}}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left',}}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                        <MenuItem onClick={addDish}>
                          <a style={{color: '#5D4E99', textDecoration: 'none' }}> Add Dishes </a>
                        </MenuItem>
                        <MenuItem onClick={delDish}>
                          <a style={{color: '#5D4E99', textDecoration: 'none' }}> Edit Dishes </a>
                        </MenuItem>                      
                        </Menu>
                    </Box>
                    <IconButton href="/restaurant/profile">
                    <Avatar src={'/dbAccount/photo/get/'+userData.pic} />
                    </IconButton>
                          <IconButton onClick={logout}>
                          <LogoutIcon sx={{color:'#F4CB86'}}/>
                           </IconButton>
                </Toolbar>
        </Container>
    </AppBar>
  );}
  else if(userData.type=="admin"){
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
                            <IconButton aria-label="cart">
                              <Badge badgeContent={amount} color="secondary">
                                <ShoppingCartIcon sx={{color: '#F4CB86'}}/>
                              </Badge>
                            </IconButton>
                        </Link>
                        </Tooltip>
                    </Box>
                    <Box sx={{ flexGrow: 0, pl:3}}>
                        <Tooltip title="Login">
                        <Link to='/login' style={{color:"#F4CB86"}}>
                            <IconButton aria-label="cart">
                             
                                <LoginIcon sx={{color: '#F4CB86'}}/>
                         
                            </IconButton>
                        </Link>
                        </Tooltip>
                    </Box>
                </Toolbar>
        </Container>
    </AppBar>
  );}

};
/* PROGRAM AdminDrawer - Program to display respective content
  CALLING SEQUENCE: login as admin - show in left bottom corner
  PROGRAMMER: NG Wing Ki Vickie, PAU Chun Wai
  Purpose: For admin find the functions to manage system
  VERSION 1.0: 7-4-2022
  REVISION 1.1: 8-4-2022 add profile admin part
  REVISION 1.2: 12-4-2022 fix bug
  DATA STRUCTURE:
    Variable state - BOOLEAN
    Variable open - BOOLEAN
    Variable drawerWidtg - INT
  Algorithm
    Show different admin menu option, allow admin logout
*/
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
                pb: open ? 2 : 0,
              }}
            >
              <ListItem>
              <ListItemIcon sx={{color:"white"}}>
              <AccountCircleIcon/>
            </ListItemIcon>
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
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: 'medium',
                    lineHeight: '20px',
                    mb: '2px',
                    color: "white"
                  }}
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
              </ListItem>
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
              </ListItemIcon>
              <ListItemText primary="Logout"/>
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

class Footer extends React.Component{
    render(){
        return(
            <footer className="text-md-center text-light bg-secondary p-2 mt-sm-3 fixed-bottom" style={{fontSize:"10px"}}>
                © 2022 CSCI 3100 Group D2
            </footer>
        )
    }
}

  
export {NavBar, Footer, AdminDrawer};
