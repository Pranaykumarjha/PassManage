import React from 'react'
import { Hammer } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-6 text-center px-4 sm:px-6 md:px-10">
      {/* Futuristic Logo, responsive size */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-widest">
        <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 text-transparent bg-clip-text">&lt;</span>
        <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          Pass
        </span>
        <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 text-transparent bg-clip-text">OP/&gt;</span>
      </h1>

      {/* Tagline */}
      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
        <span>Created with</span>
        <Hammer 
          size={18} 
          className="text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] animate-pulse" 
        />
        <span>by Pranay</span>
      </div>
    </footer>
  )
}

export default Footer
