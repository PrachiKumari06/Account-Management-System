import { useState } from "react"
import Axios from "../axios/api.axios.js"
import toast from "react-hot-toast"

export default function SendMoney(){

 const [form,setForm] = useState({
  receiverEmail:"",
  amount:""
 })

 const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})
 }

 const handleSubmit = async(e)=>{

  e.preventDefault()
try{
    
  await Axios.post("/account/transfer",{
    receiverEmail:form.receiverEmail,
    amount:Number(form.amount)
  })

toast.success("Money transferred")
}
catch(err){

  toast.error(err.response.data.message || "Transfer failed")
 }
 }
 return(

  <div>

   <h2>Send Money</h2>

   <form onSubmit={handleSubmit}>

    <input name="receiverEmail" placeholder="Receiver Email" onChange={handleChange}/>
    <input name="amount" placeholder="Amount" onChange={handleChange}/>

    <button>Send</button>

   </form>

  </div>

 )
}