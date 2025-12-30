import express from "express"
import mysql from "mysql"
import multer from "multer"
import cors from "cors"
import path from "path"
import bcrypt from 'bcrypt'
import { create } from "domain"

const app=express()
app.use(cors());
app.use(express.json())

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"easy_track"
})


//API to get all usernames in db
app.get("/users",(req,res)=>{
const q="select Username from users "
db.query(q,(err,data)=>{
    if(err){
        return res.status(500).json(err)
    }
    return res.status(200).json(data)
})
})


//API to get all records of a specific ID
app.get("/records/:uid",(req,res)=>{
  const uid=req.params.uid
const q=`SELECT * from workout_logs WHERE UID=?`
db.query(q,[uid],(err,data)=>{
    if(err){
        return res.json(err)
        
    }
    console.log("Data sent to frontend:", data);
    return res.json(data);
})
})
//API to delete a log 
app.delete("/records/:id", (req, res) => {
  const logId = req.params.id;
  const q = `DELETE FROM workout_logs WHERE id = ?`;
  db.query(q, [logId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Log has been deleted successfully.");
  });
});

          //API to add a new user using sign up
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  // Validate input
  if (!username?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
 //i did a callback nesting way inorder for the queries to wait for each other to finish and not skip and create error while not using async (AI usage)
//check if email is unique
db.query("SELECT UID FROM users WHERE Email=? LIMIT 1",[email.trim()],(err,data)=>{
    if(err){
      return res.status(500).json({message:"Database error"});
    }
    if(data.length>0){
      return res.status(409).json({message:"Email already exists"});
    }
//check if username is unique
     db.query("SELECT UID FROM users WHERE Username=? LIMIT 1",[username.trim()],(err,data)=>{
    if(err){
      return res.status(500).json({message:"Database error"});
    }
    if(data.length>0){
      return res.status(409).json({message:"Username already exists"});
    }

    // Insert user with hashed password
    // Hash password
      bcrypt.hash(password, 10,(err,hashedPassword)=>{
        const q =
      "INSERT INTO users (`Username`, `Email`, `Password`) VALUES (?, ?, ?)";

    db.query(q, [username.trim(), email.trim(), hashedPassword], (err,data) => {
      if (err) return res.status(500).json(err);
const userid=data.insertId

      res.status(201).json({ message: "User created successfully",
        "id": userid,
        "Username": username.trim()
       });
     })
      })
    // Insert HASHED password
    
  }  
)
  })

})



//API to check log in details
app.post('/login',(req,res)=>{
    const {email,password}=req.body;
if(!email || !password){
    return res.status(400).json({message:"Email and password are required"});
}
const q="SELECT * FROM users WHERE Email=?"
db.query(q,[email],async(err,results)=>{
    //if error
    if(err)return res.status(500).json(err)
        //if email not found
    if(results.length===0){
            return res.status(401).json({message: "Invalid email or password"});
        }
        //query of user
    const user=results[0]
        //compare passwords
    const isMatch=await bcrypt.compare(password,user.Password)       
     if(!isMatch){
            return res.status(401).json({message:"Invalid email or password"})
        }
        //login success
    res.status(200).json({
            message:"Login Successful",    
                id:user.UID,
                username:user.Username,       
            
        })

})
})

//API to add workoutlogs to DB
app.post('/workoutlogs',(req,res)=>{

    const {uid,steps,mood,meals,calories,distance}=req.body;
      console.log("Data received from client:", req.body);
    const q="insert into workout_logs(`UID`,`Steps`,`Mood`,`Meals`,`Calories`,`Distance`) VALUES (?,?,?,?,?,?)"
    db.query(q,[uid,steps,mood,meals,calories,distance],(err,data)=>{
        if(err) return res.status(500).send(err);
        return res.status(201).json({message:"Workout log added successfully"});
    })
})

app.listen(5000,()=>{
    console.log("connected to backend.")
});