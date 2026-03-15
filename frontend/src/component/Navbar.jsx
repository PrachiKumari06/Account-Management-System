import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import "../App.css"

export default function Navbar(){

 const { logout } = useContext(AuthContext)
 const navigate = useNavigate()

 const handleLogout = ()=>{
  logout()
  navigate("/login")
 }

 return(

  <nav className="navbar">

   <h2>Account Manager</h2>

   <div className="nav-links">
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/send">Send Money</Link>
    <Link to="/statement">Statement</Link>

    <button className="logout-btn" onClick={handleLogout}>
     Logout
    </button>
   </div>

  </nav>

 )
}