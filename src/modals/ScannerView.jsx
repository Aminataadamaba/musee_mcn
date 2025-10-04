import React from 'react';

const ScannerView = () => (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="bg-black/80 text-white p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{t.scanTitle}</h2>
        <button
          onClick={() => setScannerActive(false)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="flex-1 relative flex items-center justify-center">
        <div className="w-80 h-80 border-4 border-white/50 rounded-2xl relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Camera size={64} className="text-white/50" />
          </div>
          
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500"></div>
        </div>
      </div>

      <div className="bg-black/80 text-white p-6">
        <p className="text-center mb-4 text-gray-300">{t.position}</p>
        
        <div className="space-y-2">
          <p className="text-xs text-gray-400 text-center mb-2">{t.demo}</p>
          <button
            onClick={() => simulateQRScan('QR001')}
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Scanner QR001 - La Nuit Étoilée
          </button>
          <button
            onClick={() => simulateQRScan('QR002')}
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Scanner QR002 - La Joconde
          </button>
          <button
            onClick={() => simulateQRScan('QR003')}
            className="w-full bg-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Scanner QR003 - Le Penseur
          </button>
        </div>
      </div>
    </div>
  );

export default ScannerView;
