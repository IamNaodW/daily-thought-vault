import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ onOpenSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = () => {
    setOpenDropdown(false);
    logout();
  };

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 px-4 py-3 flex items-center justify-between border-b border-zinc-800">
      {/* Mobile sidebar button */}
      {user && (
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
        >
          ☰
        </button>
      )}

      {/* Center title */}
      <h1 className="text-emerald-500 font-bold text-lg text-center flex-1 md:flex-none">
        Vault
      </h1>

      {/* Profile dropdown */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600"
          >
            👤
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md">
              <Link
                to="/about"
                onClick={() => setOpenDropdown(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                About You
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;