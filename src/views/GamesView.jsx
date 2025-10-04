import React from 'react';

const GamesView = ({ t, setCurrentGame }) => (
  <div className="p-6 pb-24">
    <h1 className="text-2xl font-bold mb-6">{t.games}</h1>
    <div className="space-y-4">
      <button onClick={() => setCurrentGame('quiz')} className="w-full py-3 bg-purple-600 text-white rounded-lg">{t.quiz}</button>
      <button onClick={() => setCurrentGame('memory')} className="w-full py-3 bg-green-600 text-white rounded-lg">{t.memoryGame}</button>
      <button onClick={() => setCurrentGame('treasure')} className="w-full py-3 bg-orange-600 text-white rounded-lg">{t.treasureHunt}</button>
    </div>
  </div>
);

export default GamesView;
