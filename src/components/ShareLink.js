import React, { useState } from 'react';

const ShareLink = ({ user }) => {
  const shareUrl = `${window.location.origin}/send`;
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocialMedia = (platform) => {
    const text = `Envoie-moi un message anonyme sur SecretStory ! 🕵️‍♀️ Clique sur le lien et entre mon nom: ${user.username}`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + shareUrl)}`,
      instagram: `https://www.instagram.com/direct/inbox/`,
    };
    
    if (platform === 'instagram') {
      // Pour Instagram, on donne juste le texte à copier
      navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Partage ton lien
        </h2>
        <p className="text-white/70">
          Partage ce lien pour recevoir des messages anonymes
        </p>
      </div>

      {/* Lien partageable */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <label className="block text-white/70 text-sm font-medium mb-3">
          Ton lien SecretStory :
        </label>
        <div className="flex space-x-3">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
          />
          <button
            onClick={copyToClipboard}
            className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2 min-w-0"
          >
            {copied ? '✅ Copié!' : '📋 Copier'}
          </button>
        </div>
        <p className="text-white/50 text-xs mt-2 text-center">
          Les gens cliqueront sur ce lien et entreront ton nom: <strong>@{user.username}</strong>
        </p>
      </div>

      {/* Partage rapide */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-semibold mb-4">Partager rapidement</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { platform: 'whatsapp', name: 'WhatsApp', color: 'bg-green-500 hover:bg-green-600', icon: '📱' },
            { platform: 'telegram', name: 'Telegram', color: 'bg-blue-500 hover:bg-blue-600', icon: '✈️' },
            { platform: 'twitter', name: 'Twitter', color: 'bg-sky-500 hover:bg-sky-600', icon: '🐦' },
            { platform: 'instagram', name: 'Instagram', color: 'bg-pink-500 hover:bg-pink-600', icon: '📸' },
          ].map(({ platform, name, color, icon }) => (
            <button
              key={platform}
              onClick={() => shareOnSocialMedia(platform)}
              className={`${color} text-white py-3 rounded-xl font-medium transition-all duration-200 flex flex-col items-center space-y-1`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-xs">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bouton copier en grand */}
      <button
        onClick={copyToClipboard}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <span>📋</span>
        <span>{copied ? 'Lien Copié !' : 'Copier le Lien'}</span>
      </button>

      {/* Instructions */}
      <div className="bg-yellow-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-400 text-xl">💡</div>
          <div>
            <h4 className="text-yellow-400 font-semibold mb-2">Comment ça marche ?</h4>
            <ul className="text-yellow-300/80 text-sm space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Partage le lien avec tes amis</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Ils cliquent et entrent ton nom: <strong>@{user.username}</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Ils envoient un message anonyme</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Tu reçois le message dans ton tableau de bord</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conseils de partage */}
      <div className="bg-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
        <div className="flex items-start space-x-3">
          <div className="text-purple-400 text-xl">🌟</div>
          <div>
            <h4 className="text-purple-400 font-semibold mb-2">Idées de partage</h4>
            <ul className="text-purple-300/80 text-sm space-y-1">
              <li>• Dans ta bio Instagram/TikTok</li>
              <li>• Sur tes stories avec "Demandez-moi anonymement"</li>
              <li>• Dans les groupes WhatsApp/Facebook</li>
              <li>• Par SMS à tes proches</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareLink;