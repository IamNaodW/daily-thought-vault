import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const About = () => {
  const { user } = useContext(AuthContext);
  const [bio, setBio] = useState("");
  const [thoughts, setThoughts] = useState([]); // Added state for thoughts
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Define moodData here so the "Dominant Energy" card knows what emoji to use
  const moodData = {
    happy: { emoji: "😊" },
    sad: { emoji: "😢" },
    angry: { emoji: "😠" },
    anxious: { emoji: "😰" },
    neutral: { emoji: "😐" },
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // 1. Fetch User Profile (for bio and join date)
        const userRes = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBio(userRes.data.bio || "");

        // 2. Fetch Thoughts (to calculate stats)
        const thoughtsRes = await axios.get("http://localhost:5000/api/thoughts", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setThoughts(thoughtsRes.data);
      } catch (err) {
        console.error("Error fetching data from vault.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // --- STATS CALCULATIONS ---
  const totalThoughts = thoughts.length;

  const topMood = (() => {
    if (totalThoughts === 0) return "neutral";
    const counts = {};
    
    thoughts.forEach((t) => {
      // Safety check: ensure mood is a string before calling toLowerCase
      const moodValue = typeof t.mood === 'string' ? t.mood.toLowerCase() : "neutral";
      counts[moodValue] = (counts[moodValue] || 0) + 1;
    });

    return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
  })();

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-bio",
        { bio: bio },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setBio(res.data.bio);
      setIsEditing(false);
      toast.success("Identity updated in the cloud.");
    } catch (err) {
      toast.error("Failed to sync with the vault.");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="animate-pulse text-emerald-500 font-mono text-xs tracking-widest uppercase">
        Loading Identity...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-6 pt-12 pb-20">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 text-center">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👤</span>
          </div>
          <h2 className="text-3xl font-serif italic text-white">
            {user?.username || "Explorer"}'s Profile
          </h2>
          <p className="text-zinc-500 text-sm mt-2">Refining the narrative of self.</p>
        </header>

        {/* Bio Section */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500">About Me</h3>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="text-xs text-zinc-400 hover:text-white border border-zinc-800 px-3 py-1 rounded-full transition-all"
              >
                Edit Narrative
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-zinc-200 focus:outline-none focus:border-emerald-500/50 resize-none"
                autoFocus
              />
              <div className="flex gap-3 justify-end">
                <button onClick={() => setIsEditing(false)} className="text-zinc-400 text-sm">Cancel</button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-2 bg-emerald-500 text-zinc-950 rounded-full font-bold text-sm hover:bg-emerald-400 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div onClick={() => setIsEditing(true)} className="cursor-pointer min-h-[100px]">
              {bio ? (
                <p className="text-zinc-300 leading-relaxed italic font-serif text-lg whitespace-pre-wrap">"{bio}"</p>
              ) : (
                <p className="text-zinc-600 italic">The page is silent. Click to write your story...</p>
              )}
            </div>
          )}
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Member Since</p>
            <p className="text-zinc-300 text-sm">
              {user?.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) 
                : "Spring 2026"}
            </p>
          </div>
          
          <div className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl group hover:border-emerald-500/30 transition-colors">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Vault Volume</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-white">{totalThoughts}</p>
              <p className="text-xs text-zinc-500 font-medium">Entries</p>
            </div>
          </div>

          <div className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl group hover:border-emerald-500/30 transition-colors">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Dominant Energy</p>
            <div className="flex items-center gap-2">
              <span className="text-xl">{moodData[topMood]?.emoji || "✨"}</span>
              <p className="text-zinc-300 text-sm font-medium capitalize">{topMood}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;