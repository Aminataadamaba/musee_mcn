
   // Base de données de questions pour le quiz
 const quizQuestions = [
    {
      id: 1,
      question: "Qui a peint 'La Nuit Étoilée' ?",
      options: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Salvador Dalí"],
      correctAnswer: 0,
      artwork: 'QR001'
    },
    {
      id: 2,
      question: "En quelle année la Joconde a-t-elle été peinte ?",
      options: ["1500-1510", "1503-1519", "1520-1530", "1490-1500"],
      correctAnswer: 1,
      artwork: 'QR002'
    },
    {
      id: 3,
      question: "Qui a sculpté 'Le Penseur' ?",
      options: ["Michel-Ange", "Donatello", "Auguste Rodin", "Bernini"],
      correctAnswer: 2,
      artwork: 'QR003'
    }
  ];
   useEffect(() => {
    const offline = Object.values(artworksDatabase).filter(art => art.offlineAvailable);
    setOfflineContent(offline);
  }, []);
 
   const GamesView = () => (
      <div className={`${bgClass} p-6 pb-24`}>
        <h1 className={`text-2xl font-bold mb-6 ${textClass}`}>{t.games}</h1>
        
        <div className={`${cardClass} rounded-xl p-4 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">{t.score} Total</p>
              <p className="text-3xl font-bold text-purple-600">{gameScore}</p>
            </div>
            <div className="text-5xl">🏆</div>
          </div>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div onClick={startQuiz} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
            <div className="text-5xl mb-3">🎯</div>
            <h3 className={`font-bold mb-2 ${textClass}`}>{t.quiz}</h3>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
              {t.play}
            </button>
          </div>
  
          <div onClick={startMemoryGame} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
            <div className="text-5xl mb-3">🧠</div>
            <h3 className={`font-bold mb-2 ${textClass}`}>{t.memoryGame}</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
              {t.play}
            </button>
          </div>
  
          <div onClick={startTreasureHunt} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
            <div className="text-5xl mb-3">🗺️</div>
            <h3 className={`font-bold mb-2 ${textClass}`}>{t.treasureHunt}</h3>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
              {t.play}
            </button>
          </div>
        </div>
      </div>
    );
  const QuizView = () => {
      if (!quizData) return null;
      const currentQuestion = quizData[currentQuestionIndex];
  
      if (showQuizResult) {
        return (
          <div className={`${bgClass} min-h-screen p-6 flex items-center justify-center`}>
            <div className={`${cardClass} rounded-xl p-8 text-center`}>
              <div className="text-6xl mb-4">🏆</div>
              <h2 className={`text-2xl font-bold mb-2 ${textClass}`}>{t.yourScore}</h2>
              <p className="text-5xl font-bold text-purple-600 mb-4">{quizScore}/{quizData.length}</p>
              <button onClick={startQuiz} className="bg-purple-600 text-white py-3 px-6 rounded-lg mb-2">
                {t.playAgain}
              </button>
              <button onClick={() => { setCurrentGame(null); setCurrentView('games'); }} className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg">
                Retour
              </button>
            </div>
          </div>
        );
      }
  
      return (
        <div className={`${bgClass} min-h-screen p-6`}>
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => { setCurrentGame(null); setCurrentView('games'); }}>
              <X size={24} />
            </button>
            <div>{t.question} {currentQuestionIndex + 1}/{quizData.length}</div>
            <div className="text-purple-600 font-bold">{quizScore} pts</div>
          </div>
  
          <div className={`${cardClass} rounded-xl p-6`}>
            <h2 className={`text-xl font-bold mb-6 ${textClass}`}>{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = selectedAnswer !== null;
  
                return (
                  <button
                    key={index}
                    onClick={() => !showResult && checkAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg text-left ${
                      showResult
                        ? isCorrect ? 'bg-green-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-gray-100'
                        : `${cardClass} border-2 ${borderClass}`
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      );
    };
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