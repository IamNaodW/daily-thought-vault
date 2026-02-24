import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onOpenSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setOpenDropdown(false);
    logout();
  };

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 px-6 py-3 flex items-center justify-between border-b border-zinc-900">
      {/* Mobile sidebar button */}
      <div className="flex items-center gap-4">
        {user && (
          <button
            onClick={onOpenSidebar}
            className="md:hidden p-2 -ml-2 text-zinc-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <h1 className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-sm hidden sm:block">
          Vault
        </h1>
      </div>

      {/* Center Title for Mobile */}
      <h1 className="text-emerald-500 font-bold tracking-[0.2em] uppercase text-sm sm:hidden absolute left-1/2 -translate-x-1/2">
        Vault
      </h1>

      {/* Profile Area */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className={`
              group flex items-center justify-center w-10 h-10 rounded-full 
              bg-zinc-900 border transition-all duration-300
              ${
                openDropdown
                  ? "border-emerald-500 ring-4 ring-emerald-500/10"
                  : "border-zinc-800 hover:border-zinc-600"
              }
            `}
          >
            {/* Profile Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform"
            >
              <path d="M20 21a8 8 0 1 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>

          {/* Dark Themed Dropdown */}
          {openDropdown && (
            <div className="absolute right-0 mt-3 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-3 border-b border-zinc-800 mb-1">
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">
                  Account
                </p>
                <p className="text-sm text-white truncate font-medium">
                  {user?.username || "Explorer"}
                </p>
              </div>

              <Link
                to="/about"
                onClick={() => setOpenDropdown(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <span>👤</span> About You
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <span>🚀</span> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;