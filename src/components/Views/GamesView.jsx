import React from 'react';

const GamesView = ({ 
  theme,
  t,
  gameScore,
  startQuiz,
  startMemoryGame,
  startTreasureHunt 
}) => {
  const { bgClass, textClass, cardClass } = theme;
  
  return (
    <div className={`${bgClass} p-6 pb-24`}>
      <h1 className={`text-2xl font-bold mb-6 ${textClass}`}>Jeux Interactifs</h1>
      
      <div className={`${cardClass} rounded-xl p-4 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Score Total</p>
            <p className="text-3xl font-bold text-purple-600">{gameScore}</p>
          </div>
          <div className="text-5xl">🏆</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div onClick={startQuiz} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
          <div className="text-5xl mb-3">🎯</div>
          <h3 className={`font-bold mb-2 ${textClass}`}>Quiz Art</h3>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
            Jouer
          </button>
        </div>

        <div onClick={startMemoryGame} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
          <div className="text-5xl mb-3">🧠</div>
          <h3 className={`font-bold mb-2 ${textClass}`}>Mémoire</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Jouer
          </button>
        </div>

        <div onClick={startTreasureHunt} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
          <div className="text-5xl mb-3">🗺️</div>
          <h3 className={`font-bold mb-2 ${textClass}`}>Chasse au Trésor</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            Jouer
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesView;