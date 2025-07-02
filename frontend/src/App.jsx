import { useState } from 'react'
import './App.css' // TAILWIND REQ
import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

function App() {
  // ALL PAGES WILL HAVE A FOOTER + NAVBAR COMPONENT
  return (
    <>
      <div>
        <Navbar/>
        
        <div>
          <Outlet/>
        </div>

        <Footer/>
      </div>
    </>
  )
}

export default App
