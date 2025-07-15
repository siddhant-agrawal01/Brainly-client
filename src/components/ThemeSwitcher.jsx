import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

const ThemeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-inner"
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        <div
          className={`absolute w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center border border-gray-200 dark:border-gray-600 ${
            isDarkMode ? "translate-x-3.5" : "-translate-x-3.5"
          }`}
        >
          {isDarkMode ? (
            <Moon className="w-3.5 h-3.5 text-blue-400" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-yellow-500" />
          )}
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-2">
          <Sun
            className={`w-3 h-3 transition-opacity duration-300 ${
              isDarkMode ? "opacity-40 text-gray-500" : "opacity-0"
            }`}
          />
          <Moon
            className={`w-3 h-3 transition-opacity duration-300 ${
              isDarkMode ? "opacity-0" : "opacity-40 text-gray-600"
            }`}
          />
        </div>
      </button>

      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
        <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
          {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
