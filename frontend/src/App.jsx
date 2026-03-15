import { BrowserRouter,Routes,Route } from "react-router-dom"

import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Dashboard from "./pages/Dashboard"
import SendMoney from "./pages/SendMoney"
import Statement from "./pages/Statement"
import ProtectedRoute from "./routes/ProtectedRoute"
import Navbar from "./component/Navbar"

function App(){

 return(

  <BrowserRouter>
<Navbar/>
   <Routes>

    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Signup/>}/>

    <Route path="/dashboard" element={
     <ProtectedRoute>
      <Dashboard/>
     </ProtectedRoute>
    }/>

    <Route path="/send" element={
     <ProtectedRoute>
      <SendMoney/>
     </ProtectedRoute>
    }/>

    <Route path="/statement" element={
     <ProtectedRoute>
      <Statement/>
     </ProtectedRoute>
    }/>

   </Routes>

  </BrowserRouter>

 )
}

export default App