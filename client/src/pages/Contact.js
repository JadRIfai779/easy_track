import { useState } from "react";


function Contact() {


 const [formData,setFormData]=useState({
  fullname:'',
  email:'',
  message:''
 })


const handleChange=(e)=>{
const{name,value}=e.target;
setFormData((prev)=>({
    ...prev,
    [name]:value,
  }))
};


 const Sent = (e) => {
    e.preventDefault();
    console.log("Submitted:",formData);
    window.alert("Thank You For Trying EasyTrack ;)")
  };


  return (
    <div className="page">

    <h1 className="color">Contact Us📠</h1>
      <p>Have feedback or suggestions? Send us a message.</p>
    <form className="contact-form" onSubmit={Sent}>
      <input type="text" placeholder="Full Name" required name="fullname" value={formData.fullname} onChange={handleChange} />
      <input type="email" placeholder="Email" required name="email" value={formData.email} onChange={handleChange} />
      <textarea placeholder="Your message..." rows="4" required value={formData.message} name="message" onChange={handleChange } />
      <button type="submit" className="primary-btn" >Send</button>
    </form>
    </div>
  );
}
export default Contact
