import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
    toast.success("Registered successfully!");
    navigate("/login");
    } else {
    toast.error(data.message || "Registration failed");
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-10 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-500 transition-all active:scale-95"
        >
          Register
        </button>

        <p className="text-sm text-zinc-400 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-500 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;