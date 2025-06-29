import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Login = () => {
  const { username, setUsername, login, error } = useAuth();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f9f1eb] via-[#f0edea] to-[#a9d7f9] font-['Roboto_Slab',serif] px-4"
      style={{ fontFamily: "'Roboto Slab', serif" }}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-[#1f2937] mb-3">
          Welcome Back to <span className="text-[#2563eb]">WebSnap!</span>
        </h1>
        <p className="mb-6 italic text-base text-gray-500 text-center">
          "Your funky shortcut world awaits!"
        </p>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-4 px-4 py-3 rounded-md border border-gray-300 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] transition"
        />

        {error && (
          <p className="text-red-500 font-semibold mb-4 text-sm">{error}</p>
        )}

        <button
          onClick={login}
          className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all duration-200 shadow hover:shadow-blue-200 hover:scale-105"
        >
          Login 🚀
        </button>

        <p className="mt-6 text-sm text-gray-700">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-[#2563eb] underline hover:text-blue-700 transition font-semibold"
          >
            Register now 🔥
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
