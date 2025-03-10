import { useEffect, useState } from "react";
import axios from "axios";
import "./CreateIngredient.css";


const API_URL = "http://localhost:8080/api/"

function CreateIngredientPage({setIngredients}){
    const[name, setName] = useState(null);
    const[quantity, setQuantity] = useState(null);
    const[unitGauge, setUnitGauge] = useState(null);
    const[naContent, setNaContent] = useState(null);

const CreateIngredient = async (e) => {
    e.preventDefault();

    const ingredient = {
        name: name,
        quantity: quantity,
        unitGauge: unitGauge,
        naContent: naContent
    };

    try {
        await axios.post(API_URL + "ingredients", ingredient);
        console.log("Ingredient created successfully");

        // Fetch the latest ingredients
        const updatedResponse = await axios.get(API_URL + "ingredients");
        setIngredients(updatedResponse.data);  // Update table with the latest list

        // Clear input fields
        setName("");
        setQuantity("");
        setUnitGauge("");
        setNaContent("");

        alert("Creation successful!");
    } catch (error) {
        console.error("Error creating ingredient:", error);
        alert("Creation not successful");
    }
};

    //const oniNameChange = (event) => {setName(event.target.value);}
    //const oniQuantity = (event) => {setQuantity(event.target.value);}
    //const oniUnitGauge = (event) => {setUnitGauge(event.target.value);}
    //const oninaContent = (event) => {setNaContent(event.target.value);}

    return(
                //<div>
                //    <h1>Create Ingredient</h1>
                //    <input type = "text" placeholder = "Ingredient Name" onChange={oniNameChange}/>
                //    <input type = "text" placeholder = "Quantity" onChange={oniQuantity}/>
                //    <input type = "text" placeholder = "Unit Gauge" onChange={oniUnitGauge}/>
                //    <input type = "text" placeholder = "Sodium Content" onChange={oninaContent}/>
                //    <button onClick={CreateIngredient}>Submit</button>
                //</div>

        <div>
            <h2>Create Ingredient</h2>
            <form onSubmit={CreateIngredient} className="ingredient-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        step="0.01" // Allow decimal values
                        min="0" // Prevent negative numbers
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Unit Gauge:</label>
                    <input
                        type="text"
                        value={unitGauge}
                        onChange={(e) => setUnitGauge(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                        <label>Sodium Content:</label>
                        <input
                            type="number"
                            value={naContent}
                            onChange={(e) => setNaContent(e.target.value)}
                            step="0.01" // Allow decimal values
                            min="0" // Prevent negative numbers
                            required
                        />
                </div>
                <button type="submit" className="submit-button">Create</button>
            </form>


        </div>
    );
}

export default CreateIngredientPage;

