import { useState, useEffect } from 'react';

// Hook personnalisé pour le localStorage
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture du localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans le localStorage pour la clé "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

// Hook pour la détection de la connexion
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

// Hook pour la synthèse vocale
export const useSpeechSynthesis = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speak = (text, options = {}) => {
    if ('speechSynthesis' in window) {
      // Arrêter la lecture en cours
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || 'fr-FR';
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        options.onStart && options.onStart();
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
        options.onEnd && options.onEnd();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
        options.onError && options.onError();
      };

      window.speechSynthesis.speak(utterance);
      return utterance;
    } else {
      options.onError && options.onError('Speech synthesis not supported');
      return null;
    }
  };

  const pause = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return {
    isPlaying,
    isPaused,
    speak,
    pause,
    resume,
    stop
  };
};

// Hook pour la gestion des notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('notificationsEnabled', true);

  const addNotification = (type, title, message) => {
    if (!notificationsEnabled) return;

    const newNotif = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: new Date().toLocaleTimeString()
    };

    setNotifications(prev => [newNotif, ...prev].slice(0, 10));

    // Supprimer automatiquement la notification après 5 secondes
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== newNotif.id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    notificationsEnabled,
    setNotificationsEnabled,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};

// Hook pour la gestion des thèmes
export const useTheme = () => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    bgClass: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    textClass: darkMode ? 'text-white' : 'text-gray-800',
    cardClass: darkMode ? 'bg-gray-800' : 'bg-white',
    borderClass: darkMode ? 'border-gray-700' : 'border-gray-200'
  };

  return {
    darkMode,
    setDarkMode,
    toggleTheme,
    theme
  };
};