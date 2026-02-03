import {Link, useNavigate} from "react-router-dom";
import '../styles/Navbar.css'

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    🍳 CookBook
                </Link>

                <ul className="navbar-menu">
                    <li><Link to="/">Home</Link></li>

                    {token ? (
                        <>
                            <li><Link to="/my-recipes">My Recipes</Link></li>
                            <li><Link to="/create-recipe">Create Recipe</Link></li>
                            <li className="navbar-user">
                                <span>Hello, {username}!</span>
                                <button onClick={handleLogout} className="btn-logout">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;