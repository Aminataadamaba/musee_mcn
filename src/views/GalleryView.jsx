import React from 'react';
import { Search } from 'lucide-react';

const GalleryView = ({ t, bgClass, cardClass, textClass }) => (
   <div className={`${bgClass} p-6 pb-24`}>
      <h1 className={`text-2xl font-bold mb-4 ${textClass}`}>{t.gallery}</h1>
      
      <div className="mb-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border-2 ${borderClass} rounded-lg focus:border-purple-500 focus:outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
          />
        </div>
        
        {/* Filtres par catégorie */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
              categoryFilter === 'all' 
                ? 'bg-purple-600 text-white' 
                : `${cardClass} ${textClass}`
            }`}
          >
            {t.all}
          </button>
          <button
            onClick={() => setCategoryFilter('Peinture')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
              categoryFilter === 'Peinture' 
                ? 'bg-purple-600 text-white' 
                : `${cardClass} ${textClass}`
            }`}
          >
            {t.paintings}
          </button>
          <button
            onClick={() => setCategoryFilter('Sculpture')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
              categoryFilter === 'Sculpture' 
                ? 'bg-purple-600 text-white' 
                : `${cardClass} ${textClass}`
            }`}
          >
            {t.sculptures}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredArtworks.map((artwork) => (
          <div
            key={artwork.id}
            onClick={() => {
              setSelectedArtwork(artwork);
              setCurrentView('artwork');
            }}
            className={`${cardClass} rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition`}
          >
            <div className="relative">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-40 object-cover"
              />
              {artwork.offlineAvailable && (
                <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                  <Download size={14} />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className={`font-bold text-sm truncate ${textClass}`}>{artwork.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{artwork.artist}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{artwork.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
);

export default GalleryView;
