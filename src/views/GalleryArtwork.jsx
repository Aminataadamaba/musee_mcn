 // Vue Détail d'une œuvre (améliorée)
  const ArtworkView = () => {
    if (!selectedArtwork) return null;
    const artworkComments = comments[selectedArtwork.id] || [];
    const similarWorks = getSimilarArtworks(selectedArtwork);

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
                fill={isFavorite(selectedArtwork) ? 'red' : 'none'}
                color={isFavorite(selectedArtwork) ? 'red' : 'white'}
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
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition"
            >
              <Volume2 size={20} />
              {isPlaying ? t.pauseAudio : t.audioGuide}
            </button>
            <button
              onClick={() => addNotification('info', 'Vidéo', 'Lecture de la vidéo...')}
              className="bg-indigo-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
            >
              <Play size={20} />
              {t.video}
            </button>
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
        </div>
      </div>
    );
  };

  // Vue Galerie/Recherche (améliorée avec filtres)
  const GalleryView = () => (
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