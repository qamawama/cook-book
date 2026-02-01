
import './App.css';
import Register from "./pages/Register";
import {Route, Router, Routes} from "react-router-dom";

function App() {
  return (
        <div className="App">
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
  );
}

export default App;
