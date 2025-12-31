import { Link, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import photo from '../assets/p1.jpg'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState,useEffect } from "react";
import axios from "axios";

 function Home() {
  const handleDelete = async (id) => {
  if(window.confirm("Are you sure you want to delete this log?")){
    try{
      await axios.delete(`${process.env.REACT_APP_API_URL}/records/${id}`)
      setLogs(logs.filter((log)=> log.id!==id))

    }catch(err){
      console.error("Error deleting log:", err);
      alert("Failed to delete the log. Please try again.");
    }

  }
  };
  const[logs,setLogs]=useState([])
  const navigate=useNavigate()
  const[username,setUsername]=useState("")
  const uid=localStorage.getItem("userId")
  console.log("Fetching logs for UID:", uid);

  useEffect(()=>{
    const saveduname=localStorage.getItem("username")
    if(!saveduname) return;
    if(saveduname){
      setUsername(saveduname)
    }
    const getLogs=async()=>{
      try{
        const res=await axios.get(`${process.env.REACT_APP_API_URL}/records/${uid}`)
        setLogs(res.data)
        
      }
      catch(err){
        console.error("Error fetching logs:", err);
      }
    }
    getLogs()
  },[])

  
  const message="Welcome to your health tracking dashboard!";

  return (
    <div className="page">

     <div className="welcome-container">
  <div className="welcome-text">
    <span className="welcome-badge">Dashboard Active</span>
    <h1>
      Welcome back, <span className="username-highlight">{username || 'King'}</span>! 💪
    </h1>
    <p className="welcome-subtitle">Here is your progress at a glance.</p>
  </div>
  <div className="welcome-stats-mini">

  </div>
</div>
      <section className="maincard">
        <div className="line">
        <h1>Track Your Health, Every Day.</h1> <p className="troph"></p>
        </div>
        <p>Log your daily steps, meals, mood to ensure that you're on the right track.</p>
        <Link to="/track">
          <button className="primary-btn">Start Tracking🔥</button>
        </Link>
      </section>

    <Carousel></Carousel>

      <section className="section">
        <h2>Recent Progress🏁</h2>
        {logs.length === 0 && <p>No logs yet! Start tracking🏅 
          </p>}
        <div className="card-grid">
         {logs.length > 0 && logs.map((log) => (
          
    <div key={log.id} className="card">

      <h3>📅 {log['Create-Date']? new Date(log['Create-Date']).toLocaleDateString(): "Today"}</h3> 
      <p><strong>Steps:</strong> {log.Steps}</p>
      <p><strong>Mood:</strong> {log.Mood}</p>
      <p><strong>Meals:</strong> {log.Meals}</p>
      <p><strong>Calories:</strong> {log.Calories} kcal</p>
      <p><strong>Distance:</strong> {log.Distance} km</p>

      <button
        className="delete-btn"
        onClick={() => handleDelete(log.id)}
      >
        <div className="delete">Delete</div>
      </button>
    </div>
  ))}
          
        
        </div>
      </section>
      
    </div>
  );
}
export default Home
