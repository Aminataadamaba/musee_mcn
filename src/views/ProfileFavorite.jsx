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
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-700 rounded-2xl p-8 text-white text-center mb-6 shadow-xl">
        <div className="text-6xl mb-4">🏛️</div>
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
      
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-red-700 rounded-2xl p-6 text-white mb-6 shadow-xl">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4">
          👤
        </div>
        <h2 className="text-xl font-bold">{t.visitor}</h2>
        <p className="text-orange-200 text-sm">{t.memberSince}</p>
      </div>

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

        <button 
          onClick={() => {
            addNotification('info', 'Déconnexion', 'À bientôt !');
            setTimeout(() => {
              setCurrentView('home');
            }, 1000);
          }}
          className="w-full flex items-center gap-3 py-3 text-red-600"
        >
          <User size={20} />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );