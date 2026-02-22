import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MainEditor from "../components/MainEditor";
import MobileHeader from "../components/MobileHeader";
import { AuthContext } from "../context/AuthContext";

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

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/thoughts";

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 📥 Fetch thoughts for logged-in user
  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });

        setThoughts(response.data);
      } catch (err) {
        console.error("Error fetching thoughts:", err);

        // If token invalid → logout
        if (err.response?.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };

    if (user) {
      fetchThoughts();
    }
  }, [user, logout, navigate]);

  // ✅ Add thought safely (no duplicates)
  const addThought = (savedThought) => {
    setThoughts(prev => [savedThought, ...prev]);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-zinc-950 text-zinc-200 font-sans overflow-hidden">
      
      <MobileHeader 
        onOpenSidebar={() => setIsSidebarOpen(true)} 
        onLogout={handleLogout}
      />

      <Sidebar
        thoughts={thoughts}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        moodData={MOOD_DATA}
      />

      <div className="flex-1 overflow-y-auto">
        <MainEditor 
          onSave={addThought} 
          moodData={MOOD_DATA}
          token={user?.token}
        />
      </div>
    </div>
  );
}

export default Dashboard;