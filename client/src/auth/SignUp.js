import axios from "axios";
import { useState } from "react"
import { useNavigate ,Link} from "react-router-dom"
import { useEffect } from "react"
import SignIn from "./SignIn";
import '../auth/Auth.css'


const SignUp=()=>{
const [user,setUser]=useState({
    username:"",
    email:"",
    password:"",
})
const [error, setError]=useState("")
 const navigate=useNavigate();
const handleChange=(e)=>{
    setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
}
const handleSignup=async(e)=>{
    e.preventDefault();
    setError("")
    const formdata=new FormData();

    formdata.append('username', user.username)
    formdata.append('email',user.email)
    formdata.append('password',user.password)
    try{
      setError("")
        console.log("submitted")
        const response=await axios.post("http://localhost:5000/signup",user)
        console.log(response.data) 
        if(response.data.id)  {
            localStorage.setItem("userId",response.data.id)
            localStorage.setItem("username",response.data.Username)
        }
        navigate("/home")
    }
    catch(err){
        console.log(err)
        setError(err.response?.data?.message || "Something went wrong...try again later");        
    }
}
return(
  <div className="main_sign_up">
  <div className="signup_card">
    <h2>Create Account</h2>

    <p className="signin_text">
      Already a member? <Link to="/">Sign In</Link>
    </p>
    <form className="sign_up_form" onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Username"
        onChange={handleChange}
        name="username"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
    onChange={handleChange}
        name="password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  </div>
</div>

)
}
export default SignUp

