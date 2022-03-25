import './HomePage.css';
import React from 'react';
import logo from './HomePageimages/logo.jpeg';
import lemonPie from './HomePageimages/lemonPie.jpeg';
import RedBean from "./HomePageimages/RedBeanIcyDrink.jpg";
import Toast from "./HomePageimages/Toast.jpg";
import NA from "./HomePageimages/NAcan.jpg";
import UC from "./HomePageimages/UCcan.jpg";
import Shaw from "./HomePageimages/Shawcan.jpg";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';


// class HomePage extends React.Component {
//   render() {
function HomePage() {
    return (
      <> 

        <section class="header">
            <nav>
                <a href="about-us.html"><img src={logo} width="100" height="100" alt= 'logo'></img></a>
                <div class ="nav-links" id="navLinks">
                    <i class="fa fa-times" onclick="hideMenu()"></i>
                    <ul>
                        <li><a href="/">HOME</a></li>
                        <li><a href="">ABOUT US</a></li>
                        {/* <li><a href="/canteen">Canteens</a></li>   */}
                        <i class="fa-solid fa-cart-shopping"/>
                        <li><a href="">Shopping Cart</a></li>             
                    </ul>
                </div>
                <i class="fa fa-bars" onclick="showMenu()"></i>
            </nav>
            
            <div class="text-box">
                <h1>CUHK's Food Delivery System</h1>
                <p>We are delicate to provide to best food delivery system you, espiecally in this diffcult time</p>
                <a href="" class="hero-btn">Visit Us To Know More</a>
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
                        <p>SeeYou@Shaw是一個結合良朋好友和優質餐飲，並使你足以自豪的理想社群。

                            SeeYou@Shaw也是一個建基於友情的品牌。
                            
                            2016年初，我們獲得投標經營逸夫書院學生飯堂的機會，而這次投標剛好出現於各人事業生涯中的合適時機，因緣際會之下，成就了SeeYou@Shaw的誕生。
                        </p>
                    </div>
                </a>
            </div> 
                */}

                
    
        {/* </section> */}

        <section class="Location">
            <h1>Restaurant We Offer</h1>
            <p></p>

            <div class="row">
           
                <div class="location-col">
                <a className="NAcanLink" href={"/NACanteen"}>
                    <img src={NA}/>
                    <h3>NA can</h3>
                    <p> 地址:新亞樂群館梁雄姬樓地下  <br/>
                        電話訂位: 沒有電話號提供 <br/>
                        價錢每人: 50以下 <br/>
                        人氣指數: 15</p>
                </a>
                </div>
            

                <div class="location-col">
                    <a className="UCcanLink" href={"/UCCanteen"}>
                    <img src={UC}/>
                    <h3>UC can</h3>
                    <p> Opening Hours:     
                        Monday to Saturday:          11:00am – 8:45pm <br/>
                        Sunday and Public Holidays:  Closed <br/>
                        <br/>
                        Last order for dine-in service: 5:30pm    
                        <br/>                    
                        Take-away and delivery service (over HK$30) will continue after 6:00pm.   <br/> 
                        <br/>                     
                        Order Hotline for On-campus Delivery: Whatsapp 9094 1558</p>
                    </a>
                </div>

                <div class="location-col">
                <a className="ShawcanLink" href={"/ShawCanteen"}>
                    <img src={Shaw}/>
                    <h3>Shaw can</h3>
                    <p> 
                        營業時間 : 上午11時至下午2時30分 (星期一至五)<br/>
                        備註:SeeYou@Shaw 風味小館的膳食服務維持暫停 <br/>
                        如有查詢或其他服務安排，請與餐廳聯絡，電話 2267 0618。</p>
                </a>
                </div>
            </div>
        </section>

       


        {/* <!-- -----Dishes----- --> */}
        <section class="Dishes">
            <h1>Popular Dishes</h1>
            <p>CUHK has a lot popular food dishes that becomes memory to students</p>

            <div class="row">
                <div class="dishes-col">
                    <img src={lemonPie}/>
                    <div class="layer">
                        <h3>Med can: Lemon Pie</h3>
                    </div>
                </div>

                <div class="dishes-col">
                    <img src={RedBean}/>
                    <div class="layer">
                        <h3>NA can: Red Bean Icy Drink</h3>
                    </div>
                </div>

                <div class="dishes-col">
                    <img src={Toast}/>
                    <div class="layer">
                        <h3>蘭苑Orchid Lodge: Super Thick French toast</h3>
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


export default HomePage;
