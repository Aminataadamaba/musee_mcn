import React from 'react';

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

export default MuseumMapView;
