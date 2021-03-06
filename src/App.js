import React , { useState, useMemo }from 'react';
import 'react-app-polyfill/stable';
import { LoginPage,ChangePassword,EmailVerification } from './login';
import { UserComment, ContentPreview, AdminComment} from './comment';
import { Profile, Account, Address, AdminUser, ManagePw, DeleteAcc, RestaurantProfile} from './profile';
import Checkout from './checkout'
import { HomePage }  from './HomePage';
import { Receipt, Records, Dashboard } from './receipt';
import ShowCanteen from './Menu';
import Canteen from "./canteen";
import DeleteDish from "./DeleteDishes";
import AddDishes from "./AddDishes";
import { UserContext } from "./UserContext";
import './login.css';
import {NavBar,AdminDrawer} from './component'
import { BrowserRouter, Route, Routes, useLocation, useParams} from 'react-router-dom';
import CartContainer from './shoppingCart/sc-CartContainer';
import { DishProvider } from './shoppingCart/sc-context';
import { createTheme, ThemeProvider } from '@mui/material';
import Error from "./error";

const theme = createTheme({
  components: {
    MuiDataGrid:{
      styleOverrides:{
        menuIconButton:{
          zIndex:9999,
        },
        menu:{
          zIndex:9999,
        },
        columnHeader:{
          zIndex:9999,
        },
      }
    },
    MuiTooltip: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          zIndex:9999,
        },
        popper:{
          zIndex:9999,
        },
        tooltip:{
          zIndex:9999,
        }
      },
    },
    MuiPopper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          zIndex:9999,
        },
      },
    },
  },
});

/*
    PROGRAM App - Program to store the valid webpage route
    PROGRAMMER: Everyone
    CALLING SEQUENCE: CALL App()
    VERSION 1: written 15-3-2022
    PURPOSE: To handle all the webpage routing and replacing content
    DATA STRUCTURE: /
    ALGORITHM: /
*/
function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App" style={{zIndex:9999 ,position:"relative"}}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          
          <UserContext.Provider value={{user, setUser}}>
          <DishProvider>
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/comment" element={<UserComment />} />
            <Route path="/comment/:canteen/:id" element={<ContentPreview />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/record" element={<Records/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/profile/account" element={<Account/>} />
            <Route path="/profile/address" element={<Address/>} />
            
            <Route path="/ShoppingCart" element={<CartContainer/>} />
              
            <Route path="/NAcanteen" element={<Canteen value={0}/>} />
            <Route path="/Shawcanteen" element={<Canteen value={1}/>} />
            <Route path="/Uccanteen" element={<Canteen value={2}/>} />

            
            <Route path="/menu" element={<ShowCanteen/>} />
            <Route path="/restaurant/profile" element={<RestaurantProfile/>}/>
            <Route path="/receipt/:id" element={<Receipt/>} />
              
             {/* <Route path="/deleteNaDishes" element={<DeleteDish value={0}/>} />
            <Route path="/deleteShawDishes" element={<DeleteDish value={1}/>} />
            <Route path="/deleteUcDishes" element={<DeleteDish value={2}/>} />
            <Route path="/AddNaDishes" element={<AddDishes value={0}/>} />
            <Route path="/AddShawDishes" element={<AddDishes value={1}/>} />
            <Route path="/AddUcDishes" element={<AddDishes value={2}/>} /> */}

            <Route path="/deleteDishes" element={<DeleteDish />} />
            <Route path="/AddDishes" element={<AddDishes />} />

            <Route path="/changePassword/:pwToken" element={<ChangePassword/>} />
            <Route path="/emailVerify/:token" element={<EmailVerification/>}/>
            <Route path="/admin/comment/" element={<AdminComment/>}/>
            <Route path="/admin/profile" element={<AdminUser/>}/>
            <Route path="/admin/change" element={<ManagePw/>}/>
            <Route path="/admin/delete" element={<DeleteAcc/>}/>
            <Route path="/NotFound" element={<Error/>} />
            <Route path="*" element={<Error/>} />
          </Routes>
          </DishProvider>
          </UserContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
      
    </div>
  );
}
/* <Route path="/shoppingCart" element={<Cart/>} /> */

export default App;
