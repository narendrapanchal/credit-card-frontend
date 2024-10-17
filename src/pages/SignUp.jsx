import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message before new attempt
    setSuccess("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_Backend_Url}/admin/register`, {
        email,
        password,
      });
      alert("Signup successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect to the login page after successful signup
    } catch (err) {
      setError("Signup failed. Please try again."); // Handle any errors
    }
  };

  return (
    <div className="signup-container flex justify-center items-center">
      <div className="signup-box bg-slate-800 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4 text-center">Admin Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-900 text-white py-2 rounded"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
