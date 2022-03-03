import React from 'react';
import "./about-us.css";
import logo from './image/logo.jpeg';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Login } from './login';


class AboutUs extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <section className="header">
                <nav>
                    <a href="about-us.html"><img src={logo} width="100" height="100"></img></a>
                    <div className ="nav-links">
                        <ul>
                            <li><a href="">HOME</a></li>
                            <li><a href="">ABOUT US</a></li>
                            <li><a href="">Canteens</a></li>               
                        </ul>
                    </div>
                </nav>
                <div className="text-box">
                    <h1>CUHK's Biggest Food Delivery System</h1>
                    <p>We are delicate to provide to best food delivery system you, especially in this difficult time</p>
                        <a href="/login" className="hero-btn">Login</a>

                </div>
            </section>
            <Routes>
                <Route path="/login" element={<Login/>} />
            </Routes>
            </BrowserRouter>
        );
    }
}
export {AboutUs};