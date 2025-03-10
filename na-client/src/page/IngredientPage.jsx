import { useEffect, useState } from 'react';
import axios from 'axios'
import CreateIngredientPage from './CreateIngredientPage';

const API_URL = "http://localhost:8080/api/"

function IngredientPage(){
    const[ingredients, setIngredients] = useState([]);

    const renderIngredients = (ingredients) => {
        return (
            <ul>
                {ingredients.map((ingredient)=>(
                    <li key={ingredient.id}>
                        {ingredient.id},{ingredient.name},{ingredient.quantity},{ingredient.unit_gauge},{ingredient.nacontent}
                    </li>
                ))}
            </ul>
        )
    }

    const getIngredients = async() =>{
        try{
            const response = await axios.get(API_URL + "ingredients");
            setIngredients(response.data);
        }catch(error){
            console.error("Error fetching ingredients:", error);
        }
    }

    useEffect(() => {
        getIngredients();
    },[])

    return (
        <>
            <h1>Ingredients Dashboard</h1>
            <div>{renderIngredients(ingredients)}</div>
            <CreateIngredientPage setIngredients={setIngredients}/>
        </>
    )
}

export default IngredientPage;