import { useState, useEffect } from "react";
import React from "react";

export default function AddDishes() {

    const [dishesID, setDishesID] = useState('');
    const [name, setName] = useState('');
    const [Regularprices, setRegularprices] = useState([]);
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');


    // function formHandler(event) {
    //     event.preventDefault();

    //     const dish = { 
    //         dishesID,
    //         name,
    //         varients
    //         Regularprices,
    //         category,
    //         image,
    //         description,
    //     }

    //     console.log(dish);
    // }

    return (
        <div>
            <div>
                <h1>Add Dish</h1>

                
                {/* <form onSubmit={formHandler}> */}
                <form>

                    <input 
                        className="form-control"
                        type="text" 
                        placeholder="dishesID"
                        value={dishesID}
                        onChange={(event)=> {
                            setDishesID(event.target.value)
                        }}
                    />

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

                    <input 
                        className="form-control"
                        type="text" 
                        placeholder="description"
                        value={description}
                        onChange={(event)=> {
                            setDescription(event.target.value)
                        }}
                    />

                    <button 
                        className="btn mt-3"
                        type='submit'

                    >Add Dish</button>

                </form>
            </div>
        </div>
    );
}
