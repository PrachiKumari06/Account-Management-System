import { useEffect,useState } from "react"
import Axios from "../axios/api.axios.js"
import { Link } from "react-router-dom"

export default function Dashboard(){

 const [balance,setBalance] = useState(0)

 useEffect(()=>{

  async function fetchBalance(){

   const res = await Axios.get("/account/balance")

   setBalance(res.data.balance)

  }

  fetchBalance()

 },[])

 return(

  <div className="dashboard-page">

   <div className="dashboard-card">

    <h2 className="dashboard-title">Dashboard</h2>

    <div className="dashboard-balance">
      Balance: ₹{balance}
    </div>

    <Link className="dashboard-link" to="/send">
      Send Money
    </Link>

    <Link className="dashboard-link" to="/statement">
      Account Statement
    </Link>

   </div>

  </div>
 )
}