import { useEffect, useState } from 'react';

const useShortcuts = (userId) => {
  const [shortcuts, setShortcuts] = useState([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    if (!userId) return;

    try {
      setLoadingUser(true);
      setError(null);

      const [userResponse, shortcutsResponse] = await Promise.all([
        fetch(`https://manage-webapp-project.onrender.com/api/auth/${userId}`),
        fetch(`https://manage-webapp-project.onrender.com/api/shortcuts/${userId}`)
      ]);

      if (!userResponse.ok) throw new Error('Failed to fetch user');
      if (!shortcutsResponse.ok) throw new Error('Failed to fetch shortcuts');

      const userData = await userResponse.json();
      const shortcutsData = await shortcutsResponse.json();

      setUser(userData);
      setShortcuts(shortcutsData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoadingUser(false);
    }
  };

  const addShortcut = async () => {
    if (!name || !url) return;
    try {
      const response = await fetch('https://manage-webapp-project.onrender.com/api/shortcuts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, url, userId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add shortcut');
      }

      setName('');
      setUrl('');
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteShortcut = async (id) => {
    try {
      const response = await fetch(`https://manage-webapp-project.onrender.com/api/shortcuts/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete shortcut');
      }

      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEditing = (shortcut) => {
    setEditingId(shortcut._id); // 👈 used by Update button
    setName(shortcut.name);
    setUrl(shortcut.url);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setName('');
    setUrl('');
  };

  const editShortcut = async (id) => {
    if (!name || !url) return;
    try {
      const response = await fetch(`https://manage-webapp-project.onrender.com/api/shortcuts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, url })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update shortcut');
      }

      cancelEditing(); // reset form + editingId
      await fetchData(); // reload shortcuts
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  return {
    user,
    loadingUser,
    error,
    shortcuts,
    name,
    setName,
    url,
    setUrl,
    search,
    setSearch,
    addShortcut,
    deleteShortcut,
    editShortcut,
    startEditing,
    cancelEditing,
    editingId, 
  };
};

export default useShortcuts;
