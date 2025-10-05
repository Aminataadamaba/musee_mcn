import React, { useState, useEffect } from 'react';
import './styles/animations.css';

// Imports des données
import { translations } from './data/translations';
import { artworksDatabase } from './data/artworksDatabase';
import { quizQuestions } from './data/quizData';

// Imports des hooks personnalisés
import { useLocalStorage, useOnlineStatus, useNotifications, useTheme } from './hooks/useLocalStorage';

// Imports des utilitaires
import { getSimilarArtworks, filterArtworks, isFavorite } from './utils/helpers';

// Imports des composants communs
import NotificationToast from './components/Common/NotificationToast';
import BottomNavigation from './components/Common/BottomNavigation';

// Imports des vues
import HomeView from './components/Views/HomeView';
import ScannerView from './components/Views/ScannerView';
import GalleryView from './components/Views/GalleryView';
import FavoritesView from './components/Views/FavoritesView';
import ProfileView from './components/Views/ProfileView';
import GamesView from './components/Views/GamesView';
import ArtworkView from './components/Views/ArtworkView';

// Imports des jeux
import QuizView from './components/Games/QuizView';
import MemoryGameView from './components/Games/MemoryGameView';

// Imports des modales
import ShareModal from './components/Modals/ShareModal';
import ImageZoomModal from './components/Modals/ImageZoomModal';
import NotificationPanel from './components/Modals/NotificationPanel';

const App = () => {
  // États principaux
  const [currentView, setCurrentView] = useState('home');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [scannerActive, setScannerActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useLocalStorage('language', 'fr');
  const [visitHistory, setVisitHistory] = useLocalStorage('visitHistory', []);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // États pour les jeux et quiz
  const [gameScore, setGameScore] = useLocalStorage('gameScore', 0);
  const [currentGame, setCurrentGame] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [treasureHuntProgress, setTreasureHuntProgress] = useState(0);

  // États audio/vidéo
  const [audioVolume, setAudioVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  // États pour les commentaires et modales
  const [comments, setComments] = useLocalStorage('comments', {});
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  
  // États pour les badges et historique
  const [badges, setBadges] = useState([]);
  const [detailedHistory, setDetailedHistory] = useLocalStorage('detailedHistory', []);
  const [offlineContent, setOfflineContent] = useState([]);
  
  // Hooks personnalisés
  const isOnline = useOnlineStatus();
  const { notifications, notificationsEnabled, setNotificationsEnabled, addNotification } = useNotifications();
  const { darkMode, setDarkMode, theme } = useTheme();
  
  const t = translations[language];

  // Charger le contenu hors ligne
  useEffect(() => {
    const offline = Object.values(artworksDatabase).filter(art => art.offlineAvailable);
    setOfflineContent(offline);
  }, []);

  // Système de badges
  useEffect(() => {
    const newBadges = [];
    if (visitHistory.length >= 1) newBadges.push({ id: 'first', name: 'Première découverte', icon: '🎯' });
    if (visitHistory.length >= 3) newBadges.push({ id: 'explorer', name: 'Explorateur', icon: '🗺️' });
    if (favorites.length >= 2) newBadges.push({ id: 'collector', name: 'Collectionneur', icon: '⭐' });
    if (Object.keys(comments).length >= 1) newBadges.push({ id: 'critic', name: 'Critique d\'art', icon: '✍️' });
    setBadges(newBadges);
  }, [visitHistory, favorites, comments]);

  // Détection de la connexion internet
  useEffect(() => {
    if (isOnline) {
      addNotification('success', t.online, 'Connexion rétablie');
    } else {
      addNotification('warning', t.offline, 'Mode hors ligne activé');
    }
  }, [isOnline, language]);

  // Simuler le scan avec historique détaillé
  const simulateQRScan = (qrCode) => {
    const artwork = artworksDatabase[qrCode];
    if (artwork) {
      setSelectedArtwork(artwork);
      setCurrentView('artwork');
      setScannerActive(false);
      
      if (!visitHistory.find(item => item.id === artwork.id)) {
        setVisitHistory([...visitHistory, artwork]);
        addNotification('success', 'Nouvelle découverte !', `Vous avez scanné "${artwork.title}"`);
      }
      
      // Ajouter à l'historique détaillé avec date/heure
      setDetailedHistory(prev => [{
        artwork,
        date: new Date().toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US'),
        timestamp: Date.now()
      }, ...prev]);
    }
  };

  // Toggle favorite
  const toggleFavorite = (artwork) => {
    if (favorites.find(fav => fav.id === artwork.id)) {
      setFavorites(favorites.filter(fav => fav.id !== artwork.id));
      addNotification('info', 'Favori retiré', `"${artwork.title}" a été retiré de vos favoris`);
    } else {
      setFavorites([...favorites, artwork]);
      addNotification('success', 'Ajouté aux favoris', `"${artwork.title}" a été ajouté à vos favoris`);
    }
  };

  // Fonctions de jeu
  const startQuiz = () => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setQuizData(shuffled);
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setCurrentGame('quiz');
  };

  const checkAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === quizData[currentQuestionIndex].correctAnswer;
    
    if (isCorrect) {
      setQuizScore(quizScore + 1);
      addNotification('success', 'Bonne réponse!', '+10 points');
      setGameScore(gameScore + 10);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowQuizResult(true);
      }
    }, 1500);
  };
  
  const startMemoryGame = () => {
    const artworks = Object.values(artworksDatabase);
    const cards = [];
    
    artworks.slice(0, 6).forEach((artwork, index) => {
      cards.push({ id: index * 2, artworkId: artwork.id, image: artwork.image });
      cards.push({ id: index * 2 + 1, artworkId: artwork.id, image: artwork.image });
    });
    
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    setCurrentGame('memory');
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const card1 = memoryCards.find(c => c.id === newFlipped[0]);
      const card2 = memoryCards.find(c => c.id === newFlipped[1]);

      if (card1.artworkId === card2.artworkId) {
        setMatchedCards([...matchedCards, newFlipped[0], newFlipped[1]]);
        addNotification('success', 'Paire trouvée !', '+20 points');
        setGameScore(gameScore + 20);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const startTreasureHunt = () => {
    setTreasureHuntProgress(0);
    setCurrentGame('treasure');
  };

  // Système de commentaires
  const addComment = (artworkId, commentText) => {
    if (!commentText.trim()) return;
    
    const newCommentObj = {
      id: Date.now(),
      text: commentText,
      author: 'Visiteur',
      date: new Date().toLocaleString(language === 'fr' ? 'fr-FR' : 'en-US'),
      likes: 0
    };
    
    setComments(prev => ({
      ...prev,
      [artworkId]: [...(prev[artworkId] || []), newCommentObj]
    }));
    
    setNewComment('');
    addNotification('success', 'Commentaire ajouté', 'Merci pour votre contribution !');
  };

  // Partager une œuvre
  const shareArtwork = (artwork, platform) => {
    const text = `Découvrez "${artwork.title}" de ${artwork.artist} au Musée des Civilisations Noires`;
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      email: `mailto:?subject=${encodeURIComponent(artwork.title)}&body=${encodeURIComponent(text)}`
    };
    
    if (platform === 'copy') {
      navigator.clipboard?.writeText(text);
      addNotification('success', 'Lien copié', 'Le lien a été copié dans le presse-papier');
    } else {
      window.open(urls[platform], '_blank');
      addNotification('success', 'Partage', `"${artwork.title}" partagé avec succès !`);
    }
    setShowShareModal(false);
  };

  // Télécharger pour mode hors ligne
  const downloadForOffline = (artwork) => {
    if (!artwork.offlineAvailable) {
      addNotification('info', 'Téléchargement', `"${artwork.title}" téléchargé pour consultation hors ligne`);
      artwork.offlineAvailable = true;
      setOfflineContent([...offlineContent, artwork]);
    }
  };

  // Export des favoris en format texte
  const exportFavorites = () => {
    const content = favorites.map(fav => 
      `${fav.title} - ${fav.artist} (${fav.year})\n${fav.description}\n\n`
    ).join('---\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mes-favoris-musee.txt';
    a.click();
    addNotification('success', 'Export réussi', 'Vos favoris ont été exportés');
  };

  // Filtrer les œuvres
  const filteredArtworks = filterArtworks(artworksDatabase, searchQuery, categoryFilter);

  // Fonction Text-to-Speech pour lire la description
  const speakDescription = () => {
    if ('speechSynthesis' in window) {
      // Arrêter la lecture en cours
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      // Créer une nouvelle synthèse vocale
      const utterance = new SpeechSynthesisUtterance();
      
      // Texte à lire : titre + artiste + description + anecdote
      const textToSpeak = `
        ${selectedArtwork.title}, 
        par ${selectedArtwork.artist}, 
        réalisée en ${selectedArtwork.year}. 
        ${selectedArtwork.description}
        Le saviez-vous ? ${selectedArtwork.anecdote}
      `;
      
      utterance.text = textToSpeak;
      utterance.lang = 'fr-FR'; // Langue française
      utterance.rate = 0.9; // Vitesse de lecture
      utterance.pitch = 1; // Tonalité
      utterance.volume = audioVolume;

      // Événements
      utterance.onstart = () => {
        setIsPlaying(true);
      };

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      addNotification('error', 'Non supporté', 'Votre navigateur ne supporte pas la synthèse vocale');
    }
  };

  // Contrôle du volume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAudioVolume(newVolume);
    
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => speakDescription(), 100);
    }
  };

  // Muet/Activer le son
  const toggleMute = () => {
    setIsMuted(!isMuted);
    setAudioVolume(isMuted ? 1 : 0);
  };

  // Lecture vidéo
  const handleVideoPlay = () => {
    setShowVideoModal(true);
    setIsVideoPlaying(true);
    addNotification('info', 'Vidéo', 'Ouverture de la vidéo...');
  };

  const closeVideo = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
  };

  return (
    <div className={`max-w-md mx-auto ${theme.bgClass} min-h-screen relative`}>
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 left-4 z-[100] space-y-2 max-w-md mx-auto">
        {notifications.slice(0, 3).map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onClose={(id) => setNotifications(notifications.filter(n => n.id !== id))}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="min-h-screen">
        {currentView === 'home' && (
          <HomeView 
            theme={theme}
            t={t}
            isOnline={isOnline}
            offlineContent={offlineContent}
            badges={badges}
            artworksDatabase={artworksDatabase}
            visitHistory={visitHistory}
            favorites={favorites}
            setScannerActive={setScannerActive}
            setSelectedArtwork={setSelectedArtwork}
            setCurrentView={setCurrentView}
          />
        )}
        
        {currentView === 'gallery' && (
          <GalleryView 
            theme={theme}
            t={t}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            filteredArtworks={filteredArtworks}
            setSelectedArtwork={setSelectedArtwork}
            setCurrentView={setCurrentView}
          />
        )}
        
        {currentView === 'favorites' && (
          <FavoritesView 
            theme={theme}
            t={t}
            favorites={favorites}
            exportFavorites={exportFavorites}
            setSelectedArtwork={setSelectedArtwork}
            setCurrentView={setCurrentView}
          />
        )}
        
        {currentView === 'profile' && (
          <ProfileView 
            theme={theme}
            t={t}
            language={language}
            setLanguage={setLanguage}
            visitHistory={visitHistory}
            favorites={favorites}
            badges={badges}
            offlineContent={offlineContent}
            isOnline={isOnline}
            notifications={notifications}
            notificationsEnabled={notificationsEnabled}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            setCurrentView={setCurrentView}
            setShowNotificationPanel={setShowNotificationPanel}
            addNotification={addNotification}
          />
        )}
        
        {currentView === 'games' && !currentGame && (
          <GamesView 
            theme={theme}
            t={t}
            gameScore={gameScore}
            startQuiz={startQuiz}
            startMemoryGame={startMemoryGame}
            startTreasureHunt={startTreasureHunt}
          />
        )}
        
        {currentGame === 'quiz' && (
          <QuizView 
            theme={theme}
            t={t}
            quizData={quizData}
            currentQuestionIndex={currentQuestionIndex}
            quizScore={quizScore}
            selectedAnswer={selectedAnswer}
            showQuizResult={showQuizResult}
            checkAnswer={checkAnswer}
            startQuiz={startQuiz}
            setCurrentGame={setCurrentGame}
            setCurrentView={setCurrentView}
          />
        )}
        
        {currentGame === 'memory' && (
          <MemoryGameView 
            theme={theme}
            memoryCards={memoryCards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            handleCardClick={handleCardClick}
            setCurrentGame={setCurrentGame}
            setCurrentView={setCurrentView}
          />
        )}
        
        {currentView === 'artwork' && (
          <ArtworkView 
            selectedArtwork={selectedArtwork}
            theme={theme}
            t={t}
            isPlaying={isPlaying}
            audioVolume={audioVolume}
            isMuted={isMuted}
            isVideoPlaying={isVideoPlaying}
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            showComments={showComments}
            setShowComments={setShowComments}
            showVideoModal={showVideoModal}
            setShowVideoModal={setShowVideoModal}
            favorites={favorites}
            artworksDatabase={artworksDatabase}
            setCurrentView={setCurrentView}
            setZoomImage={setZoomImage}
            toggleFavorite={toggleFavorite}
            downloadForOffline={downloadForOffline}
            speakDescription={speakDescription}
            handleVolumeChange={handleVolumeChange}
            toggleMute={toggleMute}
            handleVideoPlay={handleVideoPlay}
            closeVideo={closeVideo}
            addComment={addComment}
            setShowShareModal={setShowShareModal}
            setSelectedArtwork={setSelectedArtwork}
          />
        )}
      </div>

      {/* Modals */}
      {scannerActive && (
        <ScannerView 
          t={t}
          setScannerActive={setScannerActive}
          simulateQRScan={simulateQRScan}
        />
      )}
      
      <NotificationPanel 
        showNotificationPanel={showNotificationPanel}
        theme={theme}
        t={t}
        notifications={notifications}
        setShowNotificationPanel={setShowNotificationPanel}
      />
      
      <ImageZoomModal 
        zoomImage={zoomImage}
        setZoomImage={setZoomImage}
      />
      
      <ShareModal 
        showShareModal={showShareModal}
        selectedArtwork={selectedArtwork}
        theme={theme}
        t={t}
        shareArtwork={shareArtwork}
        setShowShareModal={setShowShareModal}
      />

      {/* Navigation Bottom Bar */}
      <BottomNavigation 
        currentView={currentView}
        setCurrentView={setCurrentView}
        setScannerActive={setScannerActive}
        favorites={favorites}
        notifications={notifications}
        t={t}
        theme={theme}
      />
    </div>
  );
};

export default App;