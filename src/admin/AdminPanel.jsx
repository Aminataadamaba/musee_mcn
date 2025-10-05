// AdminPanel.jsx
import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Shield, LogOut, Camera, Award, Map, BarChart3, Users, Eye } from 'lucide-react';

const AdminPanel = ({
  isAdmin,
  setIsAdmin,
  artworksDatabase,
  setArtworksDatabase,
  quizQuestions,
  setQuizQuestions,
  treasureClues,
  setTreasureClues,
  analyticsData,
  addNotification,
  darkMode,
  language,
  onClose
}) => {
  const [currentAdminView, setCurrentAdminView] = useState('dashboard');
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingClue, setEditingClue] = useState(null);

  const t = {
    fr: {
      dashboard: 'Tableau de bord',
      logout: 'Déconnexion',
      manageArtworks: 'Gérer les Œuvres',
      manageQuiz: 'Gérer les Quiz',
      manageTreasure: 'Gérer la Chasse',
      analytics: 'Statistiques',
      totalVisitors: 'Visiteurs Totaux',
      todayVisitors: 'Aujourd\'hui',
      addArtwork: 'Ajouter une Œuvre',
      editArtwork: 'Modifier l\'Œuvre',
      saveChanges: 'Enregistrer',
      cancel: 'Annuler',
      title: 'Titre',
      artist: 'Artiste',
      year: 'Année',
      location: 'Localisation',
      imageUrl: 'URL Image',
      description: 'Description',
      technique: 'Technique',
      category: 'Catégorie',
      period: 'Période',
      anecdote: 'Anecdote',
      addQuestion: 'Ajouter Question',
      editQuestion: 'Modifier Question',
      question: 'Question',
      options: 'Options',
      correctAnswer: 'Réponse Correcte',
      addClue: 'Ajouter Indice',
      editClue: 'Modifier Indice',
      clueText: 'Texte de l\'indice',
      relatedArtwork: 'Œuvre associée',
      topArtworks: 'Œuvres Populaires',
      visitors: 'Visiteurs',
      today: 'Aujourd\'hui',
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois',
      total: 'Total',
    }
  }[language] || {
    dashboard: 'Dashboard',
    logout: 'Logout',
    manageArtworks: 'Manage Artworks',
    manageQuiz: 'Manage Quiz',
    manageTreasure: 'Manage Treasure Hunt',
    analytics: 'Analytics',
    totalVisitors: 'Total Visitors',
    todayVisitors: 'Today',
    addArtwork: 'Add Artwork',
    editArtwork: 'Edit Artwork',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    title: 'Title',
    artist: 'Artist',
    year: 'Year',
    location: 'Location',
    imageUrl: 'Image URL',
    description: 'Description',
    technique: 'Technique',
    category: 'Category',
    period: 'Period',
    anecdote: 'Anecdote',
    addQuestion: 'Add Question',
    editQuestion: 'Edit Question',
    question: 'Question',
    options: 'Options',
    correctAnswer: 'Correct Answer',
    addClue: 'Add Clue',
    editClue: 'Edit Clue',
    clueText: 'Clue Text',
    relatedArtwork: 'Related Artwork',
    topArtworks: 'Top Artworks',
    visitors: 'Visitors',
    today: 'Today',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    total: 'Total',
  };

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const textClass = darkMode ? 'text-white' : 'text-gray-800';
  const cardClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

  // CRUD Functions
  const addArtwork = (data) => {
    const newId = `QR${String(Object.keys(artworksDatabase).length + 1).padStart(3, '0')}`;
    setArtworksDatabase({
      ...artworksDatabase,
      [newId]: { ...data, id: newId, views: 0, offlineAvailable: false }
    });
    addNotification('success', 'Œuvre ajoutée', data.title);
    setEditingArtwork(null);
  };

  const updateArtwork = (id, data) => {
    setArtworksDatabase({
      ...artworksDatabase,
      [id]: { ...artworksDatabase[id], ...data }
    });
    addNotification('success', 'Œuvre modifiée', data.title);
    setEditingArtwork(null);
  };

  const deleteArtwork = (id) => {
    const newDb = { ...artworksDatabase };
    delete newDb[id];
    setArtworksDatabase(newDb);
    addNotification('success', 'Œuvre supprimée', '');
  };

  const addQuestion = (data) => {
    setQuizQuestions([...quizQuestions, { ...data, id: Date.now() }]);
    addNotification('success', 'Question ajoutée', '');
    setEditingQuestion(null);
  };

  const updateQuestion = (id, data) => {
    setQuizQuestions(quizQuestions.map(q => q.id === id ? { ...q, ...data } : q));
    addNotification('success', 'Question modifiée', '');
    setEditingQuestion(null);
  };

  const deleteQuestion = (id) => {
    setQuizQuestions(quizQuestions.filter(q => q.id !== id));
    addNotification('success', 'Question supprimée', '');
  };

  const addClue = (data) => {
    setTreasureClues([...treasureClues, { ...data, id: Date.now(), found: false }]);
    addNotification('success', 'Indice ajouté', '');
    setEditingClue(null);
  };

  const updateClue = (id, data) => {
    setTreasureClues(treasureClues.map(c => c.id === id ? { ...c, ...data } : c));
    addNotification('success', 'Indice modifié', '');
    setEditingClue(null);
  };

  const deleteClue = (id) => {
    setTreasureClues(treasureClues.filter(c => c.id !== id));
    addNotification('success', 'Indice supprimé', '');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    addNotification('info', 'Déconnexion', 'Session admin terminée');
    onClose();
  };

  // Dashboard View
  const DashboardView = () => (
    <div className={`${bgClass} min-h-screen p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textClass} flex items-center gap-2`}>
          <Shield size={28} className="text-purple-600" />
          {t.dashboard}
        </h1>
        <button onClick={handleLogout} className="text-red-600 flex items-center gap-2">
          <LogOut size={20} />
          {t.logout}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <Users size={24} className="mb-2" />
          <div className="text-3xl font-bold">{analyticsData.totalVisitors}</div>
          <div className="text-sm opacity-80">{t.totalVisitors}</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
          <Eye size={24} className="mb-2" />
          <div className="text-3xl font-bold">{analyticsData.todayVisitors}</div>
          <div className="text-sm opacity-80">{t.todayVisitors}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => setCurrentAdminView('artworks')}
          className={`${cardClass} p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-lg transition`}
        >
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
            <Camera size={24} className="text-purple-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className={`font-bold ${textClass}`}>{t.manageArtworks}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{Object.keys(artworksDatabase).length} œuvres</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentAdminView('quiz')}
          className={`${cardClass} p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-lg transition`}
        >
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
            <Award size={24} className="text-blue-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className={`font-bold ${textClass}`}>{t.manageQuiz}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{quizQuestions.length} questions</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentAdminView('treasure')}
          className={`${cardClass} p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-lg transition`}
        >
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
            <Map size={24} className="text-green-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className={`font-bold ${textClass}`}>{t.manageTreasure}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{treasureClues.length} indices</p>
          </div>
        </button>

        <button
          onClick={() => setCurrentAdminView('analytics')}
          className={`${cardClass} p-6 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-lg transition`}
        >
          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
            <BarChart3 size={24} className="text-orange-600" />
          </div>
          <div className="flex-1 text-left">
            <h3 className={`font-bold ${textClass}`}>{t.analytics}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rapports détaillés</p>
          </div>
        </button>
      </div>
    </div>
  );

  // Artworks Management View
  const ArtworksView = () => (
    <div className={`${bgClass} min-h-screen p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentAdminView('dashboard')} className="text-purple-600">
          <X size={24} />
        </button>
        <h1 className={`text-xl font-bold ${textClass}`}>{t.manageArtworks}</h1>
        <button
          onClick={() => setEditingArtwork({})}
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {Object.values(artworksDatabase).map(artwork => (
          <div key={artwork.id} className={`${cardClass} rounded-xl p-4 shadow-sm`}>
            <div className="flex gap-3">
              <img src={artwork.image} alt={artwork.title} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className={`font-bold ${textClass} text-sm`}>{artwork.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{artwork.artist} - {artwork.year}</p>
                <p className="text-xs text-purple-600 mt-1">👁️ {artwork.views || 0} vues</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingArtwork(artwork)}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteArtwork(artwork.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingArtwork && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${cardClass} rounded-xl p-6 max-w-2xl w-full my-8`}>
            <h2 className={`text-xl font-bold mb-4 ${textClass}`}>
              {editingArtwork.id ? t.editArtwork : t.addArtwork}
            </h2>
            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              <input
                type="text"
                placeholder={t.title}
                defaultValue={editingArtwork.title}
                onChange={(e) => setEditingArtwork({...editingArtwork, title: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <input
                type="text"
                placeholder={t.artist}
                defaultValue={editingArtwork.artist}
                onChange={(e) => setEditingArtwork({...editingArtwork, artist: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <input
                type="text"
                placeholder={t.year}
                defaultValue={editingArtwork.year}
                onChange={(e) => setEditingArtwork({...editingArtwork, year: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <input
                type="text"
                placeholder={t.location}
                defaultValue={editingArtwork.location}
                onChange={(e) => setEditingArtwork({...editingArtwork, location: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <input
                type="text"
                placeholder={t.imageUrl}
                defaultValue={editingArtwork.image}
                onChange={(e) => setEditingArtwork({...editingArtwork, image: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <textarea
                placeholder={t.description}
                defaultValue={editingArtwork.description}
                onChange={(e) => setEditingArtwork({...editingArtwork, description: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                rows="3"
              />
              <input
                type="text"
                placeholder={t.technique}
                defaultValue={editingArtwork.details}
                onChange={(e) => setEditingArtwork({...editingArtwork, details: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <select
                defaultValue={editingArtwork.category}
                onChange={(e) => setEditingArtwork({...editingArtwork, category: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="">{t.category}</option>
                <option value="Peinture">Peinture</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Textile">Textile</option>
                <option value="Mobilier">Mobilier</option>
              </select>
              <input
                type="text"
                placeholder={t.period}
                defaultValue={editingArtwork.period}
                onChange={(e) => setEditingArtwork({...editingArtwork, period: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              />
              <textarea
                placeholder={t.anecdote}
                defaultValue={editingArtwork.anecdote}
                onChange={(e) => setEditingArtwork({...editingArtwork, anecdote: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                rows="2"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  if (editingArtwork.id) {
                    updateArtwork(editingArtwork.id, editingArtwork);
                  } else {
                    addArtwork(editingArtwork);
                  }
                }}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                {t.saveChanges}
              </button>
              <button
                onClick={() => setEditingArtwork(null)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Quiz Management View
  const QuizView = () => (
    <div className={`${bgClass} min-h-screen p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentAdminView('dashboard')} className="text-purple-600">
          <X size={24} />
        </button>
        <h1 className={`text-xl font-bold ${textClass}`}>{t.manageQuiz}</h1>
        <button
          onClick={() => setEditingQuestion({ options: ['', '', '', ''], correctAnswer: 0 })}
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {quizQuestions.map(q => (
          <div key={q.id} className={`${cardClass} rounded-xl p-4 shadow-sm`}>
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-bold ${textClass} flex-1 text-sm pr-2`}>{q.question}</h3>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setEditingQuestion(q)}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {q.options?.map((opt, i) => (
                <p key={i} className={i === q.correctAnswer ? 'text-green-600 dark:text-green-400 font-semibold' : ''}>
                  {i + 1}. {opt}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {editingQuestion && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${cardClass} rounded-xl p-6 max-w-2xl w-full my-8`}>
            <h2 className={`text-xl font-bold mb-4 ${textClass}`}>
              {editingQuestion.id ? t.editQuestion : t.addQuestion}
            </h2>
            <div className="space-y-3">
              <textarea
                placeholder={t.question}
                defaultValue={editingQuestion.question}
                onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                rows="2"
              />
              <div>
                <label className={`block text-sm font-semibold mb-2 ${textClass}`}>{t.options}</label>
                {[0, 1, 2, 3].map(i => (
                  <input
                    key={i}
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    defaultValue={editingQuestion.options?.[i]}
                    onChange={(e) => {
                      const opts = [...(editingQuestion.options || ['', '', '', ''])];
                      opts[i] = e.target.value;
                      setEditingQuestion({...editingQuestion, options: opts});
                    }}
                    className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg mb-2 focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                  />
                ))}
              </div>
              <select
                value={editingQuestion.correctAnswer}
                onChange={(e) => setEditingQuestion({...editingQuestion, correctAnswer: parseInt(e.target.value)})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="">{t.correctAnswer}</option>
                <option value="0">Option 1</option>
                <option value="1">Option 2</option>
                <option value="2">Option 3</option>
                <option value="3">Option 4</option>
              </select>
              <select
                value={editingQuestion.artwork}
                onChange={(e) => setEditingQuestion({...editingQuestion, artwork: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="">{t.relatedArtwork}</option>
                {Object.values(artworksDatabase).map(art => (
                  <option key={art.id} value={art.id}>{art.title}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  if (editingQuestion.id) {
                    updateQuestion(editingQuestion.id, editingQuestion);
                  } else {
                    addQuestion(editingQuestion);
                  }
                }}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                {t.saveChanges}
              </button>
              <button
                onClick={() => setEditingQuestion(null)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Treasure Hunt Management View
  const TreasureView = () => (
    <div className={`${bgClass} min-h-screen p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentAdminView('dashboard')} className="text-purple-600">
          <X size={24} />
        </button>
        <h1 className={`text-xl font-bold ${textClass}`}>{t.manageTreasure}</h1>
        <button
          onClick={() => setEditingClue({})}
          className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {treasureClues.map(clue => (
          <div key={clue.id} className={`${cardClass} rounded-xl p-4 shadow-sm`}>
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-2">
                <h3 className={`font-bold ${textClass} text-sm mb-1`}>🗺️ Indice {clue.id}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{clue.clue}</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Œuvre: {clue.artwork}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => setEditingClue(clue)}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteClue(clue.id)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingClue && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className={`${cardClass} rounded-xl p-6 max-w-2xl w-full`}>
            <h2 className={`text-xl font-bold mb-4 ${textClass}`}>
              {editingClue.id ? t.editClue : t.addClue}
            </h2>
            <div className="space-y-3">
              <textarea
                placeholder={t.clueText}
                defaultValue={editingClue.clue}
                onChange={(e) => setEditingClue({...editingClue, clue: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                rows="3"
              />
              <select
                value={editingClue.artwork}
                onChange={(e) => setEditingClue({...editingClue, artwork: e.target.value})}
                className={`w-full px-4 py-2 border-2 ${borderClass} rounded-lg focus:outline-none focus:border-purple-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
              >
                <option value="">{t.relatedArtwork}</option>
                {Object.values(artworksDatabase).map(art => (
                  <option key={art.id} value={art.id}>{art.title}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  if (editingClue.id) {
                    updateClue(editingClue.id, editingClue);
                  } else {
                    addClue(editingClue);
                  }
                }}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                {t.saveChanges}
              </button>
              <button
                onClick={() => setEditingClue(null)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Analytics View
  const AnalyticsView = () => (
    <div className={`${bgClass} min-h-screen p-6 pb-24`}>
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentAdminView('dashboard')} className="text-purple-600">
          <X size={24} />
        </button>
        <h1 className={`text-xl font-bold ${textClass}`}>{t.analytics}</h1>
      </div>

      <div className={`${cardClass} rounded-xl p-6 shadow-sm mb-4`}>
        <h3 className={`font-bold text-lg mb-4 ${textClass}`}>{t.visitors}</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.today}</span>
            <span className="font-bold text-blue-600">{analyticsData.todayVisitors}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.thisWeek}</span>
            <span className="font-bold text-green-600">{analyticsData.weekVisitors}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.thisMonth}</span>
            <span className="font-bold text-purple-600">{analyticsData.monthVisitors}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">{t.total}</span>
            <span className="font-bold text-orange-600">{analyticsData.totalVisitors}</span>
          </div>
        </div>
      </div>

      <div className={`${cardClass} rounded-xl p-6 shadow-sm`}>
        <h3 className={`font-bold text-lg mb-4 ${textClass}`}>{t.topArtworks}</h3>
        <div className="space-y-3">
          {Object.values(artworksDatabase)
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5)
            .map((art, index) => (
              <div key={art.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  index === 1 ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' :
                  index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
                  'bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <img src={art.image} alt={art.title} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${textClass}`}>{art.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{art.views || 0} vues</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="fixed inset-0 z-50 bg-black/20">
      {currentAdminView === 'dashboard' && <DashboardView />}
      {currentAdminView === 'artworks' && <ArtworksView />}
      {currentAdminView === 'quiz' && <QuizView />}
      {currentAdminView === 'treasure' && <TreasureView />}
      {currentAdminView === 'analytics' && <AnalyticsView />}
    </div>
  );
};

export default AdminPanel;