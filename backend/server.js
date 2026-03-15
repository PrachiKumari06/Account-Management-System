import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import accountRoutes from "./routes/account.routes.js"

dotenv.config()

const app = express()
const PORT=process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/account",accountRoutes)

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`)
})