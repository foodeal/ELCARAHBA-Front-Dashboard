import { useState, useEffect } from "react";

export function UseLocalStorage<T>(key: string, fallbackValue: T) {
  const [value, setValue] = useState(fallbackValue);
  useEffect(() => {
      const stored = localStorage.getItem(key);
      setValue(stored ? JSON.parse(stored) : fallbackValue);
  }, [fallbackValue, key]);

  useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  console.log("value " + value);
  return [value, setValue] as const;
}