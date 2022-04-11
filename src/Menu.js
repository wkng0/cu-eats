import React, {useState,useContext} from 'react';
import {useEffect} from "react";
import { DishContext } from './shoppingCart/sc-context';
import './canteen.css';
import './HomePage.css';
// import NAmenu from './NAmenu';
// import Select from 'react-select';
import Axios from "axios"; 
import { Card,CardMedia,CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Select from 'react-select';
import {Container} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';
import { Chip,Stack } from '@mui/material';
import { BrowserRouter, Route, Routes, useLocation,Link } from 'react-router-dom';


function ShowCanteen() {
    const [listOfCanteen, setListOfCanteen] = useState([]);
    //
    useEffect(() => {
        Axios.get("http://localhost:7000/dbcanteeninfo/getCanteenInfo").then((response) => {
            setListOfCanteen(response.data)
        });
    }, []);
    return(
        <>
        <section class="Menuheader">
            <div class="text-box">
                    <h1>Menu We Offer</h1>
                    <p>We are delicate to provide to best food delivery system you, espiecally in this diffcult time</p>
                    {/* <a href="http://www.na.cuhk.edu.hk/en-us/aboutnewasia/news.aspx?udt_1148_param_detail=14215" class="hero-btn">Visit Us To Know More</a> */}
            </div>
        </section>

        <section className="Location">
            <h1>Restaurant We Offer</h1>
            {listOfCanteen.map( (canteen) =>{
                return(
                    <>
                    <div className="location-col-inmenu">
                        <Link className="Link" to={canteen.canteen_link} style={{textDecoration: 'none'}}>
                            <img src={canteen.canteen_image}/>
                            <h3>{canteen.canteen_name}</h3>
                            <p>{canteen.canteen_description}</p>
                        </Link>
                    </div>
                    </>
                );
            })}
            <p></p>
         </section>
        </>
    )
}


export default ShowCanteen;
