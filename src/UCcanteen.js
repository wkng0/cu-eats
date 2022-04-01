import React, {useState} from 'react';
import {useEffect} from "react";
import './canteen.css';
// import menu from './menu';
// import Select from 'react-select';
import Axios from "axios"; 


function UCCanteen() {

    const [varient, setvarient] = useState('small');
    const [quantity, setquantity] = useState(1);

    const [listOfMenu, setListOfMenu] = useState([]);
    const [name] = useState("");
    const [varients] = useState([]);
    const [prices] = useState([]);
    const [username] = useState("");


    // make api call 
    useEffect(() => {
        Axios.get("http://localhost:7000/dbMenu/getMenu/UCMenu").then((response) => {
            setListOfMenu(response.data)
        });
    }, []);


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

        {/* <!-- ----- restaurant ------ --> */}
        <div>
            <div className="row">
                {listOfMenu.map( (menu) =>{
                    return(
                        <div>
                            {/* <ShowNADishes menu={menu}/> */}
                             <div style={{margin: '70px'}} className='shadow-lg p-3 mb-5 bg-white rounded'>

                                <div>
                                    <h1>{menu.name}</h1>
                                    <img src={menu.image} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
                                    {/* <h3>${menu.prices}</h3> */}
                                    <div className='w-100 m-1'>
                                        <p>Varients</p>
                                            <select className='form-control' value={varient} onChange={(e)=> {setvarient(e.target.value)}}>
                                                {menu.varients.map(varient=>{
                                                    return <option value={varient}>{varient}</option>
                                                })} 
                                            </select>
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
                                            <h1 className='mt-1'>Price: ${menu.prices[0][varient]*(quantity-1)}</h1>
                                        </div>

                                        <div className='m-1 w-100'>
                                            <button className='btn'>ADD TO CART</button>
                                        </div>
                                    </div>

                                </div>

                                

                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
        </>
    )
}

export default UCCanteen;
