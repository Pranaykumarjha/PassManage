import React from 'react'
import { Hammer } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-6 text-center">
      {/* Futuristic Logo, smaller size */}
      <h1 className="text-2xl font-extrabold tracking-widest">
        <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 text-transparent bg-clip-text">&lt;</span>
        <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          Pass
        </span>
        <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-700 text-transparent bg-clip-text">OP/&gt;</span>
      </h1>

      {/* Tagline */}
      <div className="mt-3 flex justify-center items-center gap-2 text-gray-400 text-sm">
        <span>Created with</span>
        <Hammer 
          size={20} 
          className="text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)] animate-pulse" 
        />
        <span>by Pranay</span>
      </div>
    </footer>
  )
}

export default Footer
