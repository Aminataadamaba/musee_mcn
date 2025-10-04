import React from 'react';
import { X, Bell } from 'lucide-react';

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

export default NotificationSettings;
