import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Sidebar from "../components/Sidebar";
import MainEditor from "../components/MainEditor";
import MobileHeader from "../components/MobileHeader";

export const MOOD_DATA = [
  { emoji: '😫', label: 'Distressed', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/50' },
  { emoji: '🙁', label: 'Low', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/50' },
  { emoji: '😐', label: 'Neutral', color: 'text-zinc-400', bg: 'bg-zinc-500/10', border: 'border-zinc-500/50' },
  { emoji: '🙂', label: 'Good', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/50' },
  { emoji: '🤩', label: 'Great', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/50' }
];

function Dashboard() {
  const [thoughts, setThoughts] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const API_URL = "http://localhost:5000/api/thoughts"; 

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await axios.get(API_URL);
        setThoughts(response.data);
      } catch (err) {
        console.error("Error fetching thoughts:", err);
      }
    };
    fetchThoughts();
  }, []);

  // ONLY updates state, no POST
  const addThought = (savedThought) => {
    setThoughts([savedThought, ...thoughts]);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-zinc-950 text-zinc-200 font-sans overflow-hidden">
      <MobileHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
      
      <Sidebar 
        thoughts={thoughts} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        moodData={MOOD_DATA} 
      />
      
      <div className="flex-1 overflow-y-auto">
        <MainEditor onSave={addThought} moodData={MOOD_DATA} />
      </div>
    </div>
  );
}

export default Dashboard;