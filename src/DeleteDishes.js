// import React, {useState,useContext} from 'react';
import React, {useEffect, useState, useContext} from 'react';
import { UserContext } from './UserContext';
// import {useEffect} from "react";
import { DishContext } from './shoppingCart/sc-context';
import './canteen.css';
// import NAmenu from './NAmenu';
// import Select from 'react-select';
import Axios from "axios"; 
import { Card,CardMedia,CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Select from 'react-select';
import {Container} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Button } from '@mui/material';
import { Chip,Stack } from '@mui/material';
import {Skeleton} from '@mui/material';


let canteenInfo=[];
let listOfMenu=[];

const menu=["NaMenu","ShawMenu","UcMenu"]


window.number = 0;

function DeleteDish() {
  
    console.log(listOfMenu)
    const [loadFinish,setLoadFinish]=useState(false);
    // const [menunumber] = useState(props.value);
    window.number = -1; 

    if (localStorage.getItem('user') == "0") {
        window.number = 0;
        // alert(window.whichcan);
    } 
    if (localStorage.getItem('user') == "1") {
        window.number = 1;
        // alert(window.number);
    } 
    if (localStorage.getItem('user') == "2") {
        window.number = 2;
        // alert(window.whichcan);
    } 
    // make api call 
    useEffect(() => {
        if(loadFinish==false){
            fetch("/dbcanteenInfo/getCanteenInfo")
            .then(res=>res.json())
            .then(db=>canteenInfo=db)
            .then(
                fetch("/dbMenu/getMenu/"+menu[window.number])
                .then(res=>res.json())
                .then(db=>listOfMenu=db)
                .then(()=>{
                    setTimeout(()=>{
                        setLoadFinish(true)
                    },1000) 
                })
            )
        }
    });

    const redirectingtoLogin = () => {
        setTimeout(function () {
            window.location.assign("/login");
        }, 2000);
    }

    console.log(canteenInfo);

    if (window.number == -1) {
        return (
            <>
                <p>Please Login!</p>
                <p>redirecting to login page...</p>
                {redirectingtoLogin()}
            </>
        );
    } 
    else {
    if(loadFinish==false) {
        return (
            <>
                <Box sx={{mb:8}}>
                    <Skeleton animation="wave" variant="rectangular" width={"100%"} height={"60vh"} />
                </Box>
                <Box sx={{mx:10}}>
                    <Skeleton animation="wave" variant="rectangular" width={"100%"} height={300} />
                </Box>
                
            </>
        )
    }
    else return(
        <>
        <section style={{
            minHeight: "60vh",
            width: "100%",
            backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${canteenInfo[window.number].canteen_image})`,  
            backgroundColor: "#5d4e99",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "relative",
        }}>
            <div class="text-box">
                <h1>{canteenInfo[window.number].canteen_name}</h1>
                <p>{canteenInfo[window.number].canteen_description}</p>
                <a href={canteenInfo[window.number].website} class="hero-btn">Visit Us To Know More</a>
            </div>
        </section>

        {/* <!-- ----- restaurant ------ --> */}
        <div>
            <Container maxWidth="md">
                {listOfMenu.map( (menu) =>{
                    return(
                        <div>
                            <NewShowDishes menu={menu}/>
                        </div>
                    );
                })}
            </Container>
        </div>
        </>
    )
            }
}

const canteen=["NaMenu","ShawMenu","UcMenu"]

function NewShowDishes({menu} , value){

    const {user, setUser} = useContext(UserContext);
    const [variant, setVariant] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const {addToCart} = useContext(DishContext);
    const [price,setPrice]=useState(0);
    let variantList=[];
    const tag=menu.tag;
    
    useEffect(()=>{
        console.log(tag)
        let data=variantList;
        for(let i=0;i<menu.variants.length;i++){
            const obj={
                value: i,
                label: menu.variants[i].name
            }
            data.push(obj);
        
        }
        //console.log(variantList);
    })
    
    // const quantityList=[
    //     { value: 0, label: '0' },
    //     { value: 1, label: '1' },
    //     { value: 2, label: '2' }
    // ]

    const handleVariant=(option)=>{
        setVariant(option.value)
        setPrice(menu.variants[variant].price*quantity)

    }
    const handleQuantity=(option)=>{
        setQuantity(option.value)
        
    }
    const deleteDish = (id)=>{
        if(localStorage.getItem('type')=="guest"){
            window.location.assign("/login");
        }else if(localStorage.getItem('type')=="restaurant"){
            Axios.delete(`http://localhost:7000/dbNewMenu/deleteDishes/${canteen[window.number]}/${id}`)
            .then(()=>{
                alert("deleted!" ); 
                window.location.reload();
            }).catch("You cannot edit other canteen!");
        }
    }


    const hideDish = (id) => {
        if(localStorage.getItem('type')=="guest"){
            window.location.assign("/login");
        }else if(localStorage.getItem('type')=="restaurant"){
            Axios.put(`http://localhost:7000/dbNewMenu/hideDishes/${canteen[window.number]}/${id}`)
            .then(()=>{
                alert("Hide Menu!"); 
                window.location.reload();
            });
        }
    }

    const unhideDish = (id) => {
        if(localStorage.getItem('type')=="guest"){
            window.location.assign("/login");
        }else if(localStorage.getItem('type')=="restaurant"){
            Axios.put(`http://localhost:7000/dbNewMenu/unhideDishes/${canteen[window.number]}/${id}`)
            .then(()=>{
                alert("Un-Hide Menu!"); 
                window.location.reload();
            });
        }
    }
    
    // const [newprice] = useState(0);
    const EditPrice = (id, variantitem) => {
        if(localStorage.getItem('type')=="guest"){
            window.location.assign("/login");
        }else if(localStorage.getItem('type')=="restaurant"){
            const newPrice = prompt("Enter new price: ");
            if (newPrice != "") {
                const StringPrice = String(newPrice);
                Axios.put(`http://localhost:7000/dbNewMenu/updatePrices/${canteen[window.number]}/${id}/${variantitem}/${StringPrice}`)
                .then(()=>{
                    alert("Price Updated"); 
                    window.location.reload();
                });
            }
        }
    }

    return(
        <Card sx={{display:"flex", alignItems: 'center', my:5}}>
            <CardMedia
                component="img"
                sx={{ width: 300, height:300 }}
                image={menu.image}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6" fullWidth>
                        {menu.name}
                    </Typography>
                    <Stack direction="row" spacing={1}>

                    
                    {tag.map((file,i) =>{   
                        return (
                            <Chip
                                label={tag[i].label}
                                color={tag[i].color}
                            />   
                        );
                    })}
                    </Stack>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Variants
                    </Typography>
                    <Select 
                        options={variantList} 
                        sx={{zIndex:99999}}
                        onChange={handleVariant}
            
                        //ref
                        menuPortalTarget={document.body} 
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    />
                        {/* <Typography variant="subtitle1" color="text.secondary" component="div">
                            Quantity
                        </Typography> */}
                            {/* <Select 
                                options={quantityList} 
                                sx={{zIndex:99999}}
                                onChange={handleQuantity}
                                //ref
                                menuPortalTarget={document.body} 
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            /> */}
                    
                    <Typography variant="h6" component="div" >
                        Price: ${menu.variants[variant].price}
                    </Typography>
                    
                    <Button 
                        variant="contained" 
                        endIcon={<CurrencyExchangeIcon />}
                        onClick={()=>{
                            EditPrice(menu._id, menu.variants[variant].name);
                        }}
                        hidden={localStorage.getItem("type")=="admin"}
                    >
                        Edit Price
                    </Button>

                    {"   "}
                    <Button 
                        variant="contained" 
                        endIcon={<DeleteIcon />}
                        onClick={()=>{
                            deleteDish(menu._id);
                        }}
                        hidden={localStorage.getItem("type")=="admin"}
                    >
                        Delete
                    </Button>
                    {"     "}
                    { !menu.hide ? 
                    <>
                    <Button 
                        variant="contained" 
                        endIcon={<VisibilityOffIcon />}
                        onClick={()=>{
                            hideDish(menu._id);
                        }}
                        hidden={localStorage.getItem("type")=="admin"}
                    >
                        Hide
                    </Button>
                    </>
                    : 
                    <Button 
                        variant="contained" 
                        endIcon={<VisibilityIcon />}
                        onClick={()=>{
                            unhideDish(menu._id);
                        }}
                        hidden={localStorage.getItem("type")=="admin"}
                    >
                        Un-Hide
                    </Button>
                    }
                </CardContent>
            </Box>
        
        </Card>

            
    );


}
export default DeleteDish;



//     // const updatePrices = (id) => {
//     //     const newAge = prompt("Enter new age: ");
    
//     //     Axios.put('http://localhost:3001/update', {newAge: newAge, id: id}).then(()=>{
//     //       setListOfFriends(listOfFriends.map((val)=> {
//     //         return val._id == id 
//     //           ? {_id: id, name: val.name, age: newAge} 
//     //           : val;
//     //       }))
//     //     });
//     //   }

