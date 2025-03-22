import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import axios from "axios";
import "./CreateIngredient.css";

const API_URL = "http://localhost:8080/api/";

function CreateIngredientPage({ setIngredients }) {
    const { getAccessTokenSilently } = useAuth0(); // Get token from Auth0
    const [name, setName] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [unitGauge, setUnitGauge] = useState(null);
    const [naContent, setNaContent] = useState(null);

    const CreateIngredient = async (e) => {
        e.preventDefault();

        const ingredient = {
            name: name,
            quantity: quantity,
            unitGauge: unitGauge,
            naContent: naContent,
        };

        try {
            const token = await getAccessTokenSilently(); // Get JWT token

            // Send the token with the request headers
            await axios.post(API_URL + "ingredients", ingredient, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token in the Authorization header
                },
            });
            console.log("Ingredient created successfully");

            // Fetch the latest ingredients with the token
            const updatedResponse = await axios.get(API_URL + "ingredients", {
                headers: {
                    Authorization: `Bearer ${token}`, // Send token with the get request
                },
            });
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

    return (
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
