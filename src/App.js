import React from 'react';
import { AboutUs } from './aboutus';
import { LoginPage } from './login';
import { Comment } from './comment';

import './login.css';
import {NavBar,FixedBottomNavigation,Footer} from './component'
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<LoginPage/>} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/about" element={<AboutUs/>}/>
        </Routes>
        <FixedBottomNavigation/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
