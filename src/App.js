import React from 'react';
import { AboutUs } from './aboutus';
import { LoginPage } from './login';
import { Comment} from './comment';
import { Profile, Account, Address} from './profile';
import { HomePage} from './HomePage'

import './login.css';
import {NavBar} from './component'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';


function App() {
  return (
    <div className="App" style={{zIndex:9999 ,position:"relative"}}>
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/about" element={<HomePage/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/account" element={<Account/>} />
          <Route path="/profile/address" element={<Address/>} />
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
