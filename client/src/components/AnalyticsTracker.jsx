import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';

export const AnalyticsTracker = () => {
  const location = useLocation();
  const lastPathRef = useRef(null);

  useEffect(() => {
    // Only track public paths, not /admin routes
    if (location.pathname.startsWith('/admin')) return;

    if (lastPathRef.current !== location.pathname) {
      lastPathRef.current = location.pathname;

      // Track pageview asynchronously
      const sessionId = sessionStorage.getItem('mz_session_id') || (() => {
        const id = 'sess_' + Math.random().toString(36).substring(2, 12);
        sessionStorage.setItem('mz_session_id', id);
        return id;
      })();

      api.post('/analytics/events', {
        eventType: 'pageview',
        path: location.pathname,
        referrer: document.referrer || '',
        sessionId
      }).catch(() => {
        // Silently ignore tracking network issues
      });
    }
  }, [location.pathname]);

  return null;
};
