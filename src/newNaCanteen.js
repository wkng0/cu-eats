import React, {useState} from 'react';
import {useEffect} from "react";
import './canteen.css';
// import NAmenu from './NAmenu';
// import Select from 'react-select';
import Axios from "axios"; 
import { Card,CardMedia,CardContent } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Select from 'react-select';
import { MenuItem } from '@mui/material';
import {Container} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';


function NewNACanteen() {
    const [listOfMenu, setListOfMenu] = useState([]);
    // make api call 
    useEffect(() => {
        Axios.get("http://localhost:7000/dbNewMenu/getMenu/NaMenu").then((response) => {
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



function NewShowDishes({menu}) {
    const [variant, setVariant] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const [price,setPrice]=useState(0);
    const variantList=[]
    useEffect(()=>{
        let data=variantList;
        for(let i=0;i<menu.varients.length;i++){
            const obj={
                value: i,
                label: menu.varients[i]
            }
            data.push(obj);
        }
    })
    
    const quantityList=[
        { value: 0, label: '0' },
        { value: 1, label: '1' },
        { value: 2, label: '2' }
    ]

    const handleVariant=(option)=>{
        setVariant(option.value)
        setPrice(menu.prices[variant]*quantity)

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
                        Price: ${menu.prices[variant]*quantity}
                    </Typography>
                    <Button variant="contained" endIcon={<AddShoppingCartIcon />}>
                        ADD TO CART
                    </Button>
  
              
        
                </CardContent>
            </Box>
        
        </Card>

            
    );


}


export default NewNACanteen;
