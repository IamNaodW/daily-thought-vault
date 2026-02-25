import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function QuotesPage() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRandomQuote = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/quotes/random");
      setQuote(res.data);
    } catch (err) {
      console.error("Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    // We use relative here to ensure children can use absolute positioning correctly
    <div className="fixed inset-0 z-[60] bg-zinc-950 flex items-center justify-center p-6 md:p-24 text-center overflow-hidden">
      
      {/* Background Decor - Lower Z-Index */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* LEFT SIDE: Back Button - Higher Z-Index */}
      <button 
        onClick={() => navigate("/")} // Explicitly route to home
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-4 text-zinc-600 hover:text-white transition-all z-20 pointer-events-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      {/* CENTER: The Quote */}
      <div className="max-w-4xl z-10 px-10">
        {loading ? (
          <div className="animate-pulse text-zinc-600 font-mono text-xs tracking-widest uppercase">
            Consulting the Oracle...
          </div>
        ) : quote ? (
          <div className="animate-in fade-in zoom-in duration-700">
            <span className="text-emerald-500 text-6xl font-serif opacity-20 block mb-6">“</span>
            <h2 className={`font-serif italic text-zinc-100 leading-tight mb-8 
              ${quote.text.length > 150 ? 'text-xl md:text-3xl' : 'text-3xl md:text-5xl'}`}>
              {quote.text}
            </h2>
            <p className="text-emerald-500/60 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">
              — {quote.author}
            </p>
          </div>
        ) : (
          <p className="text-zinc-600 italic font-serif">The vault is silent.</p>
        )}
      </div>

      {/* RIGHT SIDE: Refresh Button - Higher Z-Index */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          fetchRandomQuote();
        }}
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-4 text-emerald-500 hover:text-emerald-400 transition-all z-20 pointer-events-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  );
}

export default QuotesPage;