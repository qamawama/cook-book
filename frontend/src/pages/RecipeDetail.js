import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRecipeById} from "../services/api";
import './RecipeDetail.css';

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

                            >
                                Edit
                            </button>
                            <button >
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
                        {recipe.ingredients.split('\n').map((ingredient, index) => (
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
                        {recipe.instructions.split('\n').map((instruction, index) => (
                            instruction.trim() && (
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