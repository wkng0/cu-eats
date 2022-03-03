import React from 'react';
import "./about-us.css";


class AboutUs extends React.Component {
    render() {
        return (
            <section className="header">
                <nav>
                    <a href="about-us.html"><img src="./logo.jpeg" width="100" height="100"></img></a>
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
                    <a href="" className="hero-btn">Visit Us To Know More</a>
                </div>
            </section>
        );
    }
}
export {AboutUs};