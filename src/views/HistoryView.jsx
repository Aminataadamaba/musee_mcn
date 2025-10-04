import React from 'react';
import { X, Clock, Calendar } from 'lucide-react';

  // Vue Historique détaillé
  const HistoryView = () => (
    <div className={`${bgClass} p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textClass}`}>{t.visitHistory}</h1>
        <button onClick={() => setCurrentView('profile')} className="text-purple-600">
          <X size={24} />
        </button>
      </div>

      {detailedHistory.length === 0 ? (
        <div className="text-center py-12">
          <Clock size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucune visite enregistrée</p>
        </div>
      ) : (
        <div className="space-y-3">
          {detailedHistory.map((item, index) => (
            <div
              key={item.timestamp}
              onClick={() => {
                setSelectedArtwork(item.artwork);
                setCurrentView('artwork');
              }}
              className={`${cardClass} rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition`}
            >
              <div className="flex gap-4">
                <img
                  src={item.artwork.image}
                  alt={item.artwork.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className={`font-bold ${textClass}`}>{item.artwork.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.artwork.artist}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
export default HistoryView;
