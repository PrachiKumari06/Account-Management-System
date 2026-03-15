import { useState } from "react"
import Axios from "../../axios/api.axios.js"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Signup(){

 const navigate = useNavigate()

 const [form,setForm] = useState({
  name:"",
  email:"",
  password:""
 })

 const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})
 }

 const handleSubmit = async(e)=>{

  e.preventDefault()

  try{

   await Axios.post("/auth/signup",form)

   toast.success("Signup successful")

   navigate("/login")

  }catch(err){

   toast.error(err.response?.data?.message || "Signup failed")

  }

 }

 return(

  <div className="page">
  <form onSubmit={handleSubmit} className="card">

    <h2 className="title">Signup</h2>

    <input name="name" placeholder="Name" onChange={handleChange}/>
    <input name="email" placeholder="Email" onChange={handleChange}/>
    <input name="password" type="password" placeholder="Password" onChange={handleChange}/>

    <button>Signup</button>

    <p className="link-text">
      Already have an account?
      <span className="link" onClick={()=>navigate("/login")}> Login</span>
    </p>

  </form>
</div>

 )
}