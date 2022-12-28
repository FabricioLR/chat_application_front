import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignIn from "./pages/auth/singIn/SingIn"
import SignUp from "./pages/auth/singUp/SingUp"
import Home from "./pages/home/Home"
import "../globals/style.css"
import Profile from "./pages/profile/Profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
