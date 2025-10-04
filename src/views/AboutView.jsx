import React from 'react';
import { X, Info, QrCode, Volume2, Download, Heart, Globe, MessageSquare, Award, Map } from 'lucide-react';

// Vue À propos (conservée avec améliorations)
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
             src="/musee_mcn/images/Logo.png"
             alt="Logo MCN"
             className="w-20 h-20 object-contain"
           />
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
 


export default AboutView;
