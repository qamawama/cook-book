import {Link} from "react-router-dom";
import './RecipeCard.css';

function RecipeCard({recipe}) {
    return (
        <div className="recipe-card">
            <div className="recipe-card-header">
                <h3>{recipe.title}</h3>
                {recipe.category && <span className="recipe-category">{recipe.category}</span>}
            </div>

            <p className="recipe-description">{recipe.description}</p>

            <Link to={`/recipes/${recipe.id}`} className="btn-view">
                View Recipe
            </Link>
        </div>
    );
}
export default RecipeCard;