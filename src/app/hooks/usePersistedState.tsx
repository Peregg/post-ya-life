import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function usePersistedState<T>(key: string, defaultValue: T | undefined): [typeof defaultValue, Dispatch<SetStateAction<typeof defaultValue>>, () => void] {
  const [state, setState] = useState<typeof defaultValue>(() => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      console.log(value, 'cc')
      if (typeof value === 'string') {
        return value;
      }
      return value ? JSON.parse(localStorage.getItem(key) as string) : defaultValue;
    }

    return defaultValue;
  });

  const stopPersistance = () => {
    localStorage.removeItem(key);
    setState(undefined);
  };

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState, stopPersistance];
}

export default usePersistedState;
