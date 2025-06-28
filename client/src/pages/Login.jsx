import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
  const { username, setUsername, login, error } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome back to <span className="text-yellow-300">WebSnap! 🔥</span></h1>
      <p className="mb-6 italic">"Your funky shortcut world awaits!"</p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-3 px-4 py-2 rounded text-black"
      />
      {error && <p className="text-red-200 italic">{error}</p>}
      <button onClick={login} className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-400 transition">
        Login 🚀
      </button>
      <p className="mt-4">Don't have an account? <Link to="/register" className="underline">Register now 🔥</Link></p>
    </div>
  );
};
export default Login;