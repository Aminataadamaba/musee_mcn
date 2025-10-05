import React from 'react';
import { Heart, FileText } from 'lucide-react';

const FavoritesView = ({ 
  theme,
  t,
  favorites,
  exportFavorites,
  setSelectedArtwork,
  setCurrentView 
}) => {
  const { bgClass, textClass, cardClass } = theme;
  
  return (
    <div className={`${bgClass} p-6 pb-24`}>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-2xl font-bold ${textClass}`}>{t.myFavorites}</h1>
        {favorites.length > 0 && (
          <button
            onClick={exportFavorites}
            className="text-purple-600 p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition"
          >
            <FileText size={20} />
          </button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">{t.noFavorites}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{t.addFavorites}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((artwork) => (
            <div
              key={artwork.id}
              onClick={() => {
                setSelectedArtwork(artwork);
                setCurrentView('artwork');
              }}
              className={`${cardClass} rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition relative`}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-40 object-cover"
              />
              <Heart
                size={20}
                fill="red"
                color="red"
                className="absolute top-2 right-2"
              />
              <div className="p-3">
                <h3 className={`font-bold text-sm truncate ${textClass}`}>{artwork.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{artwork.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;