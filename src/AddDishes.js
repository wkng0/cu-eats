import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";


export default function AddDishes() {

    const [name, setName] = useState('');
    const [variant, SetListOfvariant] = useState('');
    const [Regularprices, setRegularprices] = useState(0);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    // const [tempvariant, setTempvariant] = useState([]);
    // const [tempprices, setTempPrices] = useState([]);


    const AddDishes = () => {
        Axios.post('http://localhost:7000/dbNewMenu/AddMenu/NaMenu', {
          name: name, 
          varients: variant,
          prices: Regularprices,
          category: category,
          image: image,
        })
    };


    // function VariantList(props) {
    //     const [checked, setChecked] = useState([]);

    //     useEffect(() => {

    //     })

    //     const handleToggle = (value) => () => {
    //         const currentIndex = checked.indexOf(value);
    //         const newChecked = [...checked];

    //         if (currentIndex === -1) {
    //             newChecked.push(value);
    //         } else {
    //             newChecked.splice(currentIndex, 1); 
    //         }
        
    //     setChecked(newChecked); 
    // }};

    return (
        <div>
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

                    {/* <input 
                        className="form-control"
                        type="text" 
                        placeholder="Variant"
                        value={variant}
                        onChange={(event)=> {
                            let data = tempvariant;
                            data.push(event.target.value);
                            setTempvariant(data);
                            SetListOfvariant(event.target.value);
                        }}
                    />

                    <input 
                        className="form-control"
                        type="number" 
                        placeholder="Regular Prices"
                        value={Regularprices}
                        onChange={(event)=> {
                            let data = tempprices;
                            data.push(event.target.value);
                            setTempPrices(data);
                            setRegularprices(event.target.value);
                        }}

                    /> */}

                    <input 
                        className="form-control"
                        type="text" 
                        placeholder="Variant"
                        value={variant}
                        onChange={(event)=> {
                            SetListOfvariant(event.target.value)
                        }}
                    />

                    <input 
                        className="form-control"
                        type="number" 
                        placeholder="Regular Prices"
                        value={Regularprices}
                        onChange={(event)=> {
                            setRegularprices(event.target.value)
                        }}

                    /> 

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
