import React from 'react';

const MemoryGameView = () => (
    <div className={`${bgClass} min-h-screen p-6`}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => { setCurrentGame(null); setCurrentView('games'); }}>
          <X size={24} />
        </button>
        <h2 className={`text-xl font-bold ${textClass}`}>{t.memoryGame}</h2>
        <div className="text-blue-600 font-bold">{matchedCards.length / 2}/{memoryCards.length / 2}</div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {memoryCards.map((card) => {
          const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id);
          
          return (
            <div key={card.id} onClick={() => handleCardClick(card.id)} className="aspect-square cursor-pointer">
              <div className={`w-full h-full rounded-lg flex items-center justify-center ${
                isFlipped ? 'bg-white' : 'bg-gradient-to-br from-purple-500 to-indigo-500'
              }`}>
                {isFlipped ? (
                  <img src={card.image} alt="Carte" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <span className="text-4xl">❓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

export default MemoryGameView;
