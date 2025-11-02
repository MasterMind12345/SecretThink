// src/pages/SendToUser.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SendToUser = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/send/${username.trim().toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Envoyer un message anonyme
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Entre le nom d'utilisateur de la personne
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Nom d'utilisateur :
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Exemple: marie23"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🕵️‍♀️ Continuer
          </button>
        </form>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800 text-center">
            🔒 Ton identité restera totalement secrète
          </p>
        </div>
      </div>
    </div>
  );
};

export default SendToUser;