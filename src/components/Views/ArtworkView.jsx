import React, { useEffect } from 'react';
import { X, ZoomIn, Heart, Download, Info, Clock, MapPin, Volume2, Pause, Play, MessageSquare, Send, Share2, VolumeX } from 'lucide-react';
import { getYouTubeId, getSimilarArtworks, isFavorite } from '../../utils/helpers';

const ArtworkView = ({ 
  selectedArtwork,
  theme,
  t,
  isPlaying,
  audioVolume,
  isMuted,
  isVideoPlaying,
  comments,
  newComment,
  setNewComment,
  showComments,
  setShowComments,
  showVideoModal,
  setShowVideoModal,
  favorites,
  artworksDatabase,
  setCurrentView,
  setZoomImage,
  toggleFavorite,
  downloadForOffline,
  speakDescription,
  handleVolumeChange,
  toggleMute,
  handleVideoPlay,
  closeVideo,
  addComment,
  setShowShareModal,
  setSelectedArtwork
}) => {
  const { bgClass, textClass, cardClass, borderClass, darkMode } = theme;
  const artworkComments = comments[selectedArtwork.id] || [];
  const similarWorks = getSimilarArtworks(selectedArtwork, artworksDatabase);
  
  // Nettoyer la synthèse vocale
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedArtwork]);

  if (!selectedArtwork) return null;

  return (
    <div className={`${bgClass} pb-20`}>
      <div className="relative h-80">
        <img
          src={selectedArtwork.image}
          alt={selectedArtwork.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setZoomImage(selectedArtwork.image)}
        />
        <button
          onClick={() => setCurrentView('home')}
          className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <X size={24} />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setZoomImage(selectedArtwork.image)}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <ZoomIn size={24} />
          </button>
          <button
            onClick={() => toggleFavorite(selectedArtwork)}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
          >
            <Heart
              size={24}
              fill={isFavorite(selectedArtwork, favorites) ? 'red' : 'none'}
              color={isFavorite(selectedArtwork, favorites) ? 'red' : 'white'}
            />
          </button>
          {!selectedArtwork.offlineAvailable && (
            <button
              onClick={() => downloadForOffline(selectedArtwork)}
              className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
            >
              <Download size={24} />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${textClass}`}>{selectedArtwork.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-1">{selectedArtwork.artist}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {selectedArtwork.year}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {selectedArtwork.location}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Bouton Audio Guide avec Text-to-Speech */}
          <div className={`${cardClass} rounded-xl p-2`}>
            <button
              onClick={speakDescription}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                isPlaying 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              {isPlaying ? <Pause size={20} /> : <Volume2 size={20} />}
              {isPlaying ? 'Arrêter le guide' : 'Guide audio'}
            </button>

            {/* Contrôle du volume */}
            {isPlaying && (
              <div className="mt-3 flex items-center gap-3">
                <button onClick={toggleMute} className="text-gray-600 dark:text-gray-400">
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={audioVolume}
                  onChange={handleVolumeChange}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500">{Math.round(audioVolume * 100)}%</span>
              </div>
            )}
          </div>

          {/* Bouton Vidéo */}
          <div className={`${cardClass} rounded-xl p-2`}>
            <button
              onClick={handleVideoPlay}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                isVideoPlaying
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {isVideoPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isVideoPlaying ? 'Arrêter la vidéo' : 'Voir la vidéo'}
            </button>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl p-4 shadow-sm`}>
          <h3 className={`font-bold mb-2 flex items-center gap-2 ${textClass}`}>
            <Info size={18} />
            {t.description}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedArtwork.description}</p>
        </div>

        <div className={`${cardClass} rounded-xl p-4 shadow-sm`}>
          <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2">{t.technicalDetails}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t.technique} :</span>
              <span className={`font-semibold ${textClass}`}>{selectedArtwork.details}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t.category} :</span>
              <span className={`font-semibold ${textClass}`}>{selectedArtwork.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">{t.period} :</span>
              <span className={`font-semibold ${textClass}`}>{selectedArtwork.period}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 shadow-sm">
          <h3 className="font-bold text-purple-800 dark:text-purple-400 mb-2">{t.didYouKnow}</h3>
          <p className="text-gray-700 dark:text-gray-300 italic">{selectedArtwork.anecdote}</p>
        </div>

        {/* Section Commentaires */}
        <div className={`${cardClass} rounded-xl p-4 shadow-sm`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold flex items-center gap-2 ${textClass}`}>
              <MessageSquare size={18} />
              {t.comments} ({artworkComments.length})
            </h3>
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-purple-600 text-sm font-semibold"
            >
              {showComments ? 'Masquer' : 'Voir tout'}
            </button>
          </div>
          
          {showComments && (
            <>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {artworkComments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">{t.noComments}</p>
                ) : (
                  artworkComments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center text-xs">
                          {comment.author[0]}
                        </div>
                        <span className={`text-sm font-semibold ${textClass}`}>{comment.author}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 ml-8">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t.writeComment}
                  className={`flex-1 px-4 py-2 border-2 ${borderClass} rounded-lg focus:border-purple-500 focus:outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                />
                <button
                  onClick={() => addComment(selectedArtwork.id, newComment)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Œuvres similaires */}
        {similarWorks.length > 0 && (
          <div>
            <h3 className={`font-bold mb-3 ${textClass}`}>{t.similarWorks}</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {similarWorks.map(artwork => (
                <div
                  key={artwork.id}
                  onClick={() => {
                    setSelectedArtwork(artwork);
                    window.scrollTo(0, 0);
                  }}
                  className="flex-shrink-0 w-32 cursor-pointer"
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-32 h-32 object-cover rounded-lg mb-2 shadow-sm"
                  />
                  <p className={`text-xs font-semibold truncate ${textClass}`}>{artwork.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{artwork.artist}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowShareModal(true)}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition"
        >
          <Share2 size={20} />
          {t.share}
        </button>

        {/* Modal Vidéo */}
        {showVideoModal && selectedArtwork && (
          <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
            <div className="bg-black/80 text-white p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">📹 Vidéo - {selectedArtwork.title}</h2>
              <button
                onClick={closeVideo}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-4xl">
                {/* Vidéo YouTube */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedArtwork.videoUrl)}?autoplay=1`}
                    title={selectedArtwork.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="bg-black/80 text-white p-6 text-center">
              <p className="text-gray-300 mb-4">{selectedArtwork.description}</p>
              <button
                onClick={closeVideo}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Fermer la vidéo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkView;