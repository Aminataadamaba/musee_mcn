import React from 'react';
import { Bell, Globe, Moon, Sun, Map, Wifi, WifiOff, Info, User } from 'lucide-react';

// Vue Profil (améliorée)
  const ProfileView = () => (
    <div className={`${bgClass} p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textClass}`}>{t.profile}</h1>
        <button 
          onClick={() => setShowNotificationPanel(true)}
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Bell size={24} className={textClass} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
      </div>
      
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4">
          👤
        </div>
        <h2 className="text-xl font-bold">{t.visitor}</h2>
        <p className="text-orange-200 text-sm">{t.memberSince}</p>
      </div>

      <div className={`${cardClass} rounded-xl shadow-sm p-6 mb-6`}>
        <h3 className={`font-bold mb-4 ${textClass}`}>{t.statistics}</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.viewedArtworks}</span>
            <span className="font-bold text-purple-600">{visitHistory.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.favorites}</span>
            <span className="font-bold text-pink-600">{favorites.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.badges}</span>
            <span className="font-bold text-yellow-600">{badges.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.visitTime}</span>
            <span className="font-bold text-blue-600">25 min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.offlineReady}</span>
            <span className="font-bold text-green-600">{offlineContent.length}</span>
          </div>
        </div>
      </div>

      <div className={`${cardClass} rounded-xl shadow-sm p-6 space-y-4`}>
        <h3 className={`font-bold mb-4 ${textClass}`}>{t.settings}</h3>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-gray-500" />
            <span className={`${textClass}`}>{t.language}</span>
          </div>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              addNotification('success', 'Langue modifiée', `Interface en ${e.target.value === 'fr' ? 'Français' : e.target.value === 'en' ? 'English' : 'Wolof'}`);
            }}
            className={`border-2 ${borderClass} rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="wo">Wolof</option>
          </select>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={20} className="text-gray-500" /> : <Sun size={20} className="text-gray-500" />}
            <span className={`${textClass}`}>{t.darkMode}</span>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition ${
              darkMode ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition transform ${
              darkMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <button 
          onClick={() => setCurrentView('notificationSettings')}
          className="w-full flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-gray-500" />
            <span className={`${textClass}`}>{t.notifications}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${notificationsEnabled ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>
              {notificationsEnabled ? 'Activées' : 'Désactivées'}
            </span>
          </div>
        </button>

        <button 
          onClick={() => setCurrentView('map')}
          className="w-full flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <Map size={20} className="text-gray-500" />
          <span className={`${textClass}`}>{t.museuMap}</span>
        </button>

        <button 
          onClick={() => setCurrentView('history')}
          className="w-full flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <Clock size={20} className="text-gray-500" />
          <span className={`${textClass}`}>{t.visitHistory}</span>
        </button>

        <button className="w-full flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {isOnline ? <Wifi size={20} className="text-green-500" /> : <WifiOff size={20} className="text-orange-500" />}
            <span className={`${textClass}`}>{t.offlineMode}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${isOnline ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'}`}>
            {isOnline ? t.online : t.offline}
          </span>
        </button>

        <button 
          onClick={() => setCurrentView('about')}
          className="w-full flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <Info size={20} className="text-gray-500" />
          <span className={`${textClass}`}>{t.about}</span>
        </button>

        <button 
          onClick={() => {
            addNotification('info', 'Déconnexion', 'À bientôt !');
            setTimeout(() => {
              setCurrentView('home');
            }, 1000);
          }}
          className="w-full flex items-center gap-3 py-3 text-red-600"
        >
          <User size={20} />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );

export default ProfileView;
