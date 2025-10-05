import React from 'react';
import { Home, Search, Heart, User, QrCode } from 'lucide-react';

const BottomNavigation = ({ 
  currentView, 
  setCurrentView, 
  setScannerActive, 
  favorites, 
  notifications, 
  t,
  theme 
}) => {
  const { cardClass, borderClass } = theme;
  
  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${cardClass} border-t ${borderClass} max-w-md mx-auto`}>
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${
            currentView === 'home' ? 'text-purple-600' : 'text-gray-400'
          }`}
        >
          <Home size={24} />
          <span className="text-xs">{t.home}</span>
        </button>
        
        <button
          onClick={() => setCurrentView('gallery')}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${
            currentView === 'gallery' ? 'text-purple-600' : 'text-gray-400'
          }`}
        >
          <Search size={24} />
          <span className="text-xs">{t.gallery}</span>
        </button>
        
        <button
          onClick={() => setScannerActive(true)}
          className="flex flex-col items-center gap-1 px-4 py-2 -mt-6"
        >
          <div className="bg-purple-600 text-white p-4 rounded-full shadow-lg">
            <QrCode size={24} />
          </div>
        </button>
        
        <button
          onClick={() => setCurrentView('favorites')}
          className={`flex flex-col items-center gap-1 px-4 py-2 relative ${
            currentView === 'favorites' ? 'text-purple-600' : 'text-gray-400'
          }`}
        >
          <Heart size={24} />
          <span className="text-xs">{t.favorites}</span>
          {favorites.length > 0 && (
            <span className="absolute top-1 right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {favorites.length}
            </span>
          )}
        </button>
        
        <button
          onClick={() => { setCurrentView('games'); }}
          className={`flex flex-col items-center gap-1 px-4 py-2 ${
            currentView === 'games' ? 'text-purple-600' : 'text-gray-400'
          }`}
        >
          <span className="text-2xl">🎮</span>
          <span className="text-xs">Jeux</span>
        </button>
        
        <button
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center gap-1 px-4 py-2 relative ${
            currentView === 'profile' ? 'text-purple-600' : 'text-gray-400'
          }`}
        >
          <User size={24} />
          <span className="text-xs">{t.profile}</span>
          {notifications.length > 0 && (
            <span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notifications.length > 9 ? '9+' : notifications.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default BottomNavigation;