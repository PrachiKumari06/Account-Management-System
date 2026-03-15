import { useEffect,useState } from "react"
import Axios from "../axios/api.axios.js"

export default function Statement(){

 const [transactions,setTransactions] = useState([])

 useEffect(()=>{

  async function fetchData(){
   const res = await Axios.get("/account/statement")
   setTransactions(res.data)
  }

  fetchData()

 },[])

 return(

  <table border="1">

   <thead>
    <tr>
     <th>Date</th>
     <th>Type</th>
     <th>Amount</th>
     <th>Sender</th>
     <th>Receiver</th>
    </tr>
   </thead>

   <tbody>

    {transactions.map((t)=>(
     <tr key={t.id} style={{color:t.transaction_type==="credit"?"green":"red"}}>

      <td>{new Date(t.created_at).toLocaleString()}</td>
      <td>{t.transaction_type}</td>
      <td>₹{t.amount}</td>
      <td>{t.sender}</td>
      <td>{t.receiver}</td>

     </tr>
    ))}

   </tbody>

  </table>

 )
}