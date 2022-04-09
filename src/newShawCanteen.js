import React, {useState} from 'react';
import {useEffect} from "react";
import './canteen.css';
// import menu from './menu';
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
import { Stack } from '@mui/material';
import { Chip } from '@mui/material';

function NewShawCanteen() {
    const [listOfMenu, setListOfMenu] = useState([]);
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
                    >
                        ADD TO CART
                    </Button>

                </CardContent>
            </Box>
        
        </Card>

            
    );


}

export default NewShawCanteen;
