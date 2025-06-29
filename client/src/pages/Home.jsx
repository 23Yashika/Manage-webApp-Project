import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useShortcuts from '../hooks/useShortcuts';

const CARD_SIZE = 'w-32 h-32'; // Made even smaller

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

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  if (loadingUser) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">User not found</div>;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#f9f1eb] via-[#f0edea] to-[#a9d7f9] font-['Roboto_Slab',serif] px-4 py-8"
      style={{ fontFamily: "'Roboto Slab', serif" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between max-w-6xl mx-auto mb-8 w-full">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">{user.fullName.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-extrabold text-[#1f2937]">{user.fullName}</span>
            <span className="text-[#2563eb] text-sm font-medium">@{user.username}</span>
          </div>
        </div>
        <button
          onClick={() => {
            setShowAdd((prev) => !prev);
            cancelEditing();
            setName('');
            setUrl('');
          }}
          className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-blue-700 hover:to-blue-800 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          title="Add Shortcut"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* Add/Edit Shortcut Form */}
      {(showAdd || editingId) && (
        <div className="max-w-4xl mx-auto mb-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter app name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              {editingId ? (
                <>
                  <button
                    onClick={() => {
                      cancelEditing();
                      setShowAdd(false);
                    }}
                    className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      editShortcut(editingId);
                      setShowAdd(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                    Update
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    addShortcut();
                    setShowAdd(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Shortcut
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shortcuts..."
            className="w-full rounded-2xl border border-gray-200 py-4 pl-6 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-200"
            type="search"
          />
          <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Shortcuts Grid */}
      <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 max-w-6xl mx-auto w-full">
        {shortcuts
          .filter((sc) => sc.name.toLowerCase().includes(search.toLowerCase()))
          .map((sc) => (
            <div
              key={sc._id}
              className={`bg-white/30 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center justify-center relative p-2 ${CARD_SIZE} transition-all duration-300 hover:shadow-2xl hover:scale-105 group border border-white/40`}
            >
              {/* Three Dots Menu */}
              <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setMenuOpenId(menuOpenId === sc._id ? null : sc._id)}
                  className="text-gray-400 hover:text-[#2563eb] p-1.5 rounded-full hover:bg-white/50 focus:outline-none transition-all duration-200"
                  aria-label="Open menu"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </button>
                {menuOpenId === sc._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-xl z-30 overflow-hidden">
                    <button
                      onClick={() => {
                        startEditing(sc);
                        setShowAdd(true);
                        setMenuOpenId(null);
                      }}
                      className="block w-full text-left px-4 py-3 text-[#2563eb] hover:bg-blue-50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="m18 2 4 4-12 12H6v-4L18 2z"></path>
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteShortcut(sc._id);
                        setMenuOpenId(null);
                      }}
                      className="block w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0 1-2,2H7a2,2 0 0 1-2-2V6m3,0V4a2,2 0 0 1,2-2h4a2,2 0 0 1,2,2v2"></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Shortcut Link */}
              <a
                href={sc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-200"
                title={sc.name}
              >
                {/* Shortcut Icon - Made bigger */}
                <div className="w-16 h-16 flex items-center justify-center mb-1">
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain_url=${sc.url}`}
                    alt={`${sc.name} icon`}
                    className="w-14 h-14 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-14 h-14 bg-[#2563eb] rounded-lg items-center justify-center text-white font-bold text-lg hidden">
                    {sc.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                {/* Shortcut Name */}
                <span className="text-xs font-medium text-[#1f2937] text-center leading-tight px-1 line-clamp-1">
                  {sc.name}
                </span>
              </a>
            </div>
          ))}
      </section>

      {/* Empty State */}
      {shortcuts.filter((sc) => sc.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No shortcuts found</h3>
          <p className="text-gray-500 mb-6">
            {search ? `No shortcuts match "${search}"` : 'Start by adding your first shortcut'}
          </p>
          {!showAdd && (
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Your First Shortcut
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;










