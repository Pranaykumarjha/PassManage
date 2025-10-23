import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
 

  return (
    <>
    <div className='relative min-h-screen'>
     <div className="absolute inset-0 -z-10 bg-white [background:radial-gradient(125%_125%_at_50%_10%,#ffffff_20%,#bbf7d0_60%,#22c55e_100%)]"></div>
    <Navbar/>
    <Manager/>
   
   <Footer/>
   </div>
    </>
  )
}

export default App
