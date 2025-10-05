// Fonctions utilitaires

// Extraire l'ID YouTube depuis une URL
  // Extraire l'ID YouTube depuis une URL
const getYouTubeId = (url) => {
  if (!url) return 'dQw4w9WgXcQ'; // Vidéo par défaut si pas d'URL
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : 'dQw4w9WgXcQ';
};
// Nettoyer la synthèse vocale
useEffect(() => {
  return () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };
}, [selectedArtwork]);

// Obtenir les œuvres similaires
export const getSimilarArtworks = (artwork, allArtworks) => {
  return Object.values(allArtworks).filter(art => 
    art.id !== artwork.id && 
    (art.category === artwork.category || art.period === artwork.period)
  );
};

// Filtrer les œuvres
export const filterArtworks = (artworks, searchQuery, categoryFilter) => {
  return Object.values(artworks).filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || artwork.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
};

// Vérifier si une œuvre est en favori
export const isFavorite = (artwork, favorites) => {
  return favorites.some(fav => fav.id === artwork.id);
};