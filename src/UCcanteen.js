import React from 'react';
import './canteen.css';
import UCmenu from './UCmenus';
// import ShowUCDishes from './ShowUCDishes';
// import { Modal } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function ShowUCDishes({UCmenu}) {


    return(
        <>
        <div style={{margin: '70px'}} className='shadow-lg p-3 mb-5 bg-white rounded'>

            <div>
                <h1>{UCmenu.name}</h1>
                <img src={UCmenu.image} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
            </div>

        </div>
        </> 
    );
}

export default function UCCanteen() {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    return(
        <>
        <section class="UCheader">
            <div class="text-box">
                    <h1>UC Canteen</h1>
                    <p>The College Staff and Student Canteens are located on the G/F of the Cheung Chuk Shan Amenities Building.  <br/>
                        The total floor area is about 570 square metres and it can serve up to 360 people. <br/>
                         The College canteens are now operated by Joyful Inn Limited.  </p>
                    <a href="https://www.uc.cuhk.edu.hk/canteen/" class="hero-btn">Visit Us To Know More</a>
            </div>
        </section>

        <div>
            <div className="row">
                {UCmenu.map(UCmenu =>{
                    return(
                        <div>
                            <ShowUCDishes UCmenu={UCmenu}/>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}



// export default UCCanteen;
