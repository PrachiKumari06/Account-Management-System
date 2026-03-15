import { useState } from "react"
import Axios from "../../axios/api.axios.js"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login(){

 const navigate = useNavigate()

 const [form,setForm] = useState({
  email:"",
  password:""
 })

 const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})
 }

 const handleSubmit = async(e)=>{

  e.preventDefault()

  try{

   const res = await Axios.post("/auth/login",form)

   localStorage.setItem("token",res.data.token)

   toast.success("Login successful")

   navigate("/dashboard")

  }catch(err){

   toast.error("Invalid credentials")

  }

 }

 return(

 <div className="page">
  <form onSubmit={handleSubmit} className="card">

    <h2 className="title">Login</h2>

    <input name="email" placeholder="Email" onChange={handleChange}/>
    <input name="password" type="password" placeholder="Password" onChange={handleChange}/>

    <button>Login</button>

    <p className="link-text">
      Don't have an account? 
      <span className="link" onClick={()=>navigate("/")}> Signup</span>
    </p>

  </form>
</div>

 )
}