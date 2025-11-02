import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// J'ai besoin d'importer les composants UserAuth et Dashboard, etc.
// En se basant sur la structure probable d'un projet React
import UserAuth from './components/UserAuth'; 
import UserDashboard from './components/UserDashboard';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import FloatingInstallButton from './components/FloatingInstallButton';
// L'importation de SendMessage est basée sur votre ancien fichier App.js
import SendMessage from './pages/SendMessage'; 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérification de l'utilisateur stocké localement et enregistrement du Service Worker
    checkUser();
    registerServiceWorker();
  }, []);

  const checkUser = async () => {
    try {
      // Utilisation de localStorage pour la persistance de session utilisateur
      const savedUser = localStorage.getItem('secretStory_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'utilisateur:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        // Le chemin du Service Worker doit être à la racine de l'application
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker enregistré avec succès');
      } catch (error) {
        console.log("L'enregistrement du Service Worker a échoué : ", error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('secretStory_user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600 flex items-center justify-center">
        <div className="text-white text-3xl font-bold animate-pulse">
          Chargement...
        </div>
      </div>
    );
  }

  // Composant d'affichage de l'application pour les utilisateurs connectés
  const AppLayout = () => (
    <>
      <PWAInstallPrompt />
      <FloatingInstallButton />

      {/* Header conditionnel pour l'utilisateur connecté, maintenant FIXE en haut */}
      <header className="fixed top-0 left-0 w-full z-10 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-purple-600 font-bold text-lg">🕵️</span>
              </div>
              <h1 className="text-white text-xl font-bold">SecretStory</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white/80 hidden sm:inline">@{user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-md text-sm sm:text-base"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content avec padding pour éviter que le contenu soit caché par le header fixe */}
      <main className="pt-20 pb-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Routes du tableau de bord */}
          <Routes>
            {/* Route par défaut pour l'utilisateur connecté */}
            <Route path="/" element={<UserDashboard user={user} />} />
            
            {/* Fallback : si l'utilisateur est connecté et accède à une autre route non gérée */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </>
  );

  // Définition principale du routage
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-pink-600">
      <BrowserRouter>
        <Routes>
          {/* 1. ROUTE PUBLIQUE ET CRITIQUE : Cette route doit toujours être définie en premier */}
          {/* Elle gère le lien de partage : votresite.com/mastermind -> SendMessage */}
          {/* C'est la ligne qui corrige l'écran blanc en production */}
          <Route path="/:username" element={<SendMessage />} />

          {/* 2. ROUTE DE CONNEXION / TABLEAU DE BORD (catch-all pour le reste) */}
          {/* Gère la racine (/) et toutes les autres routes non définies par le paramètre dynamique. */}
          <Route 
            path="*" 
            element={user ? <AppLayout /> : <UserAuth setUser={setUser} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
