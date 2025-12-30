import axios from "axios";
import { use, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Track() {
  const navigate= useNavigate();
 const[workout, setWorkout] = useState({
  steps:'',
  mood:'Neutral',
  meals:'',
 });
  const calories =  (workout.steps * 0.05).toFixed(0) ;
  const distance = (workout.steps * 0.0008).toFixed(2);
const UID=localStorage.getItem("userId")
  
const handleChange = (e) => {
    setWorkout((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    const data={
      uid:UID,
      steps:workout.steps,
      mood:workout.mood,
      meals:workout.meals,
      calories:calories,
      distance:distance
    }
try{
 console.log("posted")
 console.log(workout)
 await axios.post('http://localhost:5000/workoutlogs',data)
 navigate('/home')
}
catch(err){
console.error(err)
}
  }
  return (
    <div className="page">
      <h1>Daily Tracking👀</h1>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <label>Steps🔥</label>
          <input
            type="number"
            name="steps"
            value={workout.steps}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mood💸
          </label>
          <select
            value={workout.mood}
            onChange={handleChange}
            name="mood"
          >
            <option>Happy</option>
            <option>Tired</option>
            <option>Neutral</option>
            <option>Sad</option>
            <option>Energetic</option>
          </select>
        </div>

        <div style={{ gridColumn: "1 / span 2" }}>
          <label>Meals🍕</label>
          <textarea
          name="meals"
            rows="3"
            value={workout.meals}
            onChange={handleChange}
            placeholder="What did you eat today?"   
          />
        </div>

        {/* submit button */}
        <button
          type="submit"
          className="primary-btn"
        >
           Save & Go Home 
        </button>
      </form>



  {workout.steps && (
  <div className="card" style={{ marginTop: "20px", padding: "20px" }}>
    <h2>Today's Summary</h2>
    
    {[
      { label: "Steps", value: workout.steps },
      { label: "Mood", value: workout.mood },
      {label:"Meals",value:workout.meals},
      { label: "Calories", value: calories + " kcal" },
      { label: "Distance", value: distance + " km" },
    ].map((item, index) => (
      <p key={index}>

        <strong>{item.label}:</strong> {item.value}
      </p>
    ))}

  </div>
  )}

    </div>
  );
}
export default Track;
