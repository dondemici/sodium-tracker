import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/"

function CreateIngredientPage({setIngredients}){
    const[iName, setName] = useState(null);
    const[iQuantity, setQuantity] = useState(null);
    const[iUnit_Gauge, setUnit_Gauge] = useState(null);
    const[inaContent, setNaContent] = useState(null);

    const CreateIngredient = () => {
        const course = {
            name: iName,
            quantity: iQuantity,
            unit_gauge: iUnit_Gauge,
            nacontent: inaContent
        }
        axios.post(API_URL + "ingredient", ingredient)
            .then(response => {
                console.log("Ingredient created:", response.data);
                setIngredients((ingredients) => [...ingredients, response.data]);
            })
            .catch(error => {
                console.error("Error creating ingredient:",error);
            })
    }

    const oniNameChange = (event) => {setName(event.target.value);}
    const oniQuantity = (event) => {setQuantity(event.target.value);}
    const oniUnit_Gauge = (event) => {setUnit_Gauge(event.target.value);}
    const oninaContent = (event) => {setNaContent(event.target.value);}

    return(
        <div>
            <h1>Create Ingredient</h1>
            <input type = "text" placeholder = "Ingredient Name" onChange={oniNameChange}/>
            <input type = "text" placeholder = "Quantity" onChange={oniQuantity}/>
            <input type = "text" placeholder = "Unit Gauge" onChange={oniUnit_Gauge}/>
            <input type = "text" placeholder = "Sodium Content" onChange={oninaContent}/>
            <button onClick={CreateIngredient}>Submit</button>
        </div>
    );
}

export default CreateIngredientPage;