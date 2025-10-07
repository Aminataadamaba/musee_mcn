import React, { useState, useEffect, useRef } from 'react';
import { Camera, Home, Search, Heart, User, Play, Volume2, Share2, MapPin, X, Menu, QrCode, Globe, Clock, Info, Bell, Wifi, WifiOff, Download, CheckCircle, AlertCircle, Map, Award, ZoomIn, FileText, Moon, Sun, Star, MessageSquare, Send, ThumbsUp, Filter, Calendar, TrendingUp, Pause, VolumeX  } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
// Traductions étendues
const translations = {
  fr: {
    appName: 'Musée des Civilisations Noires',
    explore: 'Explorez notre collection d\'œuvres exceptionnelles',
    scanQR: 'Scanner un QR Code',
    artworks: 'Œuvres',
    visited: 'Visitées',
    favorites: 'Favoris',
    featured: 'Collections en vedette',
    recent: 'Récemment consultées',
    scanTitle: 'Scanner un QR Code',
    position: 'Positionnez le QR Code dans le cadre',
    demo: 'Démo - Simuler un scan :',
    audioGuide: 'Audio Guide',
    pauseAudio: 'Pause Audio',
    video: 'Vidéo',
    description: 'Description',
    technicalDetails: 'Détails Techniques',
    technique: 'Technique',
    category: 'Catégorie',
    period: 'Période',
    didYouKnow: '💡 Le saviez-vous ?',
    share: 'Partager cette œuvre',
    gallery: 'Galerie',
    searchPlaceholder: 'Rechercher une œuvre ou un artiste...',
    myFavorites: 'Mes Favoris',
    noFavorites: 'Aucun favori pour le moment',
    addFavorites: 'Ajoutez des œuvres à vos favoris pour les retrouver facilement',
    profile: 'Profil',
    visitor: 'Visiteur',
    memberSince: 'Membre depuis aujourd\'hui',
    statistics: 'Statistiques',
    viewedArtworks: 'Œuvres consultées',
    visitTime: 'Temps de visite',
    settings: 'Paramètres',
    language: 'Langue',
    notifications: 'Notifications',
    offlineMode: 'Mode hors-ligne',
    about: 'À propos',
    logout: 'Déconnexion',
    home: 'Accueil',
    online: 'En ligne',
    offline: 'Hors ligne',
    offlineReady: 'Contenu disponible hors ligne',
    downloaded: 'téléchargées',
    aboutTitle: 'À propos de l\'application',
    aboutVersion: 'Version',
    aboutDescription: 'Description',
    aboutDescText: 'Musée des Civilisations Noires est une application innovante qui transforme votre visite en une expérience interactive et immersive, vous permettant de découvrir l’art, l’histoire et le patrimoine des civilisations noires.',
    aboutFeatures: 'Fonctionnalités',
    aboutContact: 'Contact',
    aboutDevelopedBy: 'Développé avec ❤️ pour l\'art et la culture',
    notifTitle: 'Notifications',
    notifEnabled: 'Notifications activées',
    notifDisabled: 'Notifications désactivées',
    notifDesc: 'Recevez des alertes pour les nouvelles œuvres et événements',
    closeNotif: 'Fermer',
    museuMap: 'Carte du Musée',
    darkMode: 'Mode sombre',
    comments: 'Commentaires',
    addComment: 'Ajouter un commentaire',
    writeComment: 'Écrivez votre commentaire...',
    send: 'Envoyer',
    noComments: 'Aucun commentaire pour le moment',
    similarWorks: 'Œuvres similaires',
    badges: 'Badges',
    achievements: 'Réalisations',
    exportFavorites: 'Exporter les favoris',
    visitHistory: 'Historique des visites',
    shareVia: 'Partager via',
    zoom: 'Zoom',
    filter: 'Filtrer',
    all: 'Toutes',
    paintings: 'Peintures',
    sculptures: 'Sculptures',
    photos: 'Photos',
  },
  en: {
    appName: 'Museum of Black Civilizations',
    explore: 'Explore our exceptional collection of artworks',
    scanQR: 'Scan QR Code',
    artworks: 'Artworks',
    visited: 'Visited',
    favorites: 'Favorites',
    featured: 'Featured Collections',
    recent: 'Recently Viewed',
    scanTitle: 'Scan QR Code',
    position: 'Position the QR Code in the frame',
    demo: 'Demo - Simulate a scan:',
    audioGuide: 'Audio Guide',
    pauseAudio: 'Pause Audio',
    video: 'Video',
    description: 'Description',
    technicalDetails: 'Technical Details',
    technique: 'Technique',
    category: 'Category',
    period: 'Period',
    didYouKnow: '💡 Did you know?',
    share: 'Share this artwork',
    gallery: 'Gallery',
    searchPlaceholder: 'Search for an artwork or artist...',
    myFavorites: 'My Favorites',
    noFavorites: 'No favorites yet',
    addFavorites: 'Add artworks to your favorites to find them easily',
    profile: 'Profile',
    visitor: 'Visitor',
    memberSince: 'Member since today',
    statistics: 'Statistics',
    viewedArtworks: 'Artworks viewed',
    visitTime: 'Visit time',
    settings: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    offlineMode: 'Offline mode',
    about: 'About',
    logout: 'Logout',
    home: 'Home',
    online: 'Online',
    offline: 'Offline',
    offlineReady: 'Content available offline',
    downloaded: 'downloaded',
    aboutTitle: 'About the app',
    aboutVersion: 'Version',
    aboutDescription: 'Description',
    aboutDescText: 'The Museum of Black Civilizations is an innovative app that turns your visit into an interactive and immersive experience, allowing you to explore the art, history, and heritage of Black civilizations.',
    aboutFeatures: 'Features',
    aboutContact: 'Contact',
    aboutDevelopedBy: 'Developed with ❤️ for art and culture',
    notifTitle: 'Notifications',
    notifEnabled: 'Notifications enabled',
    notifDisabled: 'Notifications disabled',
    notifDesc: 'Receive alerts for new artworks and events',
    closeNotif: 'Close',
    museuMap: 'Museum Map',
    darkMode: 'Dark mode',
    comments: 'Comments',
    addComment: 'Add a comment',
    writeComment: 'Write your comment...',
    send: 'Send',
    noComments: 'No comments yet',
    similarWorks: 'Similar works',
    badges: 'Badges',
    achievements: 'Achievements',
    exportFavorites: 'Export favorites',
    visitHistory: 'Visit history',
    shareVia: 'Share via',
    zoom: 'Zoom',
    filter: 'Filter',
    all: 'All',
    paintings: 'Paintings',
    sculptures: 'Sculptures',
    photos: 'Photos',
  },
  wo: {
    appName: 'Musée bu Dëkk yu Ñuul',
    explore: 'Xool sa collection yu bare',
    scanQR: 'Scan QR Code',
    artworks: 'Nataal',
    visited: 'Yi nga xool',
    favorites: 'Yi nga bëgg',
    featured: 'Collection yu bari',
    recent: 'Yi nga xool bu ñëw',
    scanTitle: 'Scan QR Code',
    position: 'Defal QR Code bi ci gox bi',
    demo: 'Demo - Jël scan:',
    audioGuide: 'Guide bu des',
    pauseAudio: 'Taxaw Audio',
    video: 'Widewo',
    description: 'Melokaan',
    technicalDetails: 'Ay détail yu teknik',
    technique: 'Teknik',
    category: 'Kategori',
    period: 'Période',
    didYouKnow: '💡 Ndax nga xam ne?',
    share: 'Wàññi nataal bii',
    gallery: 'Galëri',
    searchPlaceholder: 'Seet nataal walla artist...',
    myFavorites: 'Sama yi nga bëgg',
    noFavorites: 'Amul yi nga bëgg',
    addFavorites: 'Yokk nataal ci yi nga bëgg ngir gis ñu',
    profile: 'Profil',
    visitor: 'Gëstu',
    memberSince: 'Membre dale tey',
    statistics: 'Statistiques',
    viewedArtworks: 'Nataal yi nga xool',
    visitTime: 'Waxtu wu gëstu',
    settings: 'Paramètres',
    language: 'Làkk',
    notifications: 'Ay notification',
    offlineMode: 'Mode hors-ligne',
    about: 'Ci mbir',
    logout: 'Génn',
    home: 'Accueil',
    online: 'En ligne',
    offline: 'Hors ligne',
    offlineReady: 'Contenu yi am ci offline',
    downloaded: 'yi nga telecharge',
    aboutTitle: 'Ci mbir application bi',
    aboutVersion: 'Version',
    aboutDescription: 'Melokaan',
    aboutDescText: 'Musée des Civilisations Noires mooy app bu bees bi, buñ tënk njàngale gi ci ay mbind mi, te di yéewal say xel ci lëf, téere ak njaaylu ci dund yi Afrik yi.',
    aboutFeatures: 'Fonctionnalités',
    aboutContact: 'Contact',
    aboutDevelopedBy: 'Defar ak ❤️ ngir art ak culture',
    notifTitle: 'Notifications',
    notifEnabled: 'Notifications dañuy liggéey',
    notifDisabled: 'Notifications dañu taxaw',
    notifDesc: 'Am notification yu bees ngir nataal yu bees',
    closeNotif: 'Tax',
    museuMap: 'Carte bu musée',
    darkMode: 'Mode ñuul',
    comments: 'Commentaires',
    addComment: 'Yokk commentaire',
    writeComment: 'Bind sa commentaire...',
    send: 'Yónnë',
    noComments: 'Amul commentaire',
    similarWorks: 'Nataal yu mel ni',
    badges: 'Badges',
    achievements: 'Réalisations',
    exportFavorites: 'Export yi nga bëgg',
    visitHistory: 'Historique bu gëstu',
    shareVia: 'Wàññi ci',
    zoom: 'Zoom',
    filter: 'Filtrer',
    all: 'Lépp',
    paintings: 'Peinture',
    sculptures: 'Sculpture',
    photos: 'Photo',
  }
};

// Base de données simulée des œuvres (conservée)
const artworksDatabase = {
  
'QR001': {
  id: 'QR001',
  title: 'Masque Sepik',
  artist: 'Artisan anonyme',
  year: 'XXe siècle',
  location: 'Salle Arts Océaniens',
  image: '/images/1.jpg',
  description: 'Masque cérémoniel traditionnel provenant de la région du Sepik en Papouasie-Nouvelle-Guinée. Ce masque présente une forme allongée caractéristique avec de grands yeux circulaires et un nez proéminent. Il est orné de fibres végétales naturelles (raphia) et décoré de motifs tressés traditionnels.',
  audioUrl: 'https://example.com/audio/qr001.mp3',
  videoUrl: 'https://example.com/video/qr001.mp4',
  details: 'Bois sculpté, fibres végétales (raphia), pigments naturels. Hauteur approximative : 60-80 cm',
  category: 'Arts premiers - Océanie',
  period: 'Art traditionnel océanien',
  anecdote: 'Les masques Sepik étaient utilisés lors de cérémonies d\'initiation et de rituels spirituels. Les grands yeux symbolisent la vigilance des esprits ancestraux qui veillent sur la communauté. Chaque élément du masque - les fibres, les couleurs, les motifs - a une signification spirituelle précise transmise de génération en génération.',
  offlineAvailable: true
},
  'QR002': {
    id: 'QR002',
    title: 'Pilons traditionnels',
    artist: 'Artistes anonymes',
    year: 'XXe siècle',
    location: 'Salle Arts Africains Contemporains',
    image: '/images/7.jpg',
    description: 'Installation monumentale de pilons traditionnels africains disposés verticalement. Ces outils quotidiens, utilisés pour piler les céréales, sont transformés en œuvre d\'art contemporaine, symbolisant le travail communautaire et la culture culinaire africaine.',
    audioUrl: 'https://example.com/audio/qr002.mp3',
    videoUrl: 'https://example.com/video/qr002.mp4',
    details: 'Bois dur, hauteurs variables (150-200 cm). Installation au sol',
    category: 'Installation - Arts premiers',
    period: 'Art contemporain africain',
    anecdote: 'Dans de nombreuses cultures africaines, le pilon et le mortier sont des symboles de féminité et de tradition. Le bruit rythmique du pilage servait autrefois de communication entre villages. Cette installation célèbre le passage de l\'objet utilitaire à l\'œuvre d\'art.',
    offlineAvailable: true
  },

  'QR003': {
    id: 'QR003',
    title: 'Plat circulaire décoratif',
    artist: 'Artisan anonyme',
    year: 'XXe siècle',
    location: 'Salle Arts Décoratifs Africains',
    image: '/images/8.jpg',
    description: 'Grand plat circulaire tissé avec un motif rayonnant spectaculaire. Le centre jaune orangé contraste avec la bordure en fibres naturelles sombres, créant un effet de soleil. Technique de vannerie complexe avec des perles intégrées.',
    audioUrl: 'https://example.com/audio/qr003.mp3',
    videoUrl: 'https://example.com/video/qr003.mp4',
    details: 'Fibres végétales tressées, perles de verre, diamètre approximatif : 80-100 cm',
    category: 'Arts décoratifs - Vannerie',
    period: 'Art traditionnel africain',
    anecdote: 'Ce type de plat pouvait servir à la fois d\'objet utilitaire pour les cérémonies et de décoration murale. Les couleurs vives et les motifs géométriques ont souvent une signification symbolique liée à la prospérité et à l\'abondance.',
    offlineAvailable: true
  },

  'QR004': {
    id: 'QR004',
    title: 'Collection de masques africains',
    artist: 'Artisans divers',
    year: 'XIXe-XXe siècle',
    location: 'Salle Masques et Rituels',
    image: '/images/9.jpg',
    description: 'Vitrine présentant quatre masques africains de traditions différentes. En haut : deux masques en bois avec cheveux et ornements. En bas à gauche : masque avec coiffe cylindrique. En bas à droite : masque zoomorphe blanc évoquant un crocodile ou un oiseau.',
    audioUrl: 'https://example.com/audio/qr004.mp3',
    videoUrl: 'https://example.com/video/qr004.mp4',
    details: 'Bois sculpté, pigments naturels, fibres végétales, cauris. Hauteurs variables',
    category: 'Arts premiers - Masques',
    period: 'Art traditionnel africain',
    anecdote: 'Chaque masque appartenait à une société secrète ou à un rite initiatique spécifique. Les masques n\'étaient portés que lors d\'occasions sacrées et leur pouvoir spirituel était considéré comme très puissant. Le porteur du masque devenait l\'incarnation de l\'esprit représenté.',
    offlineAvailable: true
  },

  'QR005': {
    id: 'QR005',
    title: 'Objet cérémoniel suspendu',
    artist: 'Artisan anonyme',
    year: 'XXe siècle',
    location: 'Salle Objets Rituels',
    image: '/images/10.jpg',
    description: 'Objet rituel allongé suspendu verticalement, composé de fibres tressées et de tissus. Les tons naturels brun-beige et la texture patinée témoignent de son ancienneté et de son usage cérémoniel.',
    audioUrl: 'https://example.com/audio/qr005.mp3',
    videoUrl: 'https://example.com/video/qr005.mp4',
    details: 'Fibres végétales, tissus, cordes. Longueur approximative : 100-150 cm',
    category: 'Arts premiers - Objets rituels',
    period: 'Art traditionnel',
    anecdote: 'Ce type d\'objet était souvent suspendu dans les lieux sacrés ou lors de cérémonies importantes. Les matériaux naturels et leur dégradation progressive faisaient partie du cycle spirituel de l\'objet.',
    offlineAvailable: true
  },

  'QR006': {
    id: 'QR006',
    title: 'Masque Kuba-Biombo',
    artist: 'Artisan Kuba',
    year: 'XXe siècle',
    location: 'Salle Arts du Congo',
    image: '/images/11.jpg',
    description: 'Masque Kuba impressionnant de la région du Congo, caractérisé par son visage stylisé avec des yeux globuleux, un large nez et une bouche expressive. La coiffe cylindrique stratifiée et les décorations latérales sont typiques du style Kuba.',
    audioUrl: 'https://example.com/audio/qr006.mp3',
    videoUrl: 'https://example.com/video/qr006.mp4',
    details: 'Bois sculpté, pigments naturels (noir, blanc, ocre). Hauteur approximative : 40-50 cm',
    category: 'Arts premiers - Masques Kuba',
    period: 'Art traditionnel congolais',
    anecdote: 'Les masques Kuba étaient portés lors des cérémonies d\'initiation et des funérailles royales. Le royaume Kuba était réputé pour la sophistication de ses arts et son système politique complexe. Chaque élément du masque a une signification précise dans la cosmologie Kuba.',
    offlineAvailable: true
  },

  'QR007': {
    id: 'QR007',
    title: 'Femmes au Pouvoir',
    artist: 'Installation collective',
    year: '2020-2024',
    location: 'Salle Femmes Africaines Influentes',
    image: '/images/12.jpg',
    description: 'Installation multimédia rendant hommage aux femmes africaines influentes, notamment Ameenah Gurib-Fakim, présidente de la République de Maurice (1959-). Projection vidéo présentant des portraits et des moments clés de femmes leaders africaines.',
    audioUrl: 'https://example.com/audio/qr007.mp3',
    videoUrl: 'https://example.com/video/qr007.mp4',
    details: 'Installation vidéo, projections multiples, dimension variable',
    category: 'Art contemporain - Installation multimédia',
    period: 'XXIe siècle',
    anecdote: 'Ameenah Gurib-Fakim est une scientifique de renommée internationale et a été la première femme présidente de Maurice. Cette installation met en lumière le rôle souvent méconnu des femmes dans l\'histoire politique et sociale africaine.',
    offlineAvailable: true
  },

  'QR008': {
    id: 'QR008',
    title: 'Paravent décoratif sculpté',
    artist: 'Artiste contemporain africain',
    year: 'XXe-XXIe siècle',
    location: 'Salle Art Décoratif Contemporain',
    image: '/images/13.jpg',
    description: 'Paravent monumental à quatre panneaux richement décoré de motifs géométriques et symboliques gravés. Les motifs circulaires, rectangulaires et spirales créent un vocabulaire visuel complexe inspiré des traditions africaines.',
    audioUrl: 'https://example.com/audio/qr008.mp3',
    videoUrl: 'https://example.com/video/qr008.mp4',
    details: 'Bois sculpté et peint, quatre panneaux articulés. Hauteur approximative : 200 cm',
    category: 'Art décoratif contemporain',
    period: 'Art contemporain africain',
    anecdote: 'Ce paravent fusionne l\'artisanat traditionnel avec le design contemporain. Les motifs gravés rappellent les symboles Adinkra du Ghana et les cosmogrammes Kongo, créant un dialogue entre différentes traditions africaines.',
    offlineAvailable: true
  },

  'QR009': {
    id: 'QR009',
    title: 'Série photographique - Rituels à la lanterne',
    artist: 'Photographe contemporain',
    year: '2010-2020',
    location: 'Salle Photographie Africaine',
    image: '/images/4.jpg',
    description: 'Série de quatre photographies documentant des rituels nocturnes africains éclairés à la lanterne. Les portraits capturent l\'intensité spirituelle et la dimension intime des cérémonies traditionnelles.',
    audioUrl: 'https://example.com/audio/qr009.mp3',
    videoUrl: 'https://example.com/video/qr009.mp4',
    details: 'Photographies encadrées, dimensions variables. Tirage limité',
    category: 'Photographie contemporaine',
    period: 'XXIe siècle',
    anecdote: 'Ces photographies témoignent de la persistance des pratiques rituelles dans l\'Afrique contemporaine. L\'éclairage à la lanterne crée une atmosphère intime et rappelle les veillées traditionnelles où se transmettent les savoirs ancestraux.',
    offlineAvailable: true
  },

  'QR0010': {
    id: 'QR0010',
    title: 'Mur floral monumental',
    artist: 'Artiste contemporain',
    year: '2020-2024',
    location: 'Salle Art Contemporain',
    image: '/images/5.jpg',
    description: 'Installation murale monumentale composée de centaines de fleurs en tissu coloré suspendues verticalement. La partie supérieure forme une frise multicolore éclatante tandis que les éléments suspendus créent un rideau végétal abstrait.',
    audioUrl: 'https://example.com/audio/qr0010.mp3',
    videoUrl: 'https://example.com/video/qr0010.mp4',
    details: 'Tissu, fibres, armature métallique. Dimensions : environ 8m x 4m',
    category: 'Installation contemporaine',
    period: 'Art contemporain africain',
    anecdote: 'Cette œuvre célèbre la biodiversité africaine et la tradition textile du continent. Chaque fleur est confectionnée à la main, faisant de cette installation un hommage au savoir-faire artisanal et à la patience créative.',
    offlineAvailable: true
  },

  'QR0011': {
    id: 'QR0011',
    title: 'Jardin de coton',
    artist: 'Artiste contemporain',
    year: '2020-2024',
    location: 'Salle Art et Mémoire',
    image: '/images/6.jpg',
    description: 'Installation poétique composée de tiges de coton naturel montées sur des supports métalliques. Cette œuvre évoque à la fois la beauté du coton et l\'histoire complexe de sa culture en Afrique.',
    audioUrl: 'https://example.com/audio/qr0011.mp3',
    videoUrl: 'https://example.com/video/qr0011.mp4',
    details: 'Coton naturel, tiges métalliques, socle. Dimensions variables',
    category: 'Installation contemporaine',
    period: 'Art contemporain africain',
    anecdote: 'Le coton a joué un rôle majeur dans l\'histoire économique africaine. Cette installation invite à réfléchir sur la beauté naturelle de la plante tout en rappelant les mémoires douloureuses liées à son exploitation durant l\'époque coloniale et l\'esclavage.',
    offlineAvailable: true
  },

  'QR0012': {
    id: 'QR0012',
    title: 'Sculptures métalliques jumelles',
    artist: 'Artiste contemporain',
    year: '2020-2024',
    location: 'Salle Sculpture Contemporaine',
    image: '/images/3.jpg',
    description: 'Deux sculptures métalliques stylisées représentant des figures féminines élancées. Les corps sont composés de motifs martelés et texturés, surmontés de têtes circulaires évoquant des masques. Placées devant le mur floral, elles créent un dialogue entre tradition et modernité.',
    audioUrl: 'https://example.com/audio/qr0012.mp3',
    videoUrl: 'https://example.com/video/qr0012.mp4',
    details: 'Métal martelé et soudé. Hauteur approximative : 180 cm chacune',
    category: 'Sculpture contemporaine',
    period: 'Art contemporain africain',
    anecdote: 'Ces sculptures fusionnent l\'esthétique des statues traditionnelles africaines avec des techniques métallurgiques modernes. La dualité des deux figures peut évoquer la gémellité, concept spirituel important dans de nombreuses cultures africaines.',
    offlineAvailable: true
  },

  'QR0013': {
    id: 'QR0013',
    title: 'Mur Rose - Métier à tisser',
    artist: 'Artiste contemporain',
    year: '2020-2024',
    location: 'Salle Textile et Mémoire',
    image: '/images/2.jpg',
    description: 'Installation murale évocatrice reproduisant un mur en terre cuite rose traditionnel avec des éléments de métier à tisser intégrés. Des fragments de tissus jaunes pendent des structures en bois, symbolisant le travail textile interrompu ou la mémoire fragmentée.',
    audioUrl: 'https://example.com/audio/qr0013.mp3',
    videoUrl: 'https://example.com/video/qr0013.mp4',
    details: 'Terre cuite, bois, textile, fibres. Dimensions : environ 3m x 2m',
    category: 'Installation contemporaine',
    period: 'Art contemporain africain',
    anecdote: 'Cette œuvre rend hommage aux tisserands africains et à l\'architecture vernaculaire. Le rose de la terre rappelle les constructions sahéliennes, tandis que les métiers à tisser évoquent un savoir-faire transmis de génération en génération, aujourd\'hui menacé par l\'industrialisation.',
    offlineAvailable: true
  }
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [scannerActive, setScannerActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('fr');
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitHistory, setVisitHistory] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [offlineContent, setOfflineContent] = useState([]);
  
  // Nouveaux états
  const [darkMode, setDarkMode] = useState(false);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [badges, setBadges] = useState([]);
  const [detailedHistory, setDetailedHistory] = useState([]);

   // États pour les jeux et quiz
  const [gameScore, setGameScore] = useState(0);
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

  // audio video
const [audioVolume, setAudioVolume] = useState(1);
const [isMuted, setIsMuted] = useState(false);
const [isVideoPlaying, setIsVideoPlaying] = useState(false);
const [showVideoModal, setShowVideoModal] = useState(false);

 // États Admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminView, setAdminView] = useState('dashboard');
  const [artworksData, setArtworksData] = useState(artworksDatabase);
  const [quizQuestionsData, setQuizQuestionsData] = useState([
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
    }
  ]);
  const [treasureHuntsData, setTreasureHuntsData] = useState([
    { id: 1, artwork: 'QR001', clue: "Je suis peinte avec des étoiles tourbillonnantes..." },
    { id: 2, artwork: 'QR002', clue: "Mon sourire énigmatique est célèbre..." },
    { id: 3, artwork: 'QR003', clue: "Tissu royal du Ghana..." }
  ]);
  const [visitorsStats, setVisitorsStats] = useState({
    today: 45,
    week: 312,
    month: 1247,
    mostViewed: ['QR001', 'QR002', 'QR006'],
    avgTimePerArtwork: '3m 24s',
    gameCompletionRate: 68
  });

const t = translations[language];

  // Fonctions Admin
  const handleAdminLogin = () => {
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      setIsAdmin(true);
      setShowLoginModal(false);
      setAdminUsername('');
      setAdminPassword('');
      addNotification('success', 'Connexion réussie', 'Bienvenue Admin');
      setShowAdminPanel(true);
    } else {
      addNotification('error', 'Erreur', 'Identifiants incorrects');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setShowAdminPanel(false);
    setAdminView('dashboard');
    addNotification('info', 'Déconnexion', 'Vous êtes déconnecté');
  };

  const addArtwork = (artwork) => {
    const newId = `QR${String(Object.keys(artworksData).length + 1).padStart(3, '0')}`;
    setArtworksData({
      ...artworksData,
      [newId]: { ...artwork, id: newId }
    });
    addNotification('success', 'Œuvre ajoutée', `${artwork.title} ajoutée`);
  };

  const updateArtwork = (id, updatedArtwork) => {
    setArtworksData({
      ...artworksData,
      [id]: { ...artworksData[id], ...updatedArtwork }
    });
    addNotification('success', 'Œuvre modifiée', 'Modifications enregistrées');
  };

  const deleteArtwork = (id) => {
    const newArtworks = { ...artworksData };
    delete newArtworks[id];
    setArtworksData(newArtworks);
    addNotification('success', 'Œuvre supprimée', 'L\'œuvre a été supprimée');
  };

  const addQuizQuestion = (question) => {
    setQuizQuestionsData([...quizQuestionsData, { ...question, id: Date.now() }]);
    addNotification('success', 'Question ajoutée', 'Question ajoutée au quiz');
  };

  const updateQuizQuestion = (id, updatedQuestion) => {
    setQuizQuestionsData(quizQuestionsData.map(q => q.id === id ? { ...q, ...updatedQuestion } : q));
    addNotification('success', 'Question modifiée', 'Question mise à jour');
  };

  const deleteQuizQuestion = (id) => {
    setQuizQuestionsData(quizQuestionsData.filter(q => q.id !== id));
    addNotification('success', 'Question supprimée', 'Question supprimée');
  };

  const addTreasureHunt = (treasure) => {
    setTreasureHuntsData([...treasureHuntsData, { ...treasure, id: Date.now() }]);
    addNotification('success', 'Énigme ajoutée', 'Énigme ajoutée');
  };

  const updateTreasureHunt = (id, updatedTreasure) => {
    setTreasureHuntsData(treasureHuntsData.map(t => t.id === id ? { ...t, ...updatedTreasure } : t));
    addNotification('success', 'Énigme modifiée', 'Énigme mise à jour');
  };

  const deleteTreasureHunt = (id) => {
    setTreasureHuntsData(treasureHuntsData.filter(t => t.id !== id));
    addNotification('success', 'Énigme supprimée', 'Énigme supprimée');
  };
  
   // Base de données de questions pour le quiz
 const quizQuestions = [
    {
      id: 1,
      question: "Qui a peint 'La Nuit Étoilée' ?",
      options: ["Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Salvador Dalí"],
      correctAnswer: 0,
      artwork: 'QR006'
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
 
  // Détection de la connexion internet (conservée)
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addNotification('success', t.online, 'Connexion rétablie');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      addNotification('warning', t.offline, 'Mode hors ligne activé');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [language]);

  // Charger le contenu hors ligne (conservé)
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

  // Ajouter une notification (conservée)
  const addNotification = (type, title, message) => {
  if (!notificationsEnabled) return;

  const newNotif = {
    id: Date.now(),
    type,
    title,
    message,
    timestamp: new Date().toLocaleTimeString(
      language === 'fr' ? 'fr-FR' : language === 'en' ? 'en-US' : 'fr-FR'
    )
  };

  setNotifications(prev => [newNotif, ...prev].slice(0, 10));

  // Supprimer automatiquement la notification après 500ms
  setTimeout(() => {
    setNotifications(prev => prev.filter(notif => notif.id !== newNotif.id));
  }, 1000);
};


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
  // Toggle favorite (conservé)
  const toggleFavorite = (artwork) => {
    if (favorites.find(fav => fav.id === artwork.id)) {
      setFavorites(favorites.filter(fav => fav.id !== artwork.id));
      addNotification('info', 'Favori retiré', `"${artwork.title}" a été retiré de vos favoris`);
    } else {
      setFavorites([...favorites, artwork]);
      addNotification('success', 'Ajouté aux favoris', `"${artwork.title}" a été ajouté à vos favoris`);
    }
  };
  const isFavorite = (artwork) => {
    return favorites.some(fav => fav.id === artwork.id);
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
      addNotification('success', t.correctAnswer, '+10 points');
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
    
    artworks.forEach((artwork, index) => {
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
  // Partager une œuvre (amélioré)
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
  // Télécharger pour mode hors ligne (conservé)
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
  const filteredArtworks = Object.values(artworksDatabase).filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || artwork.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  // Œuvres similaires
  const getSimilarArtworks = (artwork) => {
    return Object.values(artworksDatabase).filter(art => 
      art.id !== artwork.id && 
      (art.category === artwork.category || art.period === artwork.period)
    );
  };
  // Thème classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const cardClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

  // Composant Notification Toast (conservé)
  const NotificationToast = ({ notification, onClose }) => {
    useEffect(() => {
      const timer = setTimeout(() => onClose(notification.id), 5000);
      return () => clearTimeout(timer);
    }, []);

    const bgColor = {
      success: 'bg-green-500',
      warning: 'bg-orange-500',
      info: 'bg-blue-500',
      error: 'bg-red-500'
    }[notification.type];

    const Icon = {
      success: CheckCircle,
      warning: AlertCircle,
      info: Info,
      error: AlertCircle
    }[notification.type];

    return (
      <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg flex items-start gap-3 mb-2 animate-slide-in`}>
        <Icon size={20} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-sm">{notification.title}</p>
          <p className="text-xs opacity-90">{notification.message}</p>
        </div>
        <button onClick={() => onClose(notification.id)} className="flex-shrink-0">
          <X size={16} />
        </button>
      </div>
    );
  };

  // Modal de zoom d'image
  const ImageZoomModal = () => {
    if (!zoomImage) return null;
    
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center" onClick={() => setZoomImage(null)}>
        <button
          onClick={() => setZoomImage(null)}
          className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition"
        >
          <X size={24} />
        </button>
        <img 
          src={zoomImage} 
          alt="Zoom" 
          className="max-w-full max-h-full object-contain p-4"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    );
  };

  // Modal de partage
  const ShareModal = () => {
    if (!showShareModal || !selectedArtwork) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowShareModal(false)}>
        <div className={`${cardClass} w-full rounded-t-3xl p-6`} onClick={(e) => e.stopPropagation()}>
          <h3 className={`text-xl font-bold mb-4 ${textClass}`}>{t.shareVia}</h3>
          <div className="grid grid-cols-4 gap-4">
            <button 
              onClick={() => shareArtwork(selectedArtwork, 'whatsapp')}
              className="flex flex-col items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                💬
              </div>
              <span className={`text-xs ${textClass}`}>WhatsApp</span>
            </button>
            
            <button 
              onClick={() => shareArtwork(selectedArtwork, 'twitter')}
              className="flex flex-col items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white text-xl">
                🐦
              </div>
              <span className={`text-xs ${textClass}`}>Twitter</span>
            </button>
            
            <button 
              onClick={() => shareArtwork(selectedArtwork, 'facebook')}
              className="flex flex-col items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                📘
              </div>
              <span className={`text-xs ${textClass}`}>Facebook</span>
            </button>
            
            <button 
              onClick={() => shareArtwork(selectedArtwork, 'copy')}
              className="flex flex-col items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center text-white text-xl">
                📋
              </div>
              <span className={`text-xs ${textClass}`}>Copier</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Vue Carte du Musée avec GPS
  const MuseumMapView = () => {
    const museumCoordinates = {
      lat: 14.7167,
      lng: -17.4677,
      address: "Route de l'Aéroport, Dakar, Sénégal"
    };

    const openGoogleMaps = () => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${museumCoordinates.lat},${museumCoordinates.lng}`;
      window.open(url, '_blank');
    };

    const openAppleMaps = () => {
      const url = `http://maps.apple.com/?daddr=${museumCoordinates.lat},${museumCoordinates.lng}`;
      window.open(url, '_blank');
    };

    return (
      <div className={`${bgClass} min-h-screen p-6 pb-24`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${textClass}`}>{t.museuMap}</h1>
          <button onClick={() => setCurrentView('home')} className="text-purple-600">
            <X size={24} />
          </button>
        </div>

        {/* Localisation GPS du Musée */}
        <div className={`${cardClass} rounded-xl shadow-lg p-4 mb-4`}>
          <h3 className={`font-bold mb-3 flex items-center gap-2 ${textClass}`}>
            <MapPin size={20} className="text-red-600" />
            Localisation du Musée
          </h3>
          
          {/* Carte interactive OpenStreetMap */}
          <div className="relative h-64 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
            <iframe
              src={`https://www.openstreetmap.org/export/embed.html?bbox=-17.4727,-17.4627,14.7117,14.7217&layer=mapnik&marker=${museumCoordinates.lat},${museumCoordinates.lng}`}
              className="w-full h-full border-0"
              title="Carte du Musée des Civilisations Noires"
            ></iframe>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-red-600 mt-1 flex-shrink-0" />
              <div>
                <p className={`font-semibold ${textClass}`}>Musée des Civilisations Noires</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{museumCoordinates.address}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  GPS: {museumCoordinates.lat}, {museumCoordinates.lng}
                </p>
              </div>
            </div>

            {/* Boutons de navigation */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={openGoogleMaps}
                className="bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <MapPin size={18} />
                Google Maps
              </button>
              
              <button
                onClick={openAppleMaps}
                className="bg-gray-800 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition"
              >
                <MapPin size={18} />
                Apple Maps
              </button>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(`${museumCoordinates.lat}, ${museumCoordinates.lng}`);
                addNotification('success', 'Coordonnées copiées', 'Les coordonnées GPS ont été copiées');
              }}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Copier les coordonnées GPS
            </button>
          </div>
        </div>

        {/* Informations pratiques */}
        <div className={`${cardClass} rounded-xl shadow-sm p-4 mb-4`}>
          <h3 className={`font-bold mb-3 ${textClass}`}>Informations pratiques</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-blue-600" />
              <span className={textClass}>Mar-Dim: 9h00 - 18h30</span>
            </div>
            <div className="flex items-center gap-3">
              <Info size={16} className="text-green-600" />
              <span className={textClass}>Fermé le lundi</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">📞</span>
              <span className={textClass}>+221 33 849 90 00</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg">🎫</span>
              <span className={textClass}>Entrée: 2000 FCFA (adultes)</span>
            </div>
          </div>
        </div>
        
        {/* Plan du musée */}
        <div className={`${cardClass} rounded-xl shadow-lg p-4 mb-4`}>
          <h3 className={`font-bold mb-3 ${textClass}`}>Plan du Musée</h3>
          <div className="relative h-96 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition shadow-md">
                  <MapPin size={24} className="text-purple-600 mb-2" />
                  <p className={`font-semibold text-sm ${textClass}`}>Salle 1</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Renaissance</p>
                  <p className="text-xs text-purple-600 mt-1">Rez-de-chaussée</p>
                </div>
                
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition shadow-md">
                  <MapPin size={24} className="text-blue-600 mb-2" />
                  <p className={`font-semibold text-sm ${textClass}`}>Salle 2</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Impressionnisme</p>
                  <p className="text-xs text-blue-600 mt-1">1er étage</p>
                </div>
                
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition shadow-md">
                  <MapPin size={24} className="text-green-600 mb-2" />
                  <p className={`font-semibold text-sm ${textClass}`}>Jardin</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Sculptures</p>
                  <p className="text-xs text-green-600 mt-1">Extérieur</p>
                </div>
                
                <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-white dark:hover:bg-gray-700 transition shadow-md">
                  <MapPin size={24} className="text-orange-600 mb-2" />
                  <p className={`font-semibold text-sm ${textClass}`}>Salle 3</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Art Moderne</p>
                  <p className="text-xs text-orange-600 mt-1">2ème étage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${cardClass} rounded-xl shadow-sm p-4`}>
          <h3 className={`font-bold mb-3 ${textClass}`}>Légende</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span className={`text-sm ${textClass}`}>Vous êtes ici</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className={`text-sm ${textClass}`}>Œuvre disponible</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className={`text-sm ${textClass}`}>Œuvre consultée</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Vue Accueil (conservée avec logo ajouté)
  const HomeView = () => (
    <div className={`${bgClass} p-6 space-y-6`}>
      {/* Bannière de statut connexion */}
      {!isOnline && (
        <div className="bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg p-3 flex items-center gap-2">
          <WifiOff size={18} className="text-orange-600" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">{t.offline}</p>
            <p className="text-xs text-orange-600 dark:text-orange-400">{offlineContent.length} {t.downloaded}</p>
          </div>
        </div>
      )}

      {/* Hero Section avec logo MCN */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          {/* Logo MCN stylisé */}
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30 overflow-hidden">
         <img
            src="/images/Logo.png"
            alt="Logo MCN"
            className="w-full h-full object-contain"
          />
        </div>
         {/* <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30">
            <div className="text-4xl">🏛️</div>
          </div> */}

      
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{t.appName}</h1>
            <p className="text-xs text-white/80">Dakar, Sénégal</p>
          </div>
        </div>
        <p className="text-white/90 mb-4 text-sm">{t.explore}</p>
        <button
          onClick={() => setScannerActive(true)}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-50 transition"
        >
          <QrCode size={20} />
          {t.scanQR}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className={`${cardClass} p-4 rounded-xl text-center shadow-sm`}>
          <div className="text-2xl font-bold text-blue-600">{Object.keys(artworksDatabase).length}</div>
          <div className="text-xs text-blue-600 mt-1">{t.artworks}</div>
        </div>
        <div className={`${cardClass} p-4 rounded-xl text-center shadow-sm`}>
          <div className="text-2xl font-bold text-green-600">{visitHistory.length}</div>
          <div className="text-xs text-green-600 mt-1">{t.visited}</div>
        </div>
        <div className={`${cardClass} p-4 rounded-xl text-center shadow-sm`}>
          <div className="text-2xl font-bold text-pink-600">{favorites.length}</div>
          <div className="text-xs text-pink-600 mt-1">{t.favorites}</div>
        </div>
      </div>

      {/* Badges récents */}
      {badges.length > 0 && (
        <div className={`${cardClass} rounded-xl p-4 shadow-sm`}>
          <h3 className={`font-bold mb-3 ${textClass}`}>{t.badges}</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {badges.map(badge => (
              <div key={badge.id} className="flex-shrink-0 flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  {badge.icon}
                </div>
                <p className="text-xs mt-2 text-center text-gray-600 dark:text-gray-400">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collections en vedette */}
      <div>
        <h2 className={`text-xl font-bold mb-4 ${textClass}`}>{t.featured}</h2>
        <div className="space-y-3">
          {Object.values(artworksDatabase).map((artwork) => (
            <div
              key={artwork.id}
              onClick={() => {
                setSelectedArtwork(artwork);
                setCurrentView('artwork');
              }}
              className={`${cardClass} rounded-xl shadow-sm overflow-hidden flex gap-4 cursor-pointer hover:shadow-md transition`}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1 py-3 pr-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-bold ${textClass}`}>{artwork.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{artwork.artist}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                      <MapPin size={12} />
                      <span>{artwork.location}</span>
                    </div>
                  </div>
                  {artwork.offlineAvailable && (
                    <Download size={16} className="text-green-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historique récent */}
      {visitHistory.length > 0 && (
        <div>
          <h2 className={`text-xl font-bold mb-4 ${textClass}`}>{t.recent}</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {visitHistory.map((artwork) => (
              <div
                key={artwork.id}
                onClick={() => {
                  setSelectedArtwork(artwork);
                  setCurrentView('artwork');
                }}
                className="flex-shrink-0 w-32 cursor-pointer"
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-32 h-32 object-cover rounded-lg mb-2 shadow-sm"
                />
                <p className={`text-xs font-semibold truncate ${textClass}`}>{artwork.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Vue Scanner QR (conservée)
  const ScannerView = () => {
  const [scanning, setScanning] = useState(false);
  const scannerRef = useRef(null);

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          console.log("QR scanné:", decodedText);
          stopScanner();
          simulateQRScan(decodedText);
        },
        (errorMessage) => {
          // Erreurs ignorées
        }
      );

      setScanning(true);
    } catch (err) {
      console.error("Erreur caméra:", err);
      alert("Impossible d'accéder à la caméra");
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setScanning(false);
      } catch (err) {
        console.error("Erreur arrêt:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        stopScanner();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="bg-black/80 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.scanTitle}</h2>
        <button
          onClick={() => {
            stopScanner();
            setScannerActive(false);
          }}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          {/* Zone du scanner */}
          <div id="qr-reader" className="rounded-2xl overflow-hidden"></div>
          
          {!scanning && (
            <div className="w-80 h-80 mx-auto border-4 border-white/50 rounded-2xl relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Camera size={64} className="text-white/50" />
              </div>
              
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500"></div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-black/80 text-white p-6">
        <p className="text-center mb-4 text-gray-300">{t.position}</p>
        
        {/* Bouton Démarrer/Arrêter */}
        {!scanning ? (
          <button
            onClick={startScanner}
            className="w-full bg-green-600 py-4 rounded-lg font-semibold hover:bg-green-700 transition mb-4 flex items-center justify-center gap-2"
          >
            <Camera size={20} />
            Démarrer la caméra
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="w-full bg-red-600 py-4 rounded-lg font-semibold hover:bg-red-700 transition mb-4 flex items-center justify-center gap-2"
          >
            <X size={20} />
            Arrêter la caméra
          </button>
        )}
        
        <div className="space-y-2">
          <p className="text-xs text-gray-400 text-center mb-2">{t.demo}</p>
          <button
            onClick={() => simulateQRScan('QR001')}
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Scanner QR001 - Masque Sepik
          </button>
          <button
            onClick={() => simulateQRScan('QR002')}
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Scanner QR002 - Pilons traditionnels
          </button>
          <button
            onClick={() => simulateQRScan('QR003')}
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Scanner QR003 - Plat circulaire décoratif
          </button>
        </div>
      </div>
    </div>
  );
};
  // const ScannerView = () => (
  //   <div className="fixed inset-0 bg-black z-50 flex flex-col">
  //     <div className="bg-black/80 text-white p-4 flex items-center justify-between">
  //       <h2 className="text-xl font-bold">{t.scanTitle}</h2>
  //       <button
  //         onClick={() => setScannerActive(false)}
  //         className="p-2 hover:bg-white/10 rounded-lg"
  //       >
  //         <X size={24} />
  //       </button>
  //     </div>
      
  //     <div className="flex-1 relative flex items-center justify-center">
  //       <div className="w-80 h-80 border-4 border-white/50 rounded-2xl relative">
  //         <div className="absolute inset-0 flex items-center justify-center">
  //           <Camera size={64} className="text-white/50" />
  //         </div>
          
  //         <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500"></div>
  //         <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500"></div>
  //         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500"></div>
  //         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500"></div>
  //       </div>
  //     </div>

  //     <div className="bg-black/80 text-white p-6">
  //       <p className="text-center mb-4 text-gray-300">{t.position}</p>
        
  //       <div className="space-y-2">
  //         <p className="text-xs text-gray-400 text-center mb-2">{t.demo}</p>
  //         <button
  //           onClick={() => simulateQRScan('QR001')}
  //           className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
  //         >
  //           Scanner QR001 - Masque Sepik
  //         </button>
  //         <button
  //           onClick={() => simulateQRScan('QR002')}
  //           className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
  //         >
  //           Scanner QR002 - Pilons traditionnels
  //         </button>
  //         <button
  //           onClick={() => simulateQRScan('QR003')}
  //           className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
  //         >
  //           Scanner QR003 - Plat circulaire décoratif
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
   const GamesView = () => (
    <div className="bg-[#d9c7a1] p-6 pb-24">
      
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
           Jouer {t.play}
          </button>
        </div>

        <div onClick={startMemoryGame} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
          <div className="text-5xl mb-3">🧠</div>
          <h3 className={`font-bold mb-2 ${textClass}`}>{t.memoryGame}</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          Jouer  {t.play}
          </button>
        </div>

        <div onClick={startTreasureHunt} className={`${cardClass} rounded-xl p-6 cursor-pointer text-center`}>
          <div className="text-5xl mb-3">🗺️</div>
          <h3 className={`font-bold mb-2 ${textClass}`}>{t.treasureHunt}</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
           Jouer {t.play}
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
    const speakDescription = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance();
      const textToSpeak = `${selectedArtwork.title}, par ${selectedArtwork.artist}, réalisée en ${selectedArtwork.year}. ${selectedArtwork.description}`;
      
      utterance.text = textToSpeak;
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      utterance.volume = audioVolume;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVideoPlay = () => {
    setShowVideoModal(true);
    setIsVideoPlaying(true);
  };

  const closeVideo = () => {
    setShowVideoModal(false);
    setIsVideoPlaying(false);
  };
  //  const getYouTubeId = (url) => {
  //     if (!url) return 'dQw4w9WgXcQ';
  //     const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  //     const match = url.match(regExp);
  //     return (match && match[7].length === 11) ? match[7] : 'dQw4w9WgXcQ';
  //   };
  
  // Vue Détail d'une œuvre (améliorée)
  const ArtworkView = () => {
    if (!selectedArtwork) return null;
    const artworkComments = comments[selectedArtwork.id] || [];
    const similarWorks = getSimilarArtworks(selectedArtwork);
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
          // addNotification('success', 'Lecture audio', 'Le guide audio a démarré');
        };

        utterance.onend = () => {
          setIsPlaying(false);
        };

        utterance.onerror = () => {
          setIsPlaying(false);
          // addNotification('error', 'Erreur', 'Impossible de lire le guide audio');
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

      // Lecture vidéo (simulation)
     // Lecture vidéo réelle
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
            {/* Contrôles Audio/Vidéo améliorés */}
        {/* <div className="space-y-3"> */}
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
              {isPlaying ? 'Arrêter le guide' : 'le guide audio'}
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
        {/* Vidéo YouTube (exemple) */}
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

        {/* OU si vous avez des vidéos en local/serveur */}
        {/* 
        <video
          className="w-full rounded-lg"
          controls
          autoPlay
          poster={selectedArtwork.image}
        >
          <source src={selectedArtwork.videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        */}
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

  // Vue Favoris (conservée)
  const FavoritesView = () => (
    <div className={`${bgClass} p-6 pb-24`}>
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-2xl font-bold ${textClass}`}>{t.myFavorites}</h1>
        {favorites.length > 0 && (
          <button
            onClick={exportFavorites}
            className="text-purple-600 p-2 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition"
          >
            <FileText size={20} />
          </button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">{t.noFavorites}</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{t.addFavorites}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((artwork) => (
            <div
              key={artwork.id}
              onClick={() => {
                setSelectedArtwork(artwork);
                setCurrentView('artwork');
              }}
              className={`${cardClass} rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition relative`}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-40 object-cover"
              />
              <Heart
                size={20}
                fill="red"
                color="red"
                className="absolute top-2 right-2"
              />
              <div className="p-3">
                <h3 className={`font-bold text-sm truncate ${textClass}`}>{artwork.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{artwork.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Vue Panneau de Notifications (conservée)
  const NotificationPanel = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowNotificationPanel(false)}>
      <div className={`${cardClass} w-full max-h-[80vh] rounded-t-3xl p-6 overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-bold ${textClass}`}>{t.notifTitle}</h2>
          <button onClick={() => setShowNotificationPanel(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={24} />
          </button>
        </div>
        
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Aucune notification</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className={`font-semibold ${textClass}`}>{notif.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{notif.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Vue Historique détaillé
  const HistoryView = () => (
    <div className={`${bgClass} p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textClass}`}>{t.visitHistory}</h1>
        <button onClick={() => setCurrentView('profile')} className="text-purple-600">
          <X size={24} />
        </button>
      </div>

      {detailedHistory.length === 0 ? (
        <div className="text-center py-12">
          <Clock size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Aucune visite enregistrée</p>
        </div>
      ) : (
        <div className="space-y-3">
          {detailedHistory.map((item, index) => (
            <div
              key={item.timestamp}
              onClick={() => {
                setSelectedArtwork(item.artwork);
                setCurrentView('artwork');
              }}
              className={`${cardClass} rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition`}
            >
              <div className="flex gap-4">
                <img
                  src={item.artwork.image}
                  alt={item.artwork.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className={`font-bold ${textClass}`}>{item.artwork.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.artwork.artist}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Vue À propos (conservée avec améliorations)
  const AboutView = () => (
    <div className={`${bgClass} p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textClass}`}>{t.aboutTitle}</h1>
        <button onClick={() => setCurrentView('profile')} className="text-purple-600">
          <X size={24} />
        </button>
      </div>

      {/* Logo et version */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
       <div className="mb-4 flex justify-center">
          <img
            src="/images/Logo.png"
            alt="Logo MCN"
            className="w-20 h-20 object-contain"
          />
           {/* <div className="text-4xl">🏛️</div> */}
       </div>

        <h2 className="text-2xl font-bold mb-2">{t.appName}</h2>
        <p className="text-orange-200 text-sm mb-1">{t.aboutVersion} 2.0.0</p>
        <p className="text-xs text-white/70">Dakar, Sénégal</p>
      </div>

      {/* Description */}
      <div className={`${cardClass} rounded-xl shadow-sm p-6 mb-6`}>
        <h3 className={`font-bold text-lg mb-3 flex items-center gap-2 ${textClass}`}>
          <Info size={20} className="text-purple-600" />
          {t.aboutDescription}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {t.aboutDescText}
        </p>
      </div>

      {/* Fonctionnalités */}
      <div className={`${cardClass} rounded-xl shadow-sm p-6 mb-6`}>
        <h3 className={`font-bold text-lg mb-4 ${textClass}`}>{t.aboutFeatures}</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <QrCode size={20} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Scan QR Code</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Scannez les codes QR pour découvrir les œuvres</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Volume2 size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Guides Audio & Vidéo</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Contenus multimédias enrichis pour chaque œuvre</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Download size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Mode Hors Ligne</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Téléchargez des œuvres pour les consulter sans connexion</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg">
              <Heart size={20} className="text-pink-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Favoris & Historique</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sauvegardez vos œuvres préférées</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
              <Globe size={20} className="text-orange-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Multilingue</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Français, English, Wolof</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg">
              <MessageSquare size={20} className="text-indigo-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Commentaires</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Partagez vos impressions sur les œuvres</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg">
              <Award size={20} className="text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Badges & Récompenses</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Collectionnez des badges en explorant</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
              <Map size={20} className="text-red-600" />
            </div>
            <div className="flex-1">
              <p className={`font-semibold ${textClass}`}>Carte Interactive</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Naviguez facilement dans le musée</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className={`${cardClass} rounded-xl shadow-sm p-6 mb-6`}>
        <h3 className={`font-bold text-lg mb-4 ${textClass}`}>{t.aboutContact}</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>📧 Email: contact@mcn-dakar.sn</p>
          <p>🌐 Web: www.mcn-dakar.sn</p>
          <p>📱 Support: +221 33 849 90 00</p>
          <p>📍 Route de l'Aéroport, Dakar, Sénégal</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.aboutDevelopedBy}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">© 2025 Musée des Civilisations Noires</p>
      </div>
    </div>
  );

  // Vue Paramètres de Notifications (conservée)
  const NotificationSettings = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setCurrentView('profile')}>
      <div className={`${cardClass} w-full rounded-t-3xl p-6`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${textClass}`}>{t.notifTitle}</h2>
          <button onClick={() => setCurrentView('profile')} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Bell size={24} className="text-purple-600" />
                <div>
                  <p className={`font-semibold ${textClass}`}>Activer les notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.notifDesc}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setNotificationsEnabled(!notificationsEnabled);
                  addNotification(
                    'info', 
                    notificationsEnabled ? t.notifDisabled : t.notifEnabled,
                    ''
                  );
                }}
                className={`w-12 h-6 rounded-full transition ${
                  notificationsEnabled ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600" />
              <span className={`text-sm ${textClass}`}>Nouvelles œuvres ajoutées</span>
            </label>
            
            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600" />
              <span className={`text-sm ${textClass}`}>Événements spéciaux</span>
            </label>
            
            <label className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input type="checkbox" className="w-4 h-4 text-purple-600" />
              <span className={`text-sm ${textClass}`}>Rappels de visite</span>
            </label>
          </div>

          <button
            onClick={() => setCurrentView('profile')}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {t.closeNotif}
          </button>
        </div>
      </div>
    </div>
  );

  // Vue Profil (améliorée)
  const ProfileView = () => (
    <div className={`${bgClass} p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textClass}`}>{t.profile}</h1>
        <button 
          onClick={() => setShowNotificationPanel(true)}
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Bell size={24} className={textClass} />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </button>
      </div>
      
      {/* <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4">
          👤
        </div>
        <h2 className="text-xl font-bold">{t.visitor}</h2>
        <p className="text-orange-200 text-sm">{t.memberSince}</p>
      </div> */}
       <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4">
                {isAdmin ? '👨‍💼' : '👤'}
              </div>
              <h2 className="text-xl font-bold">{isAdmin ? 'Administrateur' : t.visitor}</h2>
              <p className="text-orange-200 text-sm">{t.memberSince}</p>
            </div>
      
          
      
            {isAdmin && (
              <div className={`${cardClass} rounded-xl shadow-sm p-4 mb-6`}>
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 mb-3"
                >
                  <Award size={20} />
                  Panneau d'Administration
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold"
                >
                  Déconnexion Admin
                </button>
              </div>
            )}

      <div className={`${cardClass} rounded-xl shadow-sm p-6 mb-6`}>
        <h3 className={`font-bold mb-4 ${textClass}`}>{t.statistics}</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.viewedArtworks}</span>
            <span className="font-bold text-purple-600">{visitHistory.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.favorites}</span>
            <span className="font-bold text-pink-600">{favorites.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.badges}</span>
            <span className="font-bold text-yellow-600">{badges.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.visitTime}</span>
            <span className="font-bold text-blue-600">25 min</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.offlineReady}</span>
            <span className="font-bold text-green-600">{offlineContent.length}</span>
          </div>
        </div>
      </div>

      <div className={`${cardClass} rounded-xl shadow-sm p-6 space-y-4`}>
        <h3 className={`font-bold mb-4 ${textClass}`}>{t.settings}</h3>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Globe size={20} className="text-gray-500" />
            <span className={`${textClass}`}>{t.language}</span>
          </div>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              addNotification('success', 'Langue modifiée', `Interface en ${e.target.value === 'fr' ? 'Français' : e.target.value === 'en' ? 'English' : 'Wolof'}`);
            }}
            className={`border-2 ${borderClass} rounded-lg px-3 py-2 focus:border-purple-500 focus:outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="wo">Wolof</option>
          </select>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon size={20} className="text-gray-500" /> : <Sun size={20} className="text-gray-500" />}
            <span className={`${textClass}`}>{t.darkMode}</span>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition ${
              darkMode ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition transform ${
              darkMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>

        <button 
          onClick={() => setCurrentView('notificationSettings')}
          className="w-full flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-gray-500" />
            <span className={`${textClass}`}>{t.notifications}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full ${notificationsEnabled ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>
              {notificationsEnabled ? 'Activées' : 'Désactivées'}
            </span>
          </div>
        </button>

        <button 
          onClick={() => setCurrentView('map')}
          className="w-full flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <Map size={20} className="text-gray-500" />
          <span className={`${textClass}`}>{t.museuMap}</span>
        </button>

        <button 
          onClick={() => setCurrentView('history')}
          className="w-full flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <Clock size={20} className="text-gray-500" />
          <span className={`${textClass}`}>{t.visitHistory}</span>
        </button>

        <button className="w-full flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {isOnline ? <Wifi size={20} className="text-green-500" /> : <WifiOff size={20} className="text-orange-500" />}
            <span className={`${textClass}`}>{t.offlineMode}</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${isOnline ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'}`}>
            {isOnline ? t.online : t.offline}
          </span>
        </button>

        <button 
          onClick={() => setCurrentView('about')}
          className="w-full flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700"
        >
          <Info size={20} className="text-gray-500" />
          <span className={`${textClass}`}>{t.about}</span>
        </button>

          {!isAdmin && (
              
                <button
                  onClick={() => setShowLoginModal(true)}
                   className="w-full flex items-center gap-3 py-3 text-red-600"                >
                  <User size={20} />
                  Connexion
                </button>
            
            )}
      </div>
    </div>
  );
 const AdminPanel = ({ onClose }) => {
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});

    const resetForm = () => {
      setEditingItem(null);
      setFormData({});
    };

    const AdminDashboard = () => (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className={`${cardClass} rounded-xl p-4`}>
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-blue-600">{visitorsStats.today}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Aujourd'hui</div>
          </div>
          <div className={`${cardClass} rounded-xl p-4`}>
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold text-green-600">{visitorsStats.week}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Cette semaine</div>
          </div>
          <div className={`${cardClass} rounded-xl p-4`}>
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold text-purple-600">{visitorsStats.month}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Ce mois</div>
          </div>
          <div className={`${cardClass} rounded-xl p-4`}>
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold text-orange-600">{visitorsStats.avgTimePerArtwork}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Temps moyen</div>
          </div>
        </div>

        <div className={`${cardClass} rounded-xl p-4`}>
          <h3 className={`font-bold mb-3 ${textClass}`}>Œuvres populaires</h3>
          <div className="space-y-2">
            {visitorsStats.mostViewed.map((artId, index) => {
              const art = artworksData[artId];
              return art ? (
                <div key={artId} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <img src={art.image} alt={art.title} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className={`font-semibold text-sm ${textClass}`}>{art.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{art.artist}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    );

    const ArtworksManagement = () => (
      <div className="space-y-4">
        <button
          onClick={() => {
            setEditingItem('new');
            setFormData({
              title: '', artist: '', year: '', location: '', image: '',
              description: '', details: '', category: 'Peinture', period: '', anecdote: ''
            });
          }}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          ➕ Ajouter une œuvre
        </button>

        {editingItem && (
          <div className={`${cardClass} rounded-xl p-4`}>
            <h3 className={`font-bold mb-4 ${textClass}`}>
              {editingItem === 'new' ? 'Nouvelle œuvre' : 'Modifier'}
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Titre"
                value={formData.title || ''}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <input
                type="text"
                placeholder="Artiste"
                value={formData.artist || ''}
                onChange={(e) => setFormData({...formData, artist: e.target.value})}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <input
                type="text"
                placeholder="Année"
                value={formData.year || ''}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <input
                type="text"
                placeholder="URL image"
                value={formData.image || ''}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <textarea
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <select
                value={formData.category || 'Peinture'}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="Peinture">Peinture</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Textile">Textile</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (editingItem === 'new') {
                      addArtwork(formData);
                    } else {
                      updateArtwork(editingItem, formData);
                    }
                    resetForm();
                  }}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg"
                >
                  {editingItem === 'new' ? 'Ajouter' : 'Sauvegarder'}
                </button>
                <button onClick={resetForm} className="flex-1 bg-gray-300 py-2 rounded-lg">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {Object.entries(artworksData).map(([id, artwork]) => (
            <div key={id} className={`${cardClass} rounded-xl p-3 flex items-center gap-3`}>
              <img src={artwork.image} alt={artwork.title} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <p className={`font-bold text-sm ${textClass}`}>{artwork.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{artwork.artist}</p>
              </div>
              <button
                onClick={() => {
                  setEditingItem(id);
                  setFormData(artwork);
                }}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg"
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  if (confirm(`Supprimer "${artwork.title}" ?`)) {
                    deleteArtwork(id);
                  }
                }}
                className="p-2 bg-red-100 text-red-600 rounded-lg"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    );

    const QuizManagement = () => (
      <div className="space-y-4">
        <button
          onClick={() => {
            setEditingItem('new');
            setFormData({ question: '', options: ['', '', '', ''], correctAnswer: 0, artwork: '' });
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          ➕ Ajouter une question
        </button>

        {editingItem && (
          <div className={`${cardClass} rounded-xl p-4`}>
            <h3 className={`font-bold mb-4 ${textClass}`}>Question</h3>
            <div className="space-y-3">
              <textarea
                placeholder="Question"
                value={formData.question || ''}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                rows={2}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={formData.options?.[i] || ''}
                  onChange={(e) => {
                    const newOptions = [...(formData.options || ['', '', '', ''])];
                    newOptions[i] = e.target.value;
                    setFormData({...formData, options: newOptions});
                  }}
                  className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                />
              ))}
              <select
                value={formData.correctAnswer ?? 0}
                onChange={(e) => setFormData({...formData, correctAnswer: parseInt(e.target.value)})}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value={0}>Réponse: Option 1</option>
                <option value={1}>Réponse: Option 2</option>
                <option value={2}>Réponse: Option 3</option>
                <option value={3}>Réponse: Option 4</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (editingItem === 'new') {
                      addQuizQuestion(formData);
                    } else {
                      updateQuizQuestion(editingItem, formData);
                    }
                    resetForm();
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                >
                  {editingItem === 'new' ? 'Ajouter' : 'Sauvegarder'}
                </button>
                <button onClick={resetForm} className="flex-1 bg-gray-300 py-2 rounded-lg">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {quizQuestionsData.map((q) => (
            <div key={q.id} className={`${cardClass} rounded-xl p-3`}>
              <p className={`font-bold text-sm mb-2 ${textClass}`}>{q.question}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(q.id);
                    setFormData(q);
                  }}
                  className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg text-sm"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => {
                    if (confirm('Supprimer ?')) deleteQuizQuestion(q.id);
                  }}
                  className="flex-1 p-2 bg-red-100 text-red-600 rounded-lg text-sm"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    const TreasureManagement = () => (
      <div className="space-y-4">
        <button
          onClick={() => {
            setEditingItem('new');
            setFormData({ artwork: '', clue: '' });
          }}
          className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold"
        >
          ➕ Ajouter une énigme
        </button>

        {editingItem && (
          <div className={`${cardClass} rounded-xl p-4`}>
            <h3 className={`font-bold mb-4 ${textClass}`}>Énigme</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="ID œuvre (ex: QR001)"
                value={formData.artwork || ''}
                onChange={(e) => setFormData({...formData, artwork: e.target.value})}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <textarea
                placeholder="Indice"
                value={formData.clue || ''}
                onChange={(e) => setFormData({...formData, clue: e.target.value})}
                rows={3}
                className={`w-full px-4 py-2 border-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (editingItem === 'new') {
                      addTreasureHunt(formData);
                    } else {
                      updateTreasureHunt(editingItem, formData);
                    }
                    resetForm();
                  }}
                  className="flex-1 bg-orange-600 text-white py-2 rounded-lg"
                >
                  {editingItem === 'new' ? 'Ajouter' : 'Sauvegarder'}
                </button>
                <button onClick={resetForm} className="flex-1 bg-gray-300 py-2 rounded-lg">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {treasureHuntsData.map((t) => (
            <div key={t.id} className={`${cardClass} rounded-xl p-3`}>
              <p className={`font-bold text-sm mb-2 ${textClass}`}>Œuvre: {t.artwork}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.clue}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingItem(t.id);
                    setFormData(t);
                  }}
                  className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg text-sm"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => {
                    if (confirm('Supprimer ?')) deleteTreasureHunt(t.id);
                  }}
                  className="flex-1 p-2 bg-red-100 text-red-600 rounded-lg text-sm"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black/90 z-[60] overflow-y-auto">
        <div className={`max-w-md mx-auto min-h-screen ${bgClass}`}>
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  👨‍💼
                </div>
                <div>
                  <h2 className="text-xl font-bold">Panneau Admin</h2>
                  <p className="text-xs text-white/80">Gestion du musée</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setAdminView('dashboard')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  adminView === 'dashboard' ? 'bg-white text-purple-600' : 'bg-white/20'
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => setAdminView('artworks')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  adminView === 'artworks' ? 'bg-white text-purple-600' : 'bg-white/20'
                }`}
              >
                🎨 Œuvres
              </button>
              <button
                onClick={() => setAdminView('quiz')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  adminView === 'quiz' ? 'bg-white text-purple-600' : 'bg-white/20'
                }`}
              >
                🎯 Quiz
              </button>
              <button
                onClick={() => setAdminView('treasure')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
                  adminView === 'treasure' ? 'bg-white text-purple-600' : 'bg-white/20'
                }`}
              >
                🗺️ Chasse
              </button>
            </div>
          </div>

          <div className="p-6 pb-24">
            {adminView === 'dashboard' && <AdminDashboard />}
            {adminView === 'artworks' && <ArtworksManagement />}
            {adminView === 'quiz' && <QuizManagement />}
            {adminView === 'treasure' && <TreasureManagement />}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`max-w-md mx-auto ${bgClass} min-h-screen relative`}>
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

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
          <div className={`${cardClass} rounded-2xl p-6 w-full max-w-sm`} onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <User size={32} className="text-purple-600" />
              </div>
              <h2 className={`text-2xl font-bold ${textClass}`}>Connexion Admin</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Accédez au panneau d'administration</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${textClass}`}>Nom d'utilisateur</label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className={`w-full px-4 py-3 border-2 ${borderClass} rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${textClass}`}>Mot de passe</label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  className={`w-full px-4 py-3 border-2 ${borderClass} rounded-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                />
              </div>

              <button
                onClick={handleAdminLogin}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold"
              >
                Se connecter
              </button>

              <button
                onClick={() => setShowLoginModal(false)}
                className={`w-full ${cardClass} border-2 ${borderClass} py-3 rounded-lg font-semibold ${textClass}`}
              >
                Annuler
              </button>

              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                <p>Test: admin / admin123</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdminPanel && isAdmin && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
      {/* Contenu principal */}
      <div className="min-h-screen">
        {currentView === 'home' && <HomeView />}
        {currentView === 'gallery' && <GalleryView />}
        {currentView === 'favorites' && <FavoritesView />}
        {currentView === 'profile' && <ProfileView />}
         {currentView === 'games' && !currentGame && <GamesView />}
        {currentGame === 'quiz' && <QuizView />}
        {currentGame === 'memory' && <MemoryGameView />}
        {currentGame === 'treasure' && <TreasureHuntView />}
        {currentView === 'artwork' && <ArtworkView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'notificationSettings' && <NotificationSettings />}
        {currentView === 'map' && <MuseumMapView />}
        {currentView === 'history' && <HistoryView />}
        
      </div>

      {/* Modals */}
      {scannerActive && <ScannerView />}
      {showNotificationPanel && <NotificationPanel />}
      {zoomImage && <ImageZoomModal />}
      {showShareModal && <ShareModal />}

      {/* Navigation Bottom Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 ${cardClass} border-t ${borderClass} max-w-md mx-auto`}>
        <div className="flex justify-around items-center h-16">
          <button
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              currentView === 'home' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Home size={24} />
            <span className="text-xs">{t.home}</span>
          </button>
          
          <button
            onClick={() => setCurrentView('gallery')}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              currentView === 'gallery' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Search size={24} />
            <span className="text-xs">{t.gallery}</span>
          </button>
          
          <button
            onClick={() => setScannerActive(true)}
            className="flex flex-col items-center gap-1 px-4 py-2 -mt-6"
          >
            <div className="bg-purple-600 text-white p-4 rounded-full shadow-lg">
              <QrCode size={24} />
            </div>
          </button>
          
          <button
            onClick={() => setCurrentView('favorites')}
            className={`flex flex-col items-center gap-1 px-4 py-2 relative ${
              currentView === 'favorites' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <Heart size={24} />
            <span className="text-xs">{t.favorites}</span>
            {favorites.length > 0 && (
              <span className="absolute top-1 right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
            <button onClick={() => { setCurrentView('games'); setCurrentGame(null); }} className={`flex flex-col items-center gap-1 px-4 py-2 ${currentView === 'games' ? 'text-purple-600' : 'text-gray-400'}`}>
            <span className="text-2xl">🎮</span>
            <span className="text-xs">{t.games}</span>
          </button>
          
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 relative ${
              currentView === 'profile' ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            <User size={24} />
            <span className="text-xs">{t.profile}</span>
            {notifications.length > 0 && (
              <span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};


export default App;