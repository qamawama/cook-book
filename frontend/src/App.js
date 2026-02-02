import './App.css';
import Register from "./pages/Register";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import MyRecipes from "./pages/MyRecipes";

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
          </Routes>
        </div>
  );
}

export default App;
