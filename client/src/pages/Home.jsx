import React from 'react';
import { useParams } from 'react-router-dom';
import useShortcuts from '../hooks/useShortcuts';

const Home = () => {
  const { userId } = useParams();
  const {
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
  } = useShortcuts(userId);

  if (loadingUser) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">User not found</div>;

  return (
    <div className="min-h-screen bg-slate-100 text-center p-8">
      <h1 className="text-3xl font-bold">
        Hello, <span className="text-purple-600">{user.fullName}</span> 👋
      </h1>
      <p className="mb-4 text-gray-600">Username: @{user.username}</p>

      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="WebApp Name"
          className="px-4 py-2 rounded border"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="px-4 py-2 rounded border"
        />
        {editingId ? (
          <>
            <button
              onClick={() => editShortcut(editingId)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Update ✅
            </button>
            <button
              onClick={cancelEditing}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel ❌
            </button>
          </>
        ) : (
          <button
            onClick={addShortcut}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Add ➕
          </button>
        )}
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        
        placeholder="Search..."
        className="px-4 py-2 mb-4 rounded border"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shortcuts
          .filter((sc) => sc.name.toLowerCase().includes(search.toLowerCase()))
          .map((sc) => (
            <div
              key={sc._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold">{sc.name}</h2>
              <a
                href={sc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline block mt-2"
              >
                Visit 🌐
              </a>
              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={() => startEditing(sc)}
                  className="text-blue-500 hover:underline"
                >
                  Edit ✏️
                </button>
                <button
                  onClick={() => deleteShortcut(sc._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete ❌
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
