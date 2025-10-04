import React from 'react';

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
export default QuizView;
