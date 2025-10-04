import React from 'react';

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

export default ImageZoomModal;
