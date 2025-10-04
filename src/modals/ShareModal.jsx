import React from 'react';

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
export default ShareModal;
