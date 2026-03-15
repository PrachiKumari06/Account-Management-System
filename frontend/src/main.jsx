import React from "react"
import { createRoot } from 'react-dom/client'
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")).render(

 <AuthProvider>
  <App/>
  <Toaster position="top-center"/>
 </AuthProvider>

)