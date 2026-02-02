import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import {getMyRecipes} from "../services/api";
import './MyRecipes.css';

function MyRecipes() {
    const [recipes, setRecipes] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                setLoading(true);
                const response = await getMyRecipes();
                setRecipes(response.data || []);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyRecipes();
    }, []);


    if (loading) {
        return <div className="loading">Loading your recipes...</div>;
    }

    return (
        <div className="my-recipes-container">
            <div className="my-recipes-header">
                <h1>My Recipes</h1>
                <button onClick={() => navigate('/create-recipe')} className="btn-create">
                    + Create New Recipe
                </button>
            </div>

            {recipes.length === 0 ? (
                <div className="no-recipes">
                    <p>You haven't created any recipes yet.</p>
                    <button onClick={() => navigate('/create-recipe')} className="btn-primary">
                        Create Your First Recipe
                    </button>
                </div>
            ) : (
                <div className="recipes-grid">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            showActions={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyRecipes;