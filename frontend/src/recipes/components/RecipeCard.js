import {Link, useNavigate} from "react-router-dom";
import '../styles/RecipeCard.css';

function RecipeCard({recipe, onDelete, showActions = false}) {
    const navigate = useNavigate();

    return (
        <div className="recipe-card">
            <div className="recipe-card-header">
                <h3>{recipe.title}</h3>
                {recipe.category && <span className="recipe-category">{recipe.category}</span>}
            </div>

            <p className="recipe-description">{recipe.description}</p>

            <div className="recipe-card-actions">
                <Link to={`/recipes/${recipe.id}`} className="btn-view">
                    View Recipe
                </Link>
                {showActions && (
                    <>
                        <button
                            onClick={() => navigate(`/edit-recipe/${recipe.id}`)}
                            className="btn-edit"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(recipe.id)}
                            className="btn-delete"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
export default RecipeCard;