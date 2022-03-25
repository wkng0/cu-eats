import React from 'react';
import { AboutUs } from './aboutus';
import { LoginPage } from './login';
import { Comment, ContentPreview} from './comment';
import { Profile, Account, Address} from './profile';
import { Cart } from './cart'
import HomePage  from './HomePage';
import UCCanteen from './UCcanteen';
import NACanteen from './NAcanteen';
import ShawCanteen from './ShawCanteen';

import './login.css';
import {NavBar} from './component'
import { BrowserRouter, Route, Routes, useLocation, useParams} from 'react-router-dom';
import { TabContent } from 'react-bootstrap';


function App() {
  return (
    <div className="App" style={{zIndex:9999 ,position:"relative"}}>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/comment/:canteen/:id" element={<ContentPreview />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/account" element={<Account/>} />
          <Route path="/profile/address" element={<Address/>} />
          <Route path="/shoppingCart" element={<Cart/>} />
          <Route path="/UCcanteen" element={<UCCanteen/>} />
          <Route path="/NAcanteen" element={<NACanteen/>} />
          <Route path="/Shawcanteen" element={<ShawCanteen/>} />
          <Route path="*" element={<NoMatch/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

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
