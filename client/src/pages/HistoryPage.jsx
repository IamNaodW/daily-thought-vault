import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MOOD_DATA } from "./Dashboard";
import axios from "axios";

function HistoryPage() {
  const { user, logout } = useContext(AuthContext);
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingThought, setEditingThought] = useState({ id: "", text: "" });
  const [deletingId, setDeletingId] = useState(null);

  const API_URL = "http://localhost:5000/api/thoughts";

  useEffect(() => {
    const fetchThoughts = async () => {
      if (!user) return;
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setThoughts(res.data);
      } catch (err) {
        if (err.response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };
    fetchThoughts();
  }, [user, logout]);

  // Handle Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${deletingId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setThoughts(thoughts.filter((t) => t._id !== deletingId));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${API_URL}/${editingThought.id}`,
        { text: editingThought.text },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setThoughts(thoughts.map((t) => (t._id === editingThought.id ? res.data : t)));
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 pb-32">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <header className="mb-10">
          <h2 className="text-3xl font-serif italic text-white">Vault History</h2>
          <p className="text-zinc-500 text-sm mt-2">A timeline of your inner silence.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20 text-emerald-500 animate-pulse font-mono tracking-widest uppercase text-xs">
            Accessing Vault...
          </div>
        ) : (
          <div className="space-y-6">
            {thoughts.map((t) => {
              const mood = MOOD_DATA[t.mood] || { emoji: "✨" };
              return (
                <div key={t._id} className="group relative bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-3xl hover:bg-zinc-900/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{mood.emoji}</span>
                      <div className="flex flex-col">
                        {/* DATE DISPLAY */}
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
                          {new Date(t.createdAt).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric' 
                          })}
                        </span>
                        <span className="text-[10px] text-zinc-600 font-mono">
                          {new Date(t.createdAt).toLocaleTimeString('en-US', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                        
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingThought({ id: t._id, text: t.text }); setIsEditModalOpen(true); }}
                        className="p-2 hover:bg-emerald-500/10 rounded-full text-zinc-500 hover:text-emerald-400 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button 
                        onClick={() => { setDeletingId(t._id); setIsDeleteModalOpen(true); }}
                        className="p-2 hover:bg-red-500/10 rounded-full text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap">{t.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- EDIT MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-white">Refine Thought</h3>
            <textarea
              className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-zinc-200 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none mb-6"
              value={editingThought.text}
              onChange={(e) => setEditingThought({ ...editingThought, text: e.target.value })}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 text-zinc-400 hover:text-white">Cancel</button>
              <button onClick={handleUpdate} className="px-8 py-2 bg-emerald-500 text-zinc-950 rounded-full font-bold">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Move to Void?</h3>
            <p className="text-zinc-500 text-sm mb-8">This action is permanent. This thought will be erased from the vault forever.</p>
            <div className="flex flex-col gap-3">
              <button onClick={confirmDelete} className="w-full py-3 bg-red-500 hover:bg-red-400 text-white rounded-full font-bold transition-all">Yes, Erase Thought</button>
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-3 bg-zinc-800 text-zinc-300 rounded-full font-bold hover:bg-zinc-700 transition-all">Keep it</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryPage;