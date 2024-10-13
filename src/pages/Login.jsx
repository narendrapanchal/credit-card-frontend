import React, { useContext, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const Login = () => {
  const {handleLogin}=useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before new attempt

    try {
      const response = await axios.post('https://credit-card-backend-hy1u.onrender.com/admin/login', {
        email,
        password
      });
      const token =await response.data.token;
      handleLogin(token)
      localStorage.setItem('token', token); // Save token in local storage
      alert('Login successful! '+token);
     setTimeout(()=>{
      navigate('/');
     },2000) // Redirect to the home page or dashboard
    } catch (err) {
      setError('Invalid email or password'); // Display error if login fails
    }
  };

  return (
    <div className="login-container flex justify-center items-center ">
      <div className="login-box bg-slate-800 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-400">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
