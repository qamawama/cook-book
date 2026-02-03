import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteRecipe, getRecipeById} from "../../services/api";
import '../styles/RecipeDetail.css';

function RecipeDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipeById(id);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                alert('Recipe not found');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await deleteRecipe(id);
                alert('Recipe deleted successfully!');
                navigate('/my-recipes');
            } catch (error) {
                console.error('Error deleting recipe:', error);
                alert('Failed to delete recipe');
            }
        }
    };

    if (loading) {
        return <div className="loading">Loading recipe...</div>;
    }

    if (!recipe) {
        return <div className="loading">Recipe not found</div>;
    }

    const isOwner = recipe.userId === parseInt(localStorage.getItem('userId'));

    return (
        <div className="recipe-detail-container">
            <div className="recipe-detail-card">
                <div className="recipe-header">
                    <div>
                        <h1>{recipe.title}</h1>
                        <p className="recipe-meta">
                            {recipe.category && <span className="badge">{recipe.category}</span>}
                        </p>
                    </div>
                    {isOwner && (
                        <div className="recipe-actions">
                            <button
                                onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                                className="btn-edit">
                                Edit
                            </button>
                            <button onClick={handleDelete} className="btn-delete">
                                Delete
                            </button>
                        </div>
                    )}
                </div>


                <div className="recipe-description">
                    <h3>Description</h3>
                    <p>{recipe.description}</p>
                </div>

                <div className="recipe-section">
                    <h3>Ingredients</h3>
                    <div className="ingredients-list">
                        {recipe.ingredients.split('\n')
                            .filter(ingredient => ingredient.trim() !== '')
                            .map((ingredient, index) => (
                            <div key={index} className="ingredient-item">
                                <span className="bullet">•</span>
                                {ingredient}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="recipe-section">
                    <h3>Instructions</h3>
                    <div className="instructions-list">
                        {recipe.instructions.split('\n')
                            .filter(instruction => instruction.trim() !== '')
                            .map((instruction, index) => ((
                                <div key={index} className="instruction-step">
                                    <span className="step-number">{index + 1}</span>
                                    <p>{instruction}</p>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <div className="recipe-footer">
                    <button onClick={() => navigate(-1)} className="btn-back">
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetail;