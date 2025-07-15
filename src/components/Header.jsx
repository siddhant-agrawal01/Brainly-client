import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { LogOut, Bookmark } from "lucide-react";

const Header = ({ title = "My Bookmarks", showLogout = true }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Floating Header Container */}
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[96%] max-w-7xl">
        <div className="relative slide-in-up">
          {/* Main Header Card */}
          <div className="bg-white/10 dark:bg-black/10 backdrop-blur-4xl border border-white/30 dark:border-white/10 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/50">
            {/* Subtle gradient border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 dark:from-white/10 dark:via-white/5 dark:to-white/10 p-[1px]">
              <div className="h-full w-full rounded-3xl bg-white/10 dark:bg-black/10 backdrop-blur-2xl"></div>
            </div>

            {/* Content */}
            <div className="relative px-8 py-5">
              <div className="flex justify-between items-center">
                {/* Left side - Logo and Title */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-azure-500/80 to-azure-600/80 backdrop-blur-sm shadow-lg shadow-azure-500/25">
                    <Bookmark className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-slate-900/90 dark:text-white/90 drop-shadow-sm">
                      {title}
                    </h1>
                    <span className="text-sm text-slate-700/80 dark:text-white/70 font-medium drop-shadow-sm">
                      Professional Bookmark Manager
                    </span>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-4">
                  {/* Theme Switcher in Glass Container */}
                  <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-2xl p-3 border border-white/20 dark:border-white/10">
                    <ThemeSwitcher />
                  </div>

                  {showLogout && (
                    <button
                      onClick={handleLogout}
                      className="group flex items-center space-x-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-red-700 dark:text-red-300 font-semibold px-5 py-3 rounded-2xl border border-red-500/30 dark:border-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                    >
                      <LogOut className="w-4 h-4 transition-transform group-hover:rotate-12" />
                      <span className="text-sm">Logout</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Floating Glow Effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-azure-400/10 via-azure-500/15 to-azure-400/10 blur-2xl opacity-60 -z-10"></div>
        </div>
      </header>

      {/* Spacer to prevent content overlap */}
      <div className="h-24"></div>
    </>
  );
};

export default Header;
