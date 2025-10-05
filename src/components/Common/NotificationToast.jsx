import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationToast = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(notification.id), 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

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

export default NotificationToast;