import React from 'react';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Register = () => {
  const { fullName, setFullName, username, setUsername, register, error } = useAuth();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-bl from-yellow-300 via-pink-400 to-purple-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Join the <span className="text-black">WebSnap! 🎉</span></h1>
      <p className="mb-6 italic">"Snap your shortcuts in one click!"</p>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
        className="mb-3 px-4 py-2 rounded text-black"
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="mb-3 px-4 py-2 rounded text-black"
      />
      {error && <p className="text-red-200 italic">{error}</p>}
      <button onClick={register} className="bg-black text-yellow-300 px-4 py-2 rounded hover:bg-gray-900 transition">
        Register 🎯
      </button>
      <p className="mt-4">Already a Snapper? <Link to="/login" className="underline">Login now 🚀</Link></p>
    </div>
  );
};
export default Register;
