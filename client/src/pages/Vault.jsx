import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ThoughtCard from "../components/ThoughtCard";
import EditModal from "../components/EditModal"; // we'll create this next

function Vault() {
  const { user } = useContext(AuthContext);
  const [thoughts, setThoughts] = useState([]);
  const [editingThought, setEditingThought] = useState(null);

  const API_URL = "http://localhost:5000/api/thoughts";

  useEffect(() => {
    if (!user) return;

    const fetchThoughts = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setThoughts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchThoughts();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this thought?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setThoughts(thoughts.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSave = (updatedThought) => {
    setThoughts(
      thoughts.map((t) => (t._id === updatedThought._id ? updatedThought : t))
    );
    setEditingThought(null);
  };

  return (
    <div className="p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-emerald-500 mb-4">Vault History</h2>

      {thoughts.length === 0 && (
        <p className="text-zinc-500 italic">No thoughts recorded yet...</p>
      )}

      <div className="flex flex-col gap-4">
        {thoughts.map((t) => (
          <ThoughtCard
            key={t._id}
            date={t.createdAt || t.date}
            text={t.text}
            moodEmoji={t.moodEmoji || "✨"}
            onEdit={() => setEditingThought(t)}
            onDelete={() => handleDelete(t._id)}
          />
        ))}
      </div>

      {editingThought && (
        <EditModal
          thought={editingThought}
          onClose={() => setEditingThought(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}

export default Vault;