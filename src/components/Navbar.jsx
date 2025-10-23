import React from 'react'
import { Github } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="mycontainer flex flex-col sm:flex-row justify-between items-center px-4 py-4 sm:py-5">
        
        {/* Logo */}
        <div className="logo font-bold text-white text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-0">
          <span className="text-green-700">&lt;</span>
          Pass
          <span className="text-green-700">OP/ &gt;</span>
        </div>

        {/* Links */}
        <ul className="flex gap-4 sm:gap-6 items-center">
          {/* GitHub Icon */}
          <li>
            <a 
              href="https://github.com/your-repo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-green-500 transition-colors duration-200"
            >
              <Github size={22} className="sm:size-24" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
