import { useEffect } from 'react';

export function useLocalStorageSync<T>(key: string, state: T) {
  useEffect(() => {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(key, serialized);
    } catch (e) {
      console.warn(`Error serializing "${key}":`, e);
    }
  }, [key, state]);
}

export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
}
