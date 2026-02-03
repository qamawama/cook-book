import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRecipeById, updateRecipe} from "../../services/api";

function EditRecipe() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        ingredients: '',
        instructions: '',
    });

    const [error, setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [fetchLoading,setFetchLoading] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await getRecipeById(id);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                alert('Recipe not found');
                navigate('/my-recipes');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await updateRecipe(id, formData);
            alert('Recipe updated successfully!');
            navigate(`/recipes/${id}`);
        } catch (error) {
            setError(error.response?.data || 'Failed to update recipe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (fetchLoading) {
        return <div className="loading">Loading recipe...</div>;
    }

    return (
        <div className="create-recipe-container">
            <div className="create-recipe-card">
                <h2>Edit Recipe</h2>
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
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category || ''} onChange={handleChange}>
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
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate(`/recipes/${id}`)} className="btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Updating...' : 'Update Recipe'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditRecipe;