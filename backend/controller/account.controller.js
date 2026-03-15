import supabase from "../config/supabase.config.js";
export const getbalance=async(req,res)=>{
    const {id}=req.user;
    const {data,error}=await supabase
    .from("users_account")
    .select("balance")
    .eq("id",id)
    .single();
    if(error){
        return res.status(500).json({message:"Error fetching balance."})
    }
    return res.status(200).json({balance:data.balance});
}
export const transferMoney = async (req, res) => {

  const senderId = req.user.id
  const { receiverEmail, amount } = req.body

  const transferAmount = Number(amount)

  if (!transferAmount || transferAmount <= 0) {
    return res.status(400).json({ message: "Invalid amount" })

}
  const { data: receiver } = await supabase
    .from("users_account")
    .select("*")
    .eq("email", receiverEmail)
    .single()

  if (!receiver) {
    return res.status(404).json({ message: "Receiver not found" })
  }
if(receiver.id === senderId){
  return res.status(400).json({ message: "Cannot transfer money to yourself" })
}
  const { data: sender } = await supabase
    .from("users_account")
    .select("*")
    .eq("id", senderId)
    .single()

  if (sender.balance < transferAmount) {
    return res.status(400).json({ message: "Insufficient balance" })
  }

  const newSenderBalance = sender.balance - transferAmount
  const newReceiverBalance = receiver.balance + transferAmount

  await supabase
    .from("users_account")
    .update({ balance: newSenderBalance })
    .eq("id", senderId)

  await supabase
    .from("users_account")
    .update({ balance: newReceiverBalance })
    .eq("id", receiver.id)

 await supabase
.from("transactions")
.insert([
  {
    sender_id: senderId,
    receiver_id: receiver.id,
    amount: transferAmount,
    transaction_type: "debit",
     balance_after: newSenderBalance
  },
  {
    sender_id: receiver.id,
    receiver_id: senderId,
    amount: transferAmount,
    transaction_type: "credit",
        balance_after: newReceiverBalance
  }
])

  res.json({ message: "Transfer successful" })
}
export const getStatement = async(req,res)=>{

 const {data:transactions} = await supabase
 .from("transactions")
 .select("*")
.eq("sender_id", req.user.id)
 const result = []

  for (let t of transactions) {

    const { data: sender } = await supabase
      .from("users_account")
      .select("email")
      .eq("id", t.sender_id)
      .single()

    const { data: receiver } = await supabase
      .from("users_account")
      .select("email")
      .eq("id", t.receiver_id)
      .single()

   result.push({
  id: t.id,
  created_at: t.created_at,
  transaction_type: t.transaction_type,
  amount: t.amount,
  sender: sender?.email,
  receiver: receiver?.email,
})
  }

  res.json(result)
}