import './styles/App.css';
import Register from "../users/pages/Register";
import {Route, Routes} from "react-router-dom";
import Login from "../users/pages/Login";
import Home from "../home/pages/Home";
import Navbar from "../ui/components/Navbar";
import CreateRecipe from "../recipes/pages/CreateRecipe";
import MyRecipes from "../recipes/pages/MyRecipes";
import RecipeDetail from "../recipes/pages/RecipeDetail";
import EditRecipe from "../recipes/pages/EditRecipe";

function App() {
  return (
        <div className="App">
            <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create-recipe" element={<CreateRecipe />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          </Routes>
        </div>
  );
}

export default App;
