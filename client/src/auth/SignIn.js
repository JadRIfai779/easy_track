import { useState } from "react"
import { useNavigate ,Router,Route,Routes,Link,Links} from "react-router-dom"
import axios from "axios"
import '../auth/Auth.css'

const SignIn=()=>{
  const[user,setUser]=useState({
    email:'',
    password:''
  })

  const[error, setError]=useState("")
  const navigate=useNavigate()

  const handleChange=(e)=>{
 setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

const handleSignin=async(e)=>{
e.preventDefault()
setError("")
const formdata=new FormData
formdata.append('email',user.email)
formdata.append('password',user.password)
try{
  console.log('Posted')
  const response=await axios.post('http://localhost:5000/login',user)
  console.log('Server Response:',response.data)
  if(response.data.id){
localStorage.setItem("userId",response.data.id)
localStorage.setItem("username",response.data.username)
  }
  navigate('/home')
}
catch(err){
  if(err?.response?.status===401){
  setUser({
    email:'',
    password:''
  })}
  setError(err.response?.data?.message || "Something went wrong...try again later");
  console.error(err);
}
}
return(
     <div className="main_sign_up">
  <div className="signup_card">
    <h2>Sign In</h2>
<p className="signin_text">
      New to EasyTrack? <Link to="/signup">Sign Up</Link>
    </p>
    <form className="sign_up_form" onSubmit={handleSignin}>
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="email"
        value={user.email}
      />
      <input
        type="password"
        placeholder="Password"
    onChange={handleChange}
        name="password"
        value={user.password}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  </div>
</div>
)

}
    

export default SignIn