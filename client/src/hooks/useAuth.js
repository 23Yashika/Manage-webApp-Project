import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || errData.error || 'Registration failed');
      }

      const user = await res.json();
      setUser(user);
      navigate('/'); // ✅ fixed
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || errData.error || 'Login failed');
      }

      const user = await res.json();
      setUser(user);
      navigate(`/home/${user._id}`); // ✅ fixed
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    username,
    setUsername,
    user,
    error,
    loading,
    register,
    login
  };
};

export default useAuth;
