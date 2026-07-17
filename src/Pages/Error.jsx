import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-richblack-900 text-white px-4">
      {/* Animated 404 number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <h1 className="text-[10rem] md:text-[14rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-richblack-300 to-richblack-700 select-none">
          404
        </h1>
        {/* Glow effect behind the number */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-64 h-64 rounded-full bg-gradient-to-r from-yellow-50/10 to-blue-200/10 blur-3xl" />
        </div>
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-center -mt-8"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-richblack-5 mb-3">
          Page Not Found
        </h2>
        <p className="text-richblack-300 text-lg max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link to="/">
          <button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-yellow-50 text-richblack-900 font-semibold hover:shadow-[0_0_25px_rgba(255,214,10,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            <FaHome />
            Go Home
          </button>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-8 py-3 rounded-lg border border-richblack-600 text-richblack-100 font-semibold hover:bg-richblack-800 hover:border-richblack-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <FaArrowLeft />
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default Error;
