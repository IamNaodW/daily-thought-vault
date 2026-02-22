import React, { useState } from "react";
import axios from "axios";

function MainEditor({ onSave, moodData, token }) {
  const [entry, setEntry] = useState("");
  const [mood, setMood] = useState(2);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!entry.trim() || loading) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/thoughts",
        {
          text: entry,
          mood,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update parent state safely
      onSave(res.data);

      // Reset editor
      setEntry("");
      setMood(2);
    } catch (err) {
      console.error("Failed to save thought:", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Failed to save thought.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-8 md:px-16 py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-serif italic text-white leading-tight">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
          <p className="text-zinc-500 mt-1 font-medium">
            Capture your silence.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-2xl border border-zinc-800/50">
          {moodData.map((m, idx) => {
            const isActive = mood === idx;

            return (
              <button
                key={idx}
                onClick={() => setMood(idx)}
                disabled={loading}
                className={`relative p-2 w-12 h-12 rounded-xl text-2xl transition-all duration-300
                ${
                  isActive
                    ? `${m.bg} ${m.color} ${m.border} scale-110 shadow-lg border`
                    : "opacity-30 hover:opacity-100 grayscale hover:grayscale-0"
                }`}
                title={m.label}
              >
                {m.emoji}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current"></span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        disabled={loading}
        className="w-full min-h-[25vh] bg-transparent border-none outline-none resize-none text-2xl leading-[1.8] placeholder:text-zinc-800 font-serif text-zinc-300 custom-scrollbar"
        placeholder="What's on your mind?..."
      />

      <footer className="mt-8 flex justify-end items-center gap-6">
        <span className="text-xs text-zinc-600 font-mono uppercase tracking-widest">
          {entry.split(/\s+/).filter((word) => word.length > 0).length} Words
        </span>

        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-all active:scale-95 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save to Vault"}
        </button>
      </footer>
    </main>
  );
}

export default MainEditor;