import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createRecipe} from "../../services/api";
import '../styles/CreateRecipe.css'

function CreateRecipe() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        ingredients: "",
        instructions: "",
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await createRecipe(formData);
            alert(`Recipe created successfully.`);
            navigate("/my-recipes");
        } catch (error) {
            setError(error.response?.data || 'Failed to create recipe. Please try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-recipe-container">
            <div className="create-recipe-card">
                <h2>Create New Recipe</h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Spaghetti Carbonara"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            placeholder="Brief description of your recipe"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Select category</option>
                                <option value="BREAKFAST">Breakfast</option>
                                <option value="LUNCH">Lunch</option>
                                <option value="DINNER">Dinner</option>
                                <option value="DESSERT">Dessert</option>
                                <option value="SNACK">Snack</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Ingredients *</label>
                        <textarea
                            name="ingredients"
                            value={formData.ingredients}
                            onChange={handleChange}
                            required
                            rows="5"
                            placeholder="List ingredients (one per line or separated by commas)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Instructions *</label>
                        <textarea
                            name="instructions"
                            value={formData.instructions}
                            onChange={handleChange}
                            required
                            rows="8"
                            placeholder="Step-by-step cooking instructions"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/')} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Creating...' : 'Create Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateRecipe;