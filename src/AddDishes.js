import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";
import { Button } from "@mui/material";
import {

    TextField,
    Chip,
    // Button,
    Paper,
    ListItem
} from "@mui/material";


export default function AddDishes() {

    const [name, setName] = useState('');
    const [variant, setVariant] = useState('');
    const [variantList, setVariantList]=useState([]);
    const [price , setPrice] = useState(0);
    const [pricesList, setPricesList] = useState([]);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [chipData, setChipData]=useState([]);

    const AddDishes = () => {
        Axios.post('http://localhost:7000/dbNewMenu/AddMenu/NaMenu', {
          name: name, 
          varients: variantList,
          prices: pricesList,
          category: category,
          image: image,
        })
    };
    const handleDelete = (chipToDelete) => () => {
        let label=chipToDelete.label;
        label=label.substring(0,label.indexOf("$")-1);
        console.log(label);
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
        for(let i=0;i<variantList.length;i++){
            if(variantList[i].localeCompare(label)==0){
                let newVariantList=variantList;
                newVariantList.splice(i,1);
                let newPricesList=pricesList;
                newPricesList.splice(i,1);

                setVariantList(newVariantList);
                setPricesList(newPricesList);
            }

        }
    };

    const saveVariant=()=>{
        let newVariantList=variantList;
        newVariantList.push(variant);
        setVariantList(newVariantList);
        
                
        let newPricesList=pricesList;
        newPricesList.push(price);
        setPricesList(newPricesList);

        let max;
        let newChipData=chipData;
        console.log(newChipData)
        if (newChipData.length==0){
            max=0;
        }else{
            max=chipData[chipData.length-1].key+1;
        }
        
        let chipItem={ key: max, label: variant+" $"+price}
        newChipData.push(chipItem)
        setChipData(newChipData);
      

        setPrice("");
        setVariant("");
    }

   

    return (
        <div className="container">
            <div>
            {/* <AppBar>
                <toolbar>
                <h1>SIGNIN FORM </h1>
                </toolbar>
            </AppBar> */}
                <h1>Add Dish</h1>

                
                <form>

                    <TextField
                        style={{ width: "1000px", margin: "5px" }}
                        type="text"
                        label="name"
                        variant="outlined"
                        onChange={(event)=> {
                            setName(event.target.value)
                        }}
                    />
                    <br />

                    <TextField
                        style={{ width: "1000px", margin: "5px" }}
                        type="text"
                        value={variant}
                        label="variant"
                        variant="outlined"
                        onChange={(event)=> {
                            setVariant(event.target.value)
                        }}
                    />
                   
                    <br />

                     <TextField
                        style={{ width: "1000px", margin: "5px" }}
                        value={price}
                        type="number"
                        label="Prices"
                        variant="outlined"
                        onChange={(event)=> {
                            setPrice(event.target.value)
                        }}
                    />
                    <br />  

                    {/* <p style={{fontsize: "24px"}}>What you have added in pairs</p> */}
                   
                    <br />
                    <Button variant="contained" onClick={saveVariant}>Please Add Variant and Price In pairs</Button> 
                    <br />
                    <br />
                        {chipData.map((data) =>{ 
                        
                            return (
                                <ListItem key={data.key}>
                                    <Chip
                                        label={data.label}
                                        onDelete={handleDelete(data)}
                                    />

                                </ListItem>
                            );
                        })}
                    <TextField
                        style={{ width: "1000px", margin: "5px" }}
                        type="text"
                        label="category"
                        variant="outlined"
                        onChange={(event)=> {
                            setCategory(event.target.value)
                        }}
                    />
                    <br />

                    <TextField
                        style={{ width: "1000px", margin: "5px" }}
                        type="text"
                        label="image url"
                        variant="outlined"
                        onChange={(event)=> {
                            setImage(event.target.value)
                        }}
                    />
                    <br />

                    <button 
                        className="btn mt-3"
                        onClick={AddDishes}>Add Dish</button>


                    {/* <input 
                        className="form-control"
                        type="text" 
                        placeholder="name"
                        value={name}
                        onChange={(event)=> {
                            setName(event.target.value)
                        }}
                    />
                    
                    <input 
                        className="form-control"
                        type="text" 
                        placeholder="Variant"
                        value={variant}
                        onChange={(event)=> {
                            setVariant(event.target.value)
                        }}
                    /> */}
                    {/* <Button variant="contained" onClick={saveVariant}>+</Button> */}
                     {/* <Button variant="contained" onClick={savePrices}>+</Button> */}

                    {/* <div id="variantList">

                    </div>

                    <input 
                        className="form-control"
                        type="number" 
                        placeholder="Prices"
                        value={price}
                        onChange={(event)=> {
                            setPrice(event.target.value)
                        }}
                    /> 
                   
                    <div id="pricesList">

                    </div>

                    <input 
                        className="form-control"
                        type="text" 
                        placeholder="category"
                        value={category}
                        onChange={(event)=> {
                            setCategory(event.target.value)
                        }}
                    />

                    <input 
                        className="form-control"
                        type="text" 
                        placeholder="image url"
                        value={image}
                        onChange={(event)=> {
                            setImage(event.target.value)
                        }}
                    />


                    <button 
                        className="btn mt-3"
                        onClick={AddDishes}>Add Dish</button> */}

                </form>
            </div>
        </div>
    );
}
