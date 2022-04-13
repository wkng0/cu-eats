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

function AddDishes(props) {

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
        } 
        if (localStorage.getItem('user') == "1") {
            window.whichcan = 1;
        } 
        if (localStorage.getItem('user') == "2") {
            window.whichcan = 2;
        } 
        if(localStorage.getItem('type')=="guest"){
            window.location.assign("/login");
        }else if(localStorage.getItem('type')=="restaurant"){
            if(name==""||variantList.length==0){
                if(name=="") setNameError(true);
                if(variantList.length==0) setVariantError(true);
            }else{
                Axios.post(`http://localhost:7000/dbNewMenu/AddMenu/${menu[window.whichcan]}`, {
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
