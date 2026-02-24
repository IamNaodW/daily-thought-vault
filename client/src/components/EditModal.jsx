import React, { useState } from "react";
import axios from "axios";

function EditModal({ thought, onClose, onSave }) {
  const [text, setText] = useState(thought.text);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/thoughts/${thought._id}`,
        { text },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      onSave(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-zinc-950 p-6 rounded-2xl w-full max-w-md border border-zinc-800">
        <h3 className="text-emerald-500 font-bold mb-4">Edit Thought</h3>
        <textarea
          className="w-full p-3 bg-zinc-900 text-white rounded-lg resize-none"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-zinc-800 text-white rounded-lg hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-emerald-500 text-black rounded-lg hover:bg-emerald-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;