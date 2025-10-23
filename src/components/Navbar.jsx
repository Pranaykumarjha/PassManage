import React from 'react'
import { Github } from "lucide-react"

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>
      <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
        
        {/* Logo */}
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/ &gt;</span>
        </div>

        {/* Links */}
        <ul>
          <li className='flex gap-6 items-center'>
            {/* <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a> */}

            {/* GitHub Icon */}
            <a 
              href="https://github.com/your-repo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-500 "
            >
              <Github size={24} />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
