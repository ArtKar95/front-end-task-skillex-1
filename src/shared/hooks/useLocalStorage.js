import { useState, useCallback } from 'react';

//!also better to support for query parameters with local storage to enable sharing filtered pages via URL

export const useLocalStorage = (key, initialValue) => {
  const [preferences, setPreferencesState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: could not read key "${key}"`, error);
      return initialValue;
    }
  });

  const setPreferences = useCallback(
    (val) => {
      try {
        const value = val instanceof Function ? val(preferences) : val;
        setPreferencesState(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn(`useLocalStorage: could not set key "${key}"`, error);
      }
    },
    [key, preferences]
  );

  const clearPreferences = useCallback(() => {
    try {
      setPreferencesState(initialValue);
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`useLocalStorage: could not remove key "${key}"`, error);
    }
  }, [key, initialValue]);

  return [preferences, setPreferences, clearPreferences];
};
