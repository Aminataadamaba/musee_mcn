import React from 'react';

  const TreasureHuntView = () => {
    const treasures = [
      { id: 1, artwork: 'QR001', clue: "Je suis peinte avec des étoiles tourbillonnantes...", found: treasureHuntProgress >= 1 },
      { id: 2, artwork: 'QR002', clue: "Mon sourire énigmatique est célèbre...", found: treasureHuntProgress >= 2 },
      { id: 3, artwork: 'QR003', clue: "Je suis une sculpture en bronze...", found: treasureHuntProgress >= 3 }
    ];

    const findTreasure = (artworkId) => {
      setTreasureHuntProgress(treasureHuntProgress + 1);
      addNotification('success', 'Trésor trouvé !', '+50 points');
      setGameScore(gameScore + 50);
    };

    return (
      <div className={`${bgClass} min-h-screen p-6 pb-24`}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => { setCurrentGame(null); setCurrentView('games'); }}>
            <X size={24} />
          </button>
          <h2 className={`text-xl font-bold ${textClass}`}>{t.treasureHunt}</h2>
          <div className="text-green-600 font-bold">{treasureHuntProgress}/3</div>
        </div>

        <div className="space-y-4">
          {treasures.map((treasure) => (
            <div key={treasure.id} className={`${cardClass} rounded-xl p-4 ${treasure.found ? 'opacity-50' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="text-4xl">{treasure.found ? '✅' : '🗺️'}</div>
                <div className="flex-1">
                  <h3 className={`font-bold mb-2 ${textClass}`}>
                    {treasure.found ? `${t.found} !` : `${t.clue} ${treasure.id}`}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{treasure.clue}</p>
                  {!treasure.found && (
                    <button onClick={() => findTreasure(treasure.artwork)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
                      {t.findArtwork}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default TreasureHuntView;
