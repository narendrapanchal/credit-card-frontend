import React, { useContext, useState } from "react";
import axios from "axios"; // To make HTTP requests
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_Backend_Url}/admin/login`, {
        email,
        password,
      });
      const token = response.data.token;
      handleLogin(token);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="login-container flex justify-center items-center ">
      <div className="login-box bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              data-test="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)] p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              data-test="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gradient-to-r from-[rgb(30,41,59)] to-[rgb(75,85,99)]   p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            data-test="login-button"
            className="w-full bg-slate-600 hover:bg-slate-900 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
        {/* <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400">
            Sign up here
          </Link>
          .
        </p> */}
      </div>
    </div>
  );
};

export default Login;
