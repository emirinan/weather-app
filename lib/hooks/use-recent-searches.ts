"use client";

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'recentSearches';
const MAX_RECENT_SEARCHES = 5;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches on mount
  useEffect(() => {
    const loadRecentSearches = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setRecentSearches(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    };

    // Initial load
    loadRecentSearches();

    // Listen for storage events (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadRecentSearches();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addSearch = (city: string) => {
    const updated = [city, ...recentSearches.filter(s => s !== city)].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeSearch = (cityToRemove: string) => {
    const updated = recentSearches.filter(city => city !== cityToRemove);
    setRecentSearches(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearSearches
  };
}