import React from "react";

function MobileHeader({ onOpenSidebar }) {
  return (
    <header className="md:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 w-full">
      <button onClick={onOpenSidebar} className="p-2 text-zinc-400 font-bold text-xl">☰</button>
      <h1 className="text-xs font-bold tracking-[0.3em] uppercase text-emerald-500">Vault</h1>
      <div className="w-10"></div>
    </header>
  );
}

export default MobileHeader;