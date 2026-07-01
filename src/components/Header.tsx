'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { HOME_NAV_ITEMS } from '../data/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHiddenBySection, setIsHiddenBySection] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ hidden?: boolean }>;
      setIsHiddenBySection(Boolean(customEvent.detail?.hidden));
    };

    window.addEventListener('webcode:header-visibility', handleVisibilityChange as EventListener);

    return () => {
      window.removeEventListener('webcode:header-visibility', handleVisibilityChange as EventListener);
    };
  }, []);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 border-b border-[rgba(230,236,245,0.72)] bg-white/82 backdrop-blur-xl transition-transform duration-300 ${
        isHiddenBySection ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav className="section-shell py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Webcode Logo" className="h-auto max-w-[208px]" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {HOME_NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="wc-body-sm text-[0.95rem] font-[600] transition-colors hover:text-[var(--wc-blue)]">
                {item.label}
              </Link>
            ))}
            <Link href="/#contact" className="wc-btn-primary px-5 py-3">
              Bezpłatna wycena
            </Link>
          </div>

          <button className="wc-text-dark lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="wc-surface-card mt-4 p-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {HOME_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="wc-body-sm rounded-[16px] px-3 py-3 font-[600] transition-colors hover:bg-[var(--wc-blue-soft)] hover:text-[var(--wc-blue)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/#contact" className="wc-btn-primary mt-2 justify-center" onClick={() => setIsMenuOpen(false)}>
                Bezpłatna wycena
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
