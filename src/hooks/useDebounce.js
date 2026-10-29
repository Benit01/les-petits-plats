'use client';

import { useEffect, useState } from 'react';

// Renvoie la valeur seulement quand l'utilisateur a arrêté de taper depuis `delay` ms :
// la recherche n'est pas relancée à chaque frappe trop rapprochée.
export default function useDebounce(value, delay = 250) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // Nouvelle frappe avant la fin du délai : on annule le minuteur précédent
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
