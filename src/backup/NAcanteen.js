import React, {useState} from 'react';
import {useEffect} from "react";
import './canteen.css';
// import NAmenu from './NAmenu';
// import Select from 'react-select';
import Axios from "axios"; 


function NACanteen() {

  

    const [listOfMenu, setListOfMenu] = useState([]);


    // make api call 
    useEffect(() => {
        Axios.get("http://localhost:7000/dbMenu/getMenu/NaMenu").then((response) => {
            setListOfMenu(response.data)
        });
    }, []);


    return(
        <>
        <section class="NAheader">
            <div class="text-box">
                    <h1>NA Canteen</h1>
                    <p>New Asia Canteen is operated by a local innovative catering service company, Fortune River Catering Ltd., 
                        which is established by a group of New Asia and CUHK alumni, 
                        with an aim to provide high quality food and dining environment for students and staff of New Asia College and the University.   </p>
                    <a href="http://www.na.cuhk.edu.hk/en-us/aboutnewasia/news.aspx?udt_1148_param_detail=14215" class="hero-btn">Visit Us To Know More</a>
            </div>
        </section>

        {/* <!-- ----- restaurant ------ --> */}
        <div>
            <div className="row">
                {listOfMenu.map( (menu) =>{
                    return(
                        <div>
                            <ShowDishes menu={menu}/>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    )
}


function ShowDishes({menu}) {
    const [varient, setvarient] = useState('small');
    const [quantity, setquantity] = useState(1);

    const [name] = useState("");
    const [varients] = useState([]);
    const [prices] = useState([]);
    const [username] = useState("");

    return(
        <div>
        {/* <ShowNADishes NAmenu={NAmenu}/> */}
            <div style={{margin: '70px'}} className='shadow-lg p-3 mb-5 bg-white rounded'>

            <div>
                <h1>{menu.name}</h1>
                <img src={menu.image} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
                {/* <h3>${NAmenu.prices}</h3> */}
                <div className='w-100 m-1'>
                    <p>Varients</p>
                        <select className='form-control' value={varient} onChange={(e)=> {setvarient(e.target.value)}}>
                            {menu.varients.map(varient=>{
                                return <option value={varient}>{varient}</option>
                            })} 
                        </select>
                </div>

                <div className='w-100 m-1'>
                    <p>Quantity</p>
                    <select className='form-control' value={quantity} onChange={(e)=>{setquantity(e.target.value)}}>
                        {[...Array(10).keys()].map((x, i)=> {
                            return <option value={i+1}>{i+1}</option>
                        })}
                    </select>
                </div>

                <div className='flex-container'>
                    <div className='m-1 w-100'>
                        <h1 className='mt-1'>Price: ${menu.prices[0][varient]*(quantity)}</h1>
                    </div>

                    <div className='m-1 w-100'>
                        <button className='btn'>ADD TO CART</button>
                    </div>
                </div>

            </div>
        </div>

    </div>
    );


}

export default NACanteen;
