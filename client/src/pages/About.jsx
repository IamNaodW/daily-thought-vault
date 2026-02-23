import { useState, useEffect } from "react";

const About = () => {
  const [bio, setBio] = useState("");

  useEffect(() => {
    const savedBio = localStorage.getItem("userBio");
    if (savedBio) setBio(savedBio);
  }, []);

  const handleSave = () => {
    localStorage.setItem("userBio", bio);
    alert("Saved!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">About You</h2>

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          className="w-full h-40 border p-3 rounded mb-4"
        />

        <button
          onClick={handleSave}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default About;