import { Link } from "react-router-dom"
import "../css/Navbar.css"
import { useTheme } from "../contexts/ThemeContext";
function NavBar(){
    const {theme,toggleTheme}=useTheme()
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
             <Link to="/Favorites" className="nav-link">Favorites</Link>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "dark" ? "☀" : "🌙"}
        </button>
        </div>
    </nav>
}
export default NavBar;