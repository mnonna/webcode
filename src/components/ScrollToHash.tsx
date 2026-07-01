'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToTarget = () => {
      const hash = window.location.hash.replace('#', '');

      if (!hash) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }

      const element = document.getElementById(hash);
      if (!element) {
        return;
      }

      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const timer = window.setTimeout(scrollToTarget, 80);
    window.addEventListener('hashchange', scrollToTarget);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToTarget);
    };
  }, [pathname]);

  return null;
}
