import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar">
   <Link to="/home" className="logo">EasyTrack</Link>
  <div className="nav-links">
  <Link to='/home'>Home</Link>
  <Link to="/features">Features</Link>
  <Link to='/about'>About</Link>
  <Link to="/contact">Contact</Link>
  <Link to="/">Logout</Link>
 </div>
    </div>
  );
}
