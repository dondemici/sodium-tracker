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
                        {ingredient.id},
                        {ingredient.name},
                        {ingredient.quantity},
                        {ingredient.unitGauge},
                        {ingredient.naContent}
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
            if (error.response) {
                // The request was made, but the server responded with an error
                console.error("Error fetching ingredients:", error.response.data);
                console.error("Status code:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("No response received:", error.request);
            } else {
                // Something happened in setting up the request
                console.error("Error in setting up the request:", error.message);
            }
        }
    }

    useEffect(() => {
        getIngredients();
    },[])

    // Calculate the total sodium content
    const totalSodiumContent = ingredients.reduce(
        (total, ingredient) => total + parseFloat(ingredient.naContent || 0),
        0
    );

    // Handle transaction deletion
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/ingredients/${id}`);
            setIngredients((prevIngredients) => prevIngredients.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting ingredient:", error);
        }
    };

    // Handle transaction editing (open modal)
    const handleEdit = (ingredient) => {
        setEditingIngredient(ingredient);
    };


    //<div>{renderIngredients(ingredients)}</div>
    return (
        <>
            <h1>Ingredient Page</h1>

            {/* Create Ingredient Form */}
            <CreateIngredientPage setIngredients={setIngredients}/>

            {/* Total Sodium Content */}
            <div className="sodium-total" style={{ marginTop: "20px" }}>
                <h3>Total Sodium Content: {totalSodiumContent.toFixed(2)} mg</h3>
            </div>
            
            
            <h1>Ingredient List</h1>
            <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit Gauge</th>
                        <th>Sodium Content</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.id}</td>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.quantity}</td>
                        <td>{ingredient.unitGauge}</td>
                        <td>{ingredient.naContent}</td>
                        <td>
                            <button onClick={() => handleEdit(ingredient)}>Edit</button>
                            <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

   
        </>
    )
}

export default IngredientPage;