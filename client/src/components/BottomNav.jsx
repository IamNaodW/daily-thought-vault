import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      label: "Today", 
      path: "/", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> 
    },
    { 
      label: "Quotes", 
      path: "/quotes", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> 
    },
    { 
      label: "History", 
      path: "/history", 
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 
    },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center z-[70] px-6 pointer-events-none">
      <nav className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 py-3 px-8 rounded-full shadow-2xl shadow-black/50 flex items-center gap-10 pointer-events-auto">
        {menuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
                active ? "text-emerald-500" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'scale-100'}`}>
                {item.icon}
              </div>
              
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold">
                {item.label}
              </span>
              
              {/* Single, clean active indicator */}
              {active && (
                <div className="absolute -bottom-1.5 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;