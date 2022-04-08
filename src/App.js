import React , { useState, useMemo }from 'react';

import { LoginPage } from './login';
import { UserComment, ContentPreview, AdminComment} from './comment';
import { Profile, Account, Address, AdminUser, ManagePw, DeleteAcc} from './profile';
import { Checkout } from './checkout'
import { HomePage }  from './HomePage';
import { Receipt } from './receipt';
import UCCanteen from './UCcanteen';
import NACanteen from './NAcanteen';
import ShawCanteen from './ShawCanteen';

import NewNACanteen from './newNaCanteen';
import NewUcCanteen from './newUcCanteen';
import NewShawCanteen from './newShawCanteen';

import DeleteDish from "./DeleteDishes";
import AddDishes from "./AddDishes";

import { UserContext } from "./UserContext";

import './login.css';
import {NavBar,AdminDrawer} from './component'
import { BrowserRouter, Route, Routes, useLocation, useParams} from 'react-router-dom';
import CartContainer from './shoppingCart/sc-CartContainer';

import { DishProvider } from './shoppingCart/sc-context';


function App() {
  const [user, setUser] = useState("l1jc1p8ltukap01mi3");
  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App" style={{zIndex:9999 ,position:"relative"}}>
      <NavBar/>
      
      <BrowserRouter>
        <UserContext.Provider value={{user, setUser}}>
        <DishProvider>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/comment" element={<UserComment />} />
          <Route path="/comment/:canteen/:id" element={<ContentPreview />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/profile/account" element={<Account/>} />
          <Route path="/profile/address" element={<Address/>} />
          
          <Route path="/ShoppingCart" element={<CartContainer/>} />
          <Route path="/UCcanteen" element={<UCCanteen/>} />
          <Route path="/NAcanteen" element={<NACanteen/>} />
          <Route path="/Shawcanteen" element={<ShawCanteen/>} />
          <Route path="/newNAcanteen" element={<NewNACanteen/>} />
          <Route path="/newShawcanteen" element={<NewShawCanteen/>} />
          <Route path="/newUccanteen" element={<NewUcCanteen/>} />
        
            
          <Route path="/receipt/:id" element={<Receipt/>} />
            
          <Route path="/deleteDishes" element={<DeleteDish/>} />
          <Route path="/AddDishes" element={<AddDishes/>} />
          <Route path="/admin/comment/" element={<AdminComment/>}/>
          <Route path="/admin/profile" element={<AdminUser/>}/>
          <Route path="/admin/change" element={<ManagePw/>}/>
          <Route path="/admin/delete" element={<DeleteAcc/>}/>
          <Route path="*" element={<NoMatch/>} />
        </Routes>
        </DishProvider>
        </UserContext.Provider>
    </BrowserRouter>
    <AdminDrawer/>
      
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
