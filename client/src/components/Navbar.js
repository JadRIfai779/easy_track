import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  return (
    <div className="navbar">
   <Link to="/home" className="logo">EasyTrack</Link>
  <div className="nav-links">
  <Link to='/home'>Home</Link>
  <Link to="/features">Features</Link>
  <Link to='/about'>About</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/" onClick={handleLogout}>Logout</Link>
 </div>
    </div>
  );
}
