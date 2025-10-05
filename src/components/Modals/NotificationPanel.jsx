import React from 'react';
import { X, Bell } from 'lucide-react';

const NotificationPanel = ({ 
  showNotificationPanel,
  theme,
  t,
  notifications,
  setShowNotificationPanel 
}) => {
  const { cardClass, textClass } = theme;
  
  if (!showNotificationPanel) return null;
  
  return (
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
};

export default NotificationPanel;