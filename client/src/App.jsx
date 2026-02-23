import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // sidebar state here

  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        {/* Pass toggle function to Navbar */}
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;