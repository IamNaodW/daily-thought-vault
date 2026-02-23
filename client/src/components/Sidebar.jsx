import React from "react";
import ThoughtCard from "./ThoughtCard";

function Sidebar({ thoughts = [], isOpen, onClose, moodData }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 p-6 
        transition-transform duration-300 ease-in-out transform flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:flex
      `}>
        
        {/* Close button for mobile */}
        <button onClick={onClose} className="md:hidden absolute top-6 right-6 text-zinc-500 hover:text-white">✕</button>

        <div className="flex items-center gap-2 mb-6 shrink-0">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
          <h1 className="text-xl font-bold tracking-tight text-white">Thought Vault</h1>
        </div>

        {/* Scrollable History Section */}
        <nav className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-4 sticky top-0 bg-zinc-950 py-1">
            Vault History
          </p>

          <div className="flex flex-col gap-3 pb-4">
            {thoughts.length === 0 ? (
              <p className="text-xs text-zinc-500 italic">No thoughts yet...</p>
            ) : (
              thoughts.map((t, idx) => (
                <ThoughtCard 
                  key={idx} 
                  date={new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                  text={t.text} 
                  moodEmoji={moodData[t.mood]?.emoji} 
                />
              ))
            )}
          </div>
        </nav>

        {/* Streak Counter - always visible */}
        <div className="mt-4 pt-4 border-t border-zinc-800 shrink-0">
          <div className="flex items-center gap-3 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Streak</p>
              <p className="text-lg font-bold text-white">{thoughts.length > 0 ? '1' : '0'} Days</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;