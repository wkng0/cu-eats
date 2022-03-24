import React, {useState} from 'react';
import './canteen.css';
import UCmenu from './UCmenus';
// import ShowUCDishes from './ShowUCDishes';
// import { Modal } from 'react-bootstrap';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function ShowUCDishes({UCmenu}) {

    const [varient, setvarient] = useState('small');
    const [quantity, setquantity] = useState(1);

    return(
        <>
        <div style={{margin: '70px'}} className='shadow-lg p-3 mb-5 bg-white rounded'>

            <div>
                <h1>{UCmenu.name}</h1>
                <img src={UCmenu.image} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
                
            </div>


            <div className='w-100 m-1'>
                    <p>Quality</p>
                    <select className='form-control' value={quantity} onChange={(e)=>{setquantity(e.target.value)}}>
                        {[...Array(10).keys()].map((x, i)=> {
                            return <option value={i+1}>{i}</option>
                        })}
                    </select>
                </div>

                <div className='flex-container'>
                    <div className='m-1 w-100'>
                        <h1 className='mt-1'>Price: ${UCmenu.prices*(quantity-1)}</h1>
                    </div>

                    <div className='m-1 w-100'>
                        <button className='btn'>ADD TO CART</button>
                    </div>
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
