import React, {useState} from 'react';
import {useEffect} from "react";
import './canteen.css';
// import menu from './menu';
// import Select from 'react-select';
import Axios from "axios"; 


function NewShawCanteen() {

    const [varient, setvarient] = useState('');
    const [quantity, setquantity] = useState(1);

    const [listOfMenu, setListOfMenu] = useState([]);
    const [name] = useState("");
    const [varients] = useState([]);
    const [prices] = useState([]);
    const [username] = useState("");


    // make api call 
    useEffect(() => {
        Axios.get("http://localhost:7000/dbNewMenu/getMenu/ShawMenu").then((response) => {
            setListOfMenu(response.data)
        });
    }, []);


    return(
        <>
         <section class="Shawheader">
            <div class="text-box">
                    <h1>Shaw Canteen</h1>
                    <p>SeeYou@Shaw是一個結合良朋好友和優質餐飲，並使你足以自豪的理想社群。

                        SeeYou@Shaw也是一個建基於友情的品牌。

                        2016年初，我們獲得投標經營逸夫書院學生飯堂的機會，而這次投標剛好出現於各人事業生涯中的合適時機，因緣際會之下，成就了SeeYou@Shaw的誕生。 </p>
                    <a href="https://www.shaw.cuhk.edu.hk/zh/content/shaw-college-seeyoushaw-resuming-lunch-dine-services" class="hero-btn">Visit Us To Know More</a>
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
                                                return <option value={i+1}>{i+1}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className='flex-container'>

                                        <div className='m-1 w-100'>
                                            {/* menu.prices[0]*(quantity) */}
                                            <h1 className='mt-1'>Price: ${menu.prices[0]}</h1>
                                        </div>

                                        {/* <div className='m-1 w-100'>
                                            <h1 className='mt-1'>Price: ${menu.prices[menu.varients.indexOf(varient)]*(quantity)}</h1>
                                        </div> */}

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

export default NewShawCanteen;
