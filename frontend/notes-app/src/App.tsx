import { useState } from 'react'
import Home from './pages/Home/Home.tsx'
import Login from './pages/Login/Login.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" element = {<Home />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/signup" element = {<SignUp />} />
    </Routes>
  </Router>
)


function App() {

  return (
    <div>{routes}</div>
  )
}

export default App
