import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Contact from "./pages/Contact";
import Track from "./pages/TrackHealth";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import "./App.css";
 
function AppContent() {
  
  // Load logs from localStorage
  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem("logs");
    return saved ? JSON.parse(saved) : [];
  });
  // Save logs to localStorage whenever logs change
  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);
  const location=useLocation();
  const authLoc=[ '/signup','/'];
  const showNavAndFooter = !authLoc.includes(location.pathname);

  return (
<div>
 {showNavAndFooter && <Navbar></Navbar>}

   
    
      <Routes>
       <Route path="/" element={<SignIn></SignIn>}></Route>
       <Route path="/signup" element={<SignUp></SignUp>}></Route>
     <Route path="/home" element={<Home logs={logs} setLogs={setLogs} />} />
        <Route path="/track" element={<Track setLogs={setLogs} />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      
      </Routes>
      
   
    {showNavAndFooter && <Footer></Footer>}
</div>
    
  );
}


export default function App() {
  return(
    <Router>
<AppContent></AppContent>
    </Router>
  )
};
