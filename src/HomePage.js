// Component HomePage - provides Homepage fre the customer side
   
// Calling Sequence: when login -> call useeffect
   
// Written 2022 semester 2

// Purpose: it serves the view of the starting page of the applcation

// Data Structure: 


// Algorithm of component HomePage:
    // Part 1) set user on localStorage
        // if the user is undefined 
        // then set user field in localstorage 
    
    // Part 2) Show UI of Homepage
        // Firstly, show the session header
        // then restaurant 
        // then dishes which is popular among cuhk

import './HomePage.css';
import React, {useContext, useEffect} from 'react';
import { UserContext } from "./UserContext";
import logo from './HomePageimages/logo.jpeg';
import lemonPie from './HomePageimages/lemonPie.jpeg';
import RedBean from "./HomePageimages/RedBeanIcyDrink.jpg";
import Toast from "./HomePageimages/Toast.jpg";
import NA from "./HomePageimages/NAcan.jpg";
import UC from "./HomePageimages/UCcan.jpg";
import Shaw from "./HomePageimages/Shawcan.jpg";
import { BrowserRouter, Route, Routes, useLocation,Link } from 'react-router-dom';


// class HomePage extends React.Component {
//   render() {
function HomePage() {
    const {user, setUser} = useContext(UserContext);
    useEffect(()=>{
        if(localStorage.getItem('user') != undefined){
            setUser(localStorage.getItem('user'));
            console.log("set!",user);
        }
    })
    return (
      <> 

        <section className="header">
            <nav>
                {/*
                <a href="about-us.html"><img src={logo} width="100" height="100" alt= 'logo'></img></a>
                <div class ="nav-links" id="navLinks">
                    <i class="fa fa-times" onclick="hideMenu()"></i>
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="">ABOUT US</a></li>
                        <li><a href="/canteen">Canteens</a></li>   
                        
                        <i class="fa-solid fa-cart-shopping"/>
                        <li><a href="">Shopping Cart</a></li>             
                    </ul>
                </div>
                */}
                <i className="fa fa-bars" onClick="{showMenu()}"></i>
            </nav>
            
            <div className="text-box">
                <h1>CUHK's Food Delivery System</h1>
                <p>We are delicate to provide to best food delivery system you, espiecally in this diffcult time</p>
                {/* <Link to="" className ="hero-btn" style={{textDecoration: 'none'}}>Visit Us To Know More</Link> */}
            </div>

        </section>

        {/* <!-- ----- restaurant ------ --> */}
        {/* <section class="restaurant">
            <h1>Restaurant We Offer</h1>
            <p>Lorem ipsum sit amet, consectetur adipiscine eilt.</p>

            <div class="row-1">

                <a className="UCcanLink" href={"/UCCanteen"}>

                    <div class="restaurant-col">
                        <h1 class="text-left">UC Can</h1> */}
                        {/* <div class="row text-left"> */}
                            {/* <div class="col-md-3">
                                <img src={UC} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
                            </div>

                            <div class="col-md-9 text-left">
                                <p>The College Staff and Student Canteens are located on the G/F of the Cheung Chuk Shan Amenities Building. 
                                    The total floor area is about 570 square metres and it can serve up to 360 people.  
                                    The College canteens are now operated by Joyful Inn Limited.  
                                </p>
                            </div> */}
                        {/* </div> */}
                    {/* </div>
                </a> */}
                
                {/* <a className="NAcanLink" href={"/NACanteen"}>
                    <div class="restaurant-col">
                        <h1 class="text-left">NA Can</h1>
                        <div class="col-md-3">
                            <img src={NA} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
                        </div>

                        <div class="col-md-11 text-left">
                            <p>New Asia Canteen is operated by a local innovative catering service company, Fortune River Catering Ltd., 
                                which is established by a group of New Asia and CUHK alumni, 
                                with an aim to provide high quality food and dining environment for students and staff of New Asia College and the University.  
                            </p>
                        </div>
                    </div>
                </a>

                <a className="ShawcanLink" href={"/ShawCanteen"}>
                    <div class="restaurant-col">
                        <h3>Shaw Can</h3>
                        <img src={Shaw} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
                        <p>SeeYou@Shaw????????????????????????????????????????????????????????????????????????????????????

                            SeeYou@Shaw???????????????????????????????????????
                            
                            2016????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????SeeYou@Shaw????????????
                        </p>
                    </div>
                </a>
            </div> 
                */}

                
    
        {/* </section> */}

        <section className="Location">
            <h1>Restaurant We Offer</h1>
            <p></p>

            <div className="row">
           
                <div className="location-col">
                <Link className="NAcanLink" to="/NaCanteen" style={{textDecoration: 'none'}}>
                    <img src={NA}/>
                    <h3>NA can</h3>
                    <p> ??????:?????????????????????????????????  <br/>
                        ????????????: ????????????????????? <br/>
                        ????????????: 50?????? <br/>
                        ????????????: 15</p>
                </Link>
                </div>
            

                <div className="location-col">
                    <Link className="UCcanLink" to="/UcCanteen" style={{textDecoration: 'none'}}>
                    <img src={UC}/>
                    <h3>UC can</h3>
                    <p> Opening Hours:     
                        Monday to Saturday:          11:00am ??? 8:45pm <br/>
                        Sunday and Public Holidays:  Closed <br/>
                        <br/>
                        Last order for dine-in service: 5:30pm    
                        <br/>                    
                        Take-away and delivery service (over HK$30) will continue after 6:00pm.   <br/> 
                        <br/>                     
                        Order Hotline for On-campus Delivery: Whatsapp 9094 1558</p>
                    </Link>
                </div>

                <div className="location-col">
                <Link className="ShawcanLink" to="/ShawCanteen" style={{textDecoration: 'none'}}>

                    <img src={Shaw}/>
                    <h3>Shaw can</h3>
                    <p> 
                        ???????????? : ??????11????????????2???30??? (???????????????)<br/>
                        ??????:SeeYou@Shaw ??????????????????????????????????????? <br/>
                        ??????????????????????????????????????????????????????????????? 2267 0618???</p>
                </Link>
                </div>
            </div>
        </section>

       


        {/* <!-- -----Dishes----- --> */}
        <section className="Dishes">
            <h1>Popular Dishes</h1>
            <p>CUHK has a lot popular food dishes that becomes memory to students</p>

            <div className="row">
                <div className="dishes-col">
                    <img src={lemonPie}/>
                    <div className="layer">
                        <h3>Med can: Lemon Pie</h3>
                    </div>
                </div>

                <div className="dishes-col">
                    <img src={RedBean}/>
                    <div className="layer">
                        <h3>NA can: Red Bean Icy Drink</h3>
                    </div>
                </div>

                <div className="dishes-col">
                    <img src={Toast}/>
                    <div className="layer">
                        <h3>??????Orchid Lodge: Super Thick French toast</h3>
                    </div>
                </div>
            </div>
        </section>
        



        {/* <!-- ---JavaScript for Toggle Menu----- -->
        // <script>
        //     var navLinks = document.getElementById("navLinks");

        //     function showMenu() {
        //         navLinks.style.right = "0";                
        //     }
        //     function hideMenu() {
        //         navLinks.style.right = "-200px";                
        //     }
        // </script> */}

      </>
    );
  }
// }

export {HomePage};
