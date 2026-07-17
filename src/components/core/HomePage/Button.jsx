import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children,active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-sm sm:text-base px-6 py-3 rounded-lg font-bold ${active  ? "bg-yellow-50 text-black hover:shadow-[0_0_25px_rgba(255,214,10,0.3)]": "bg-richblack-800 hover:bg-richblack-700"} hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton
