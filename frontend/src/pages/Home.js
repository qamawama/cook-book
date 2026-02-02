import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard";
import {Link} from "react-router-dom";
import {getAllRecipes} from "../services/api";
import "./Home.css";

function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await getAllRecipes();
            setRecipes(response.data);
        } catch (error) {
            console.error('Error fetching recipes.', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading recipes...</div>;
    }

    return (
        <div className="home-container">
            <div className="home-header">
                <h1>All Recipes</h1>

            </div>

            {recipes.length === 0 ? (
                <div className="no-recipes">
                    <p>No recipes found. Be the first to create one!</p>
                    <Link to="/create-recipe" className="btn-primary">Create Recipe</Link>
                </div>
            ) : (
                <div className="recipes-grid">
                    {recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;