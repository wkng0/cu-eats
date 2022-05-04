// Component AddDishes - provides functions to let restaurant to add dishes
   
// Calling Sequence: 
    // Login in as restaurant -> click Add Dishes in the navigate bar ->called AddDishes Component
   // enter information of dishes ->
   // click "Please Add Variant and Price In pairs" -> Called function saveVariant ->
   // click cross buuton on variant -> called function handleDelete ->
   // click "Add Tag" -> Called function savetag  ->
   // click cross buuton on tag -> called function handleChangeColor ->
   // click button "Add dishes" -> called function AddDishes -> 
   // call post request
   // Written 2022 semester 2

// Purpose: it serves as a control platform to add dish information about food dishes. 
    // For the canteen side, the canteen manager can add dishes 
    // by entering the name, image URL, category, tags, and pairs of variants and prices. 

// Data Structure: 
    // Variable user - String
    // Variable name - String
    // Variable variant - String
    // Variable variantList - String array 
    // Variable price - Number
    // Variable pricesList - Number array
    // Variable category - String
    // Variable image - String
    // Variable tag - String
    // Variable tagError - Boolean
    // Variable tagList - String array 
    // Variable tagList - String
    // Variable chipData - String array 
    // Variable color - String
    // Variable variantError - Boolean
    // Variable nameError - Boolean
    // Variable hide - StrBooleaning
    // Variable name - String
    // Variable window.whichcan - Number


// Algorithm of component AddDishes:
    // Part 1) get name of resaurant from the localStorage
        // if a guest enter URL localhost:3000/addDishes,
        // the user will be redirected to the login page

        // if a restaurant user enter URL localhost:3000/addDishes,
        // the field "user" from localStorage will be checked 
        // the window.whichcan will be update correspound by the field: "user" 
            // 0: NaMenu
            // 1: ShawMenu
            // 2: UcMenu
        // so that user can only post data to its own collection in the database

    // Part 2) When button "Please Add Variant and Price In pairs" is pressed
        // The field "Variant" and "Price" could not empty
        // or else the function saveVariant will not be called and 

        // then function saveVariant will be called
        // the variant and price will be pushed to a temporarty array 
        // and a new variant tag will be show to the pages

        // when tag is clicked on the crossed icon 
        // the function handleDelete will be called
        // the array of the corresponding variant will be popped
    
    // Part 3) When button "Add Tag"
        // the name of tag and the color of tag must be selected 
        // the function "handleChangeTag" will be called
        // or else the function "saveTag" will not be called

        // when the the function "saveTag" will be called
        // then handleChangeColor is called
        // the array of the corresponding tag will be popped
        // and a tag will be show to the pages

        // when tag is clicked on the crossed icon 
        // the function handleDelete will be called
        // the array of the corresponding variant will be popped

    // Part 4) When button "Add Dishes"
        // the field of the input form will also be checked to
        // if the inputted field "Name" is empty or 
        // if the inputted field "Variant List" is empty 
        // it wont not call post requested and remind user to input back the Name
        
        // if there are no problem no input and user is restaurant role
        // after click button "Add Dishes", a post request will be made to api
        // and it will update the coorespounding canteen meun database
        
        // if the dishes is successfully added in the menu database
        // a alert message will displayed to user and the page will be reloaded again

import { useState, useEffect, useContext } from "react";
import React from "react";
import Axios from "axios";
import { Button } from "@mui/material";
import { UserContext } from './UserContext';
import {
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    TextField,
    Chip,
    Container,
    // Button,
    ListItem,
    Stack
} from "@mui/material";
import { CoPresent, SettingsAccessibility } from "@mui/icons-material";

const menu=["NaMenu","ShawMenu","UcMenu"]

function AddDishes() {

    const {user, setUser} = useContext(UserContext);
    const [name, setName] = useState("");
    const [variant, setVariant] = useState('');
    const [variantList, setVariantList]=useState([]);
    const [price , setPrice] = useState(0);
    const [pricesList, setPricesList] = useState([]);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [tag, setTag]=useState("");
    const [tagError, setTagError]=useState(false)
    const [tagList, setTagList]=useState([]);
    const [chipData, setChipData]=useState([]);
    const [color, setColor]=useState("default")
    const [variantError, setVariantError]=useState(false)
    const [nameError, setNameError]=useState(false);
    const [hide] = useState(false);
    window.whichcan = -1;

    const AddDishes = () => {
        if (localStorage.getItem('user') == "0") {
            window.whichcan = 0;
            // alert(window.whichcan);
        } 
        if (localStorage.getItem('user') == "1") {
            window.whichcan = 1;
            // alert(window.whichcan);
        } 
        if (localStorage.getItem('user') == "2") {
            window.whichcan = 2;
            // alert(window.whichcan);
        } 
        if(localStorage.getItem('type')=="guest"){
            window.location.assign("/login");
        }else if(localStorage.getItem('type')=="restaurant"){
            if(name==""||variantList.length==0){
                if(name=="") setNameError(true);
                if(variantList.length==0) setVariantError(true);
            }else{
                Axios.post(`/dbNewMenu/AddMenu/${menu[window.whichcan]}`, {
                    name: name, 
                    variants: variantList,
                    category: category,
                    image: image,
                    tag: tagList,
                    hide: hide
                });
                alert(menu[window.whichcan] + " added! Please refresh" ); 
                window.location.reload();
            }
        }
    };
    const handleDelete = (chipToDelete) => () => {
        let label=chipToDelete.label;
        if(chipToDelete.type=="variant"){
            label=label.substring(0,label.indexOf("$")-1);
            //console.log(label);
            setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
            for(let i=0;i<variantList.length;i++){
                if(variantList[i].name.localeCompare(label)==0){
                    let newVariantList=variantList;
                    newVariantList.splice(i,1);
                    setVariantList(newVariantList);
                    break;
                }
            }
        }else{
            setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
            for(let i=0;i<tagList.length;i++){
                if(tagList[i].label.localeCompare(label)==0){
                    let newTagList=tagList;
                    newTagList.splice(i,1);
                
                    setTagList(newTagList);
                }

            }
        }
    };
    const handleChangeTag=(event)=>{
        setTag(event.target.value);
        setTagError(false);
    }

    const saveTag=()=>{
        if(tag!=""){
            let max;
            let newChipData=chipData;
            //console.log(newChipData)
            if (newChipData.length==0){
                max=0;
            }else{
                max=chipData[chipData.length-1].key+1;
            }
            
            let chipItem={ key: max, label: tag, color: color,type: "tag"}
            newChipData.push(chipItem)
            setChipData(newChipData);
            
            chipItem={label:tag, color:color}
            let newTagList=tagList;
            newTagList.push(chipItem);
            setTagList(newTagList);


            setTag("")
        }else{
            setTagError(true);
        }
    }
    const handleChangeColor=(event)=>{
        setColor(event.target.value)
    }
    
    const saveVariant=()=>{
        if(variant!="" && price!=""){
            let newVariantList=variantList;
            let variantItem={name: variant,price: price}
            newVariantList.push(variantItem)

            let max;
            let newChipData=chipData;
            //console.log(newChipData)
            if (newChipData.length==0){
                max=0;
            }else{
                max=chipData[chipData.length-1].key+1;
            }
            
            let chipItem={ key: max, label: variant+" $"+price,type: "variant"}
            newChipData.push(chipItem)
            setChipData(newChipData);
        

            setPrice("");
            setVariant("");
        }else{
            setVariantError(true);
        }
        
    }

   

    return (
        <Container maxWidth="md">
            <div>
            {/* <AppBar>
                <toolbar>
                <h1>SIGNIN FORM </h1>
                </toolbar>
            </AppBar> */}
                <h1>Add Dish</h1>

                
                <form>
                

                    
                    <TextField
                        style={{  margin: "5px" }}
                        type="text"
                        label="name"
                        variant="outlined"
                        onChange={(event)=> {
                            setName(event.target.value)
                            setNameError(false);
                        }}
                        fullWidth
                        error={nameError}
                    />
                    <br />
                        
                    
                        <TextField
                            style={{ margin: "5px" }}
                            type="text"
                            value={variant}
                            label="variant"
                            variant="outlined"
                            onChange={(event)=> {
                                setVariant(event.target.value)
                                setVariantError(false)
                            }}
                            fullWidth
                            error={variantError}
                        />
                
                
                        <br />

                        <TextField
                            style={{margin: "5px" }}
                            value={price}
                            type="number"
                            label="Prices"
                            variant="outlined"
                            onChange={(event)=> {
                                setPrice(event.target.value)
                                setVariantError(false)
                            }}
                            fullWidth
                            error={variantError}
                        />
                
                        
             
                    <br />  

                    {/* <p style={{fontsize: "24px"}}>What you have added in pairs</p> */}
                   
                    <br />
                    <Button variant="contained" onClick={saveVariant}>Please Add Variant and Price In pairs</Button> 
                    <br />
                    <br />
                    <Stack direction="row" spacing={1}>

                        {chipData.map((data) =>{ 
                            
                            return (
    
                                <Chip
                                    label={data.label}
                                    key={data.key}
                                    onDelete={handleDelete(data)}
                                    hidden={data.type=="tag"}
                                />

                    
                            );
                        })}
                    </Stack>
                    <br />
                    <TextField
                        style={{ margin: "5px" }}
                        type="text"
                        label="category"
                        variant="outlined"
                        onChange={(event)=> {
                            setCategory(event.target.value)
                        }}
                        fullWidth
                    />
                    <br />

                    <TextField
                        style={{ margin: "5px" }}
                        type="text"
                        label="image url"
                        variant="outlined"
                        onChange={(event)=> {
                            setImage(event.target.value)
                        }}
                        fullWidth
                    />
                    <br />
                    <TextField
                        style={{ margin: "5px" }}
                        type="text"
                        label="tag"
                        variant="outlined"
                        value={tag}
                        onChange={handleChangeTag}
                        fullWidth
                        error={tagError}
                    />
                    <br />
                    <FormLabel id="demo-controlled-radio-buttons-group">Tag Color</FormLabel>
                    <RadioGroup
                        row
                        value={color}
                        onChange={handleChangeColor}
                        >
                        <FormControlLabel value="default" control={<Radio />} label="default (gray)" />
                        <FormControlLabel value="primary" control={<Radio />} label="light blue" />
                        <FormControlLabel value="secondary" control={<Radio />} label="purple" />
                        <FormControlLabel value="error" control={<Radio />} label="red" />
                        <FormControlLabel value="info" control={<Radio />} label="blue" />
                        <FormControlLabel value="success" control={<Radio />} label="green" />
                        <FormControlLabel value="warning" control={<Radio />} label="yellow" />
                    </RadioGroup>
                    <Button variant="contained" onClick={saveTag}>Add Tag</Button> 
                    <br />
                    <br />
                    <Stack direction="row" spacing={1}>

                        {chipData.map((data) =>{ 
                            
                            return (
    
                                <Chip
                                    label={data.label}
                                    key={data.key}
                                    color={data.color}
                                    hidden={data.type=="variant"}
                                    onDelete={handleDelete(data)}
                                />

                    
                            );
                        })}
                    </Stack>
                    <br />

                    <Button 
                        variant="contained"
                        onClick={AddDishes}>Add Dish</Button>

                </form>
            </div>
        </Container>
    );
}


export default AddDishes;
