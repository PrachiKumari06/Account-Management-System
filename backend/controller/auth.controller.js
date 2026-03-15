import bcrypt from "bcrypt"
import supabase from "../config/supabase.config.js";
import { genratetoken } from "../utils/tokengenrate.js";


export const signup = async (req,res)=>{    
 const {name,email,password} = req.body
 const hashpass = await bcrypt.hash(password,10)
 const {data:existing} = await supabase
 .from("users_account")
 .select("*")
 .eq("email",email)
 if(existing.length > 0){
  return res.status(400).json({message:"User already exists"})
 }
 const {data,error} = await supabase
 .from("users_account")
 .insert([{name,email,password:hashpass,balance:10000}])
 .select()
 if(error){
  return res.status(500).json({message:"error creating user"})
 }

 const token = genratetoken(data[0].id)
 res.status(201).json({
  message:"user created",
  token,
  user:data[0]
 })
}

export const login = async(req,res)=>{
 const {email,password} = req.body
 const {data} = await supabase
 .from("users_account")
 .select("*")
 .eq("email",email)
 .single();
if(!data){
    return res.status(404).json({msg:"User not found"})
}
 const match = await bcrypt.compare(password,data.password)
 if(!match){
    return res.status(401).json({msg:"Invalid Credential"})
}
const token = genratetoken(data.id)
 res.json({token,user:data})
}
