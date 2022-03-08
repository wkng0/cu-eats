import React from 'react';
import "./about-us.css";
import logo from './image/logo.jpeg';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { LoginPage, Login } from './login';
import  ReactDOM from 'react-dom';


class AboutUs extends React.Component {
    renderLoginPage(){
        ReactDOM.render(<LoginPage/>, document.getElementById('root'));
    }
    render() {
        return (
            <>
      
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
                        <a onClick={this.renderLoginPage} className="hero-btn">Login</a>

                </div>
            </section>
       
            </>
        );
    }
}
export {AboutUs};