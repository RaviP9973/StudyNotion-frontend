import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slices/themeSlice";
import { motion } from "motion/react";

const ThemeToggle = () => {
  const { darkMode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <button
      id="theme-toggle-btn"
      onClick={() => dispatch(toggleTheme())}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-richblack-700 bg-richblack-800 transition-colors duration-300 hover:border-yellow-50 group"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon - shown in dark mode (click to go light) */}
      <motion.svg
        key="sun"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-yellow-50 absolute"
        initial={false}
        animate={{
          scale: darkMode ? 1 : 0,
          opacity: darkMode ? 1 : 0,
          rotate: darkMode ? 0 : -90,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </motion.svg>

      {/* Moon icon - shown in light mode (click to go dark) */}
      <motion.svg
        key="moon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-blue-200 absolute"
        initial={false}
        animate={{
          scale: darkMode ? 0 : 1,
          opacity: darkMode ? 0 : 1,
          rotate: darkMode ? 90 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>
    </button>
  );
};

export default ThemeToggle;
