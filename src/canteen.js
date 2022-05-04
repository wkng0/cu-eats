// Component DeleteDishes - provides a view of menu list
   
// Calling Sequence: 
    // Login in as user -> click Edit Dishes in the navigate bar ->
    // called conponent DeleteDish  -> 

// Written 2022 semester 2

// Purpose: 
    // This module provides functions related to see the information about food 
    // items. It serves as a view for customers to see the menu of the canteen. 


// Data Structure: 
    // Variable loadFinish - boolean
    // variant - Number
    // quantity - Number
    // variantList - Object Array;
    // open, open2, open3, open4 - boolean
    // menu - object array
    // tag - object array
    // price - Number
    // canteenInfo - object array
    // listOfMenu - object array
    

// Algorithm for component DeleteDishes:
    // Part 1) get name of resaurant from the localStorage
        // the window.whichcan will be update correspound by the field: "canteen" 
                // 0: NaMenu
                // 1: ShawMenu
                // 2: UcMenu
            // if a guest enter URL localhost:3000/canteen,
            // call get requested fetch canteen information 
            // and call get requested fetch dishes from menu database
            // and called NewShowDishes component for each dishes
        
    // Part 2) show name, photo, tag, variant and price
        // corrsponding price would be shown according to variant
    
    // Part 3) when add to shopping cart 
     // shopping coponent will be called



import React, {useState,useContext} from 'react';
import {useEffect} from "react";
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
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { Chip,Stack } from '@mui/material';
import {Skeleton, Snackbar, Alert} from '@mui/material';
import { IconButton } from '@mui/material';


let canteenInfo=[];
let listOfMenu=[];

const menu=["NaMenu","ShawMenu","UcMenu"]

function Canteen(props) {
    console.log(listOfMenu)
    const [loadFinish,setLoadFinish]=useState(false);
    // make api call 
    useEffect(() => {

        Promise.all([
            fetch("/dbcanteenInfo/getCanteenInfo")
            .then(res=>res.json())
            .then(db=>canteenInfo=db),
            fetch("/dbMenu/getMenu/"+menu[props.value])
            .then(res=>res.json())
            .then(db=>listOfMenu=db)
            .then(()=>{
                setTimeout(()=>{
                    setLoadFinish(true)
                },1000) 
            })
        ]).then(()=>{setLoadFinish(true)});
    }, [])
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
            backgroundImage: `linear-gradient(rgba(182, 187, 205, 0.7), rgba(4,9,30,0.7)), url(${canteenInfo[props.value].canteen_image})`,  
            backgroundColor: "#5d4e99",
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "relative",
        }}>
            <div class="text-box">
                <h1>{canteenInfo[props.value].canteen_name}</h1>
                <p>{canteenInfo[props.value].canteen_description}</p>
                <a href={canteenInfo[props.value].website} class="hero-btn">Visit Us To Know More</a>
            </div>
        </section>

        {/* <!-- ----- restaurant ------ --> */}
        <div>
            <Container maxWidth="md">
                {listOfMenu.map( (menu) =>{
                    return(
                        <div>
                            <NewShowDishes menu={menu} canteen={canteenInfo[props.value].canteen_name}/>
                        </div>
                    );
                })}
            </Container>
        </div>
        </>
    )
}

function NewShowDishes(props){
    const [variant, setVariant] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const {addToCart, canteen, clearCart } = useContext(DishContext);
    const [price,setPrice]=useState(0);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2]=React.useState(false);
    const [open3, setOpen3]=React.useState(false);
    const [open4, setOpen4]=React.useState(false);
    let variantList=[];
    let menu=props.menu
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
    
    const quantityList=[
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },

    ]

    const handleVariant=(option)=>{
        setVariant(option.value)
        setPrice(menu.variants[variant].price*quantity)

    }
    const handleQuantity=(option)=>{
        setQuantity(option.value)
        
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
    };
    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen3(false);
    };
    const handleClose4 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen4(false);
    };

    const handleClick = () => {
        setOpen2(false);
        setOpen(true);
        setOpen3(false);
        setOpen4(false);
    };
    const handleClickOk = () => {
        setOpen(false);
        setOpen2(true);
        setOpen3(false);
        setOpen4(false);
    };
    const handleClickOtherCanteen=()=>{
        setOpen(false);
        setOpen2(false);
        setOpen3(true);
        setOpen4(false);
    }
    const handleClickCleared=()=>{
        clearCart();
        setOpen(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(true);
    }
    console.log(canteen);



    return(
        <>
        { !menu.hide ?
        <>
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
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Quantity
                    </Typography>
                    <Select 
                        options={quantityList} 
                        sx={{zIndex:99999}}
                        onChange={handleQuantity}
                        //ref
                        menuPortalTarget={document.body} 
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    />
                    
                    <Typography variant="h6" component="div" >
                        Price: ${menu.variants[variant].price*quantity}
                    </Typography>
                    <Button 
                        variant="contained" 
                        endIcon={<AddShoppingCartIcon />}
                        onClick={()=>{
                            if(canteen!=props.canteen && canteen!=""){
                                handleClickOtherCanteen();
                            }else if(quantity!=0){
                                localStorage.setItem("cartCanteen",props.canteen);
                                handleClickOk();
                                addToCart({id:menu._id,quantity:quantity,variant:menu.variants[variant],image: menu.image, title: menu.name})
                            }else{
                                handleClick();
                            }
                        }}
                        hidden={localStorage.getItem("type")=="admin"}
                    >
                        ADD TO CART
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Please choose at least one item into the cart!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
                        <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                            Item added to cart
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        open={open3}
                        autoHideDuration={6000}
                        onClose={handleClose3}
                        message="You have to clear your cart before adding other canteen's dishes!"
                        action={<React.Fragment>
                                    <Button color="secondary" size="small" onClick={handleClickCleared}>
                                        CLEAR CART
                                    </Button>
                                    <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={handleClose3}
                                    >
                                    <CloseIcon fontSize="small" />
                                    </IconButton>
                                </React.Fragment>
                                }
                    />
                    <Snackbar open={open4} autoHideDuration={6000} onClose={handleClose4}>
                        <Alert onClose={handleClose4} severity="success" sx={{ width: '100%' }}>
                            You have cleared your shopping cart
                        </Alert>
                    </Snackbar>

                </CardContent>
            </Box>
        
        </Card>
         </> :
        <></>
        }
        </>

            
    );


}
export default Canteen;
