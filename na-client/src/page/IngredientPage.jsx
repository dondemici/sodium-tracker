import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import axios from "axios";
import CreateIngredientPage from "./CreateIngredientPage";

const API_URL = "http://localhost:8080/api/";

function IngredientPage() {
    const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();
    const [ingredients, setIngredients] = useState([]);

    // Redirect users to login if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated, loginWithRedirect]);

    // Fetch ingredients with JWT token
    const getIngredients = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log("Token:", token);  // Log the token
            const response = await axios.get(API_URL + "ingredients", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIngredients(response.data);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            getIngredients();
        }
    }, [isAuthenticated]);

    // Handle delete with JWT token
    const handleDelete = async (id) => {
        try {
            const token = await getAccessTokenSilently();
            await axios.delete(`${API_URL}ingredients/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIngredients((prevIngredients) => prevIngredients.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting ingredient:", error);
        }
    };

    // Calculate total sodium content
    const totalSodiumContent = ingredients.reduce(
        (total, ingredient) => total + parseFloat(ingredient.naContent || 0),
        0
    );

    return isAuthenticated ? (
        <>
            <h1>Ingredient Page</h1>

            {/* Create Ingredient Form */}
            <CreateIngredientPage setIngredients={setIngredients} />

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
                        <th>Actions</th>
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
                                <button onClick={() => handleDelete(ingredient.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    ) : null; // Don't render anything if the user is not authenticated
}

export default IngredientPage;
