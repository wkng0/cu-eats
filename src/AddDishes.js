import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";
import { Button } from "@mui/material";


export default function AddDishes() {

    const [name, setName] = useState('');
    const [variant, setVariant] = useState('');
    const [variantList, setVariantList]=useState([]);
    const [price , setPrice] = useState(0);
    const [pricesList, setPricesList] = useState([]);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const AddDishes = () => {
        Axios.post('http://localhost:7000/dbNewMenu/AddMenu/NaMenu', {
          name: name, 
          varients: variantList,
          prices: pricesList,
          category: category,
          image: image,
        })
    };

    const saveVariant=()=>{
        let newVariantList=variantList;
        newVariantList.push(variant);
        setVariantList(newVariantList);
        let newVariant=variant;
        let node=document.createTextNode(newVariant);
        let para= document.createElement("p");
        para.appendChild(node);
        document.getElementById("variantList").appendChild(para);
        setVariant("");

        
        let newPricesList=pricesList;
        newPricesList.push(price);
        setPricesList(newPricesList);
        let newPrices=price;
        let node2=document.createTextNode(newPrices);
        let para2= document.createElement("p");
        para2.appendChild(node2);
        document.getElementById("pricesList").appendChild(para2);
        setPrice("");
    
    }

   

    return (
        <div className="container">
            <div>
                <h1>Add Dish</h1>

                
                <form>

                    <input 
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
                    />
                    <Button variant="contained" onClick={saveVariant}>+</Button>

                    <div id="variantList">

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
                    {/* <Button variant="contained" onClick={savePrices}>+</Button> */}
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
                        onClick={AddDishes}>Add Dish</button>

                </form>
            </div>
        </div>
    );
}
