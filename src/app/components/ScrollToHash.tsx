import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const scrollToTarget = () => {
      const element = document.getElementById(hash);
      if (!element) {
        return;
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const timer = window.setTimeout(scrollToTarget, 80);
    return () => window.clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return null;
}

