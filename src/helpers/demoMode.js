import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

/**
 * Custom hook to determine if the app is running in demo mode.
 * Demo mode is activated when the URL contains a query parameter
 * `demo=maj-priznania` (or any truthy value). It also falls back to
 * `localStorage` so the flag persists across navigation.
 */
export const useDemoMode = () => {
  const location = useLocation();

  // Memoize the check to avoid re‑parsing on every render.
  const isDemo = useMemo(() => {
    const params = new URLSearchParams(location.search);
    // URL flag takes precedence.
    if (params.get('demo')) {
      return true;
    }
    // Fallback to a persisted flag in localStorage.
    return localStorage.getItem('demoMode') === 'true';
  }, [location.search]);

  return isDemo;
};
