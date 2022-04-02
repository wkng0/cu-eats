import React from 'react';



import { LoginPage } from './login';
import { UserComment, ContentPreview, AdminComment} from './comment';
import { Profile, Account, Address} from './profile';
import { Cart } from './cart'
import { Checkout } from './checkout'
import { HomePage }  from './HomePage';

import UCCanteen from './UCcanteen';
import NACanteen from './NAcanteen';
import ShawCanteen from './ShawCanteen';


import './login.css';
import {NavBar} from './component'
import { BrowserRouter, Route, Routes, useLocation, useParams} from 'react-router-dom';


import { ShoppingCart } from './shoppingCart/sc-context';


function App() {
  return (
    <div className="App" style={{zIndex:9999 ,position:"relative"}}>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/comment" element={<UserComment />} />
          <Route path="/comment/:canteen/:id" element={<ContentPreview />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/profile/account" element={<Account/>} />
          <Route path="/profile/address" element={<Address/>} />
          <Route path="/ShoppingCart" element={<ShoppingCart/>} />
          <Route path="/UCcanteen" element={<UCCanteen/>} />
          <Route path="/NAcanteen" element={<NACanteen/>} />
          <Route path="/Shawcanteen" element={<ShawCanteen/>} />

          <Route path="/admin/comment/" element={<AdminComment/>}/>
          
          
          
          
          
          
          <Route path="*" element={<NoMatch/>} />
          
        </Routes>
      </BrowserRouter>
      
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
