import React from 'react';
import { QrCode, MapPin, Download, WifiOff } from 'lucide-react';

const HomeView = ({ 
  theme,
  t,
  isOnline,
  offlineContent,
  badges,
  artworksDatabase,
  visitHistory,
  favorites,
  setScannerActive,
  setSelectedArtwork,
  setCurrentView 
}) => {
  const { bgClass, textClass, cardClass } = theme;
  
  return (
    <div className={`${bgClass} p-6 space-y-6`}>
      {/* Bannière de statut connexion */}
      {!isOnline && (
        <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg p-3 flex items-center gap-2">
          <WifiOff size={18} className="text-orange-600" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">{t.offline}</p>
            <p className="text-xs text-orange-600 dark:text-orange-400">{offlineContent.length} {t.downloaded}</p>
          </div>
        </div>
      )}

      {/* Hero Section avec logo MCN */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          {/* Logo MCN stylisé */}
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30 overflow-hidden">
            <img
              src="/musee_mcn/images/Logo.png"
              alt="Logo MCN"
              className="w-full h-full object-contain"
            />
          </div>
      
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{t.appName}</h1>
            <p className="text-xs text-white/80">Dakar, Sénégal</p>
          </div>
        </div>
        <p className="text-white/90 mb-4 text-sm">{t.explore}</p>
        <button
          onClick={() => setScannerActive(true)}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-50 transition"
        >
          <QrCode size={20} />
          {t.scanQR}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`${cardClass} p-4 rounded-xl text-center shadow-sm`}>
          <div className="text-2xl font-bold text-blue-600">{Object.keys(artworksDatabase).length}</div>
          <div className="text-xs text-blue-600 mt-1">{t.artworks}</div>
        </div>
        <div className={`${cardClass} p-4 rounded-xl text-center shadow-sm`}>
          <div className="text-2xl font-bold text-green-600">{visitHistory.length}</div>
          <div className="text-xs text-green-600 mt-1">{t.visited}</div>
        </div>
        <div className={`${cardClass} p-4 rounded-xl text-center shadow-sm`}>
          <div className="text-2xl font-bold text-pink-600">{favorites.length}</div>
          <div className="text-xs text-pink-600 mt-1">{t.favorites}</div>
        </div>
      </div>

      {/* Badges récents */}
      {badges.length > 0 && (
        <div className={`${cardClass} rounded-xl p-4 shadow-sm`}>
          <h3 className={`font-bold mb-3 ${textClass}`}>{t.badges}</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {badges.map(badge => (
              <div key={badge.id} className="flex-shrink-0 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {badge.icon}
                </div>
                <p className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collections en vedette */}
      <div>
        <h2 className={`text-xl font-bold mb-4 ${textClass}`}>{t.featured}</h2>
        <div className="space-y-3">
          {Object.values(artworksDatabase).map((artwork) => (
            <div
              key={artwork.id}
              onClick={() => {
                setSelectedArtwork(artwork);
                setCurrentView('artwork');
              }}
              className={`${cardClass} rounded-xl shadow-sm overflow-hidden flex gap-4 cursor-pointer hover:shadow-md transition`}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 py-3 pr-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-bold ${textClass}`}>{artwork.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{artwork.artist}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                      <MapPin size={12} />
                      <span>{artwork.location}</span>
                    </div>
                  </div>
                  {artwork.offlineAvailable && (
                    <Download size={16} className="text-green-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historique récent */}
      {visitHistory.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold mb-4 ${textClass}`}>{t.recent}</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {visitHistory.map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => {
                  setSelectedArtwork(artwork);
                  setCurrentView('artwork');
                }}
                className="flex-shrink-0 w-32 cursor-pointer"
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-32 h-32 object-cover rounded-lg mb-2 shadow-sm"
                />
                <p className={`text-xs font-semibold truncate ${textClass}`}>{artwork.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeView;