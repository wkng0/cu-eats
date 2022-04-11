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
import { Button } from '@mui/material';
import { Chip,Stack } from '@mui/material';
import {Skeleton} from '@mui/material';


let canteenInfo=[];
let listOfMenu=[];

const menu=["NaMenu","ShawMenu","UcMenu"]

function Canteen(props) {
    console.log(listOfMenu)
    const [loadFinish,setLoadFinish]=useState(false);
    // make api call 
    useEffect(() => {
        if(loadFinish==false){
            fetch("http://localhost:7000/dbcanteenInfo/getCanteenInfo")
            .then(res=>res.json())
            .then(db=>canteenInfo=db)
            .then(
                fetch("http://localhost:7000/dbMenu/getMenu/"+menu[props.value])
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
    console.log(canteenInfo)
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
    const {addToCart} = useContext(DishContext);
    const [price,setPrice]=useState(0);
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
        { value: 2, label: '2' }
    ]

    const handleVariant=(option)=>{
        setVariant(option.value)
        setPrice(menu.variants[variant].price*quantity)

    }
    const handleQuantity=(option)=>{
        setQuantity(option.value)
        
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
                            if(quantity!=0){
                                localStorage.setItem("cartCanteen",props.canteen);
                                addToCart({id:menu._id,quantity:quantity,variant:menu.variants[variant],image: menu.image, title: menu.name})
                            }
                        }}
                        hidden={localStorage.getItem("type")=="admin"}
                    >
                        ADD TO CART
                    </Button>

                </CardContent>
            </Box>
        
        </Card>

            
    );


}
export default Canteen;
