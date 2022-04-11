import React , { useState, useMemo }from 'react';

import { LoginPage } from './login';
import { UserComment, ContentPreview, AdminComment} from './comment';
import { Profile, Account, Address, AdminUser, ManagePw, DeleteAcc} from './profile';
import Checkout from './checkout'
import { HomePage }  from './HomePage';
import { Receipt, Records } from './receipt';

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
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/profile/account" element={<Account/>} />
            <Route path="/profile/address" element={<Address/>} />
            
            <Route path="/ShoppingCart" element={<CartContainer/>} />
              
            <Route path="/NAcanteen" element={<Canteen value={0}/>} />
            <Route path="/Shawcanteen" element={<Canteen value={1}/>} />
            <Route path="/Uccanteen" element={<Canteen value={2}/>} />

            
            <Route path="/menu" element={<ShowCanteen/>} />
              
            <Route path="/receipt/:id" element={<Receipt/>} />
              
            <Route path="/deleteDishes" element={<DeleteDish/>} />
            <Route path="/AddNaDishes" element={<AddDishes value={0}/>} />
            <Route path="/AddUcDishes" element={<AddDishes value={1}/>} />
            <Route path="/AddShawDishes" element={<AddDishes value={2}/>} />

            <Route path="/admin/comment/" element={<AdminComment/>}/>
            <Route path="/admin/profile" element={<AdminUser/>}/>
            <Route path="/admin/change" element={<ManagePw/>}/>
            <Route path="/admin/delete" element={<DeleteAcc/>}/>
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
function NoMatch() {
  let location = useLocation();
  return (
      <div>
          <h3>
              No match for <code>{location.pathname}</code>
          </h3>
      </div>
  );
}

export default App;
