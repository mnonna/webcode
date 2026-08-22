'use client';

import {useEffect, useState, type ReactNode} from 'react';
import Image from 'next/image';
import {Menu, X} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import {NAV_ITEMS} from '@/src/data/navigation';
import {Link, usePathname, useRouter} from '@/src/i18n/navigation';
import type {AppLocale} from '@/src/i18n/routing';
import type {CmsGlobalSettings, CmsNavigationLink} from '@/src/interface/CmsGlobal';
import {getStrapiMediaUrl} from '@/src/lib/strapi-media';
import {toLocalizedHref} from '@/src/i18n/href';

type HeaderClientProps = {
  localeLinks?: Partial<Record<AppLocale, string>>;
  settings: CmsGlobalSettings | null;
};

function SmartLink({link, className, children, onClick}: {
  link: CmsNavigationLink;
  className: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  const external = link.external || /^(?:https?:|mailto:|tel:)/i.test(link.href);
  return external ? (
    <a
      href={link.href}
      className={className}
      onClick={onClick}
      target={/^https?:/i.test(link.href) ? '_blank' : undefined}
      rel={/^https?:/i.test(link.href) ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  ) : (
    <Link href={toLocalizedHref(link.href)} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export default function HeaderClient({localeLinks, settings}: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHiddenBySection, setIsHiddenBySection] = useState(false);
  const t = useTranslations('Navigation');
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const logoUrl = (settings?.logo ? getStrapiMediaUrl(settings.logo) : '') || '/logo.png';
  const logoAlt = settings?.logoAlternativeText || settings?.logo?.alternativeText || settings?.siteName || 'Webcode';
  const navItems: CmsNavigationLink[] = settings?.headerLinks?.length
    ? settings.headerLinks
    : NAV_ITEMS.map((item) => ({label: t(item.labelKey), href: item.href, external: false}));
  const cta = settings?.headerCta ?? {label: t('quote'), href: '/#contact', external: false};

  const changeLocale = (nextLocale: AppLocale) => {
    if (nextLocale !== locale) {
      router.replace((localeLinks?.[nextLocale] ?? pathname) as never, {locale: nextLocale});
    }
  };

  const languageSwitcher = (
    <div className="wc-chip gap-1 p-1" aria-label={t('changeLanguage')}>
      {(['pl', 'en'] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => changeLocale(item)}
          disabled={Boolean(localeLinks && item !== locale && !localeLinks[item])}
          aria-pressed={locale === item}
          className={`rounded-full px-2.5 py-1 text-xs font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${locale === item ? 'bg-blue text-white' : 'wc-text-muted hover:text-blue'}`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );

  useEffect(() => {
    const handleVisibilityChange = (event: Event) => {
      const customEvent = event as CustomEvent<{hidden?: boolean}>;
      setIsHiddenBySection(Boolean(customEvent.detail?.hidden));
    };

    window.addEventListener('webcode:header-visibility', handleVisibilityChange as EventListener);
    return () => window.removeEventListener('webcode:header-visibility', handleVisibilityChange as EventListener);
  }, []);

  return (
    <header className={`sticky inset-x-0 top-0 z-50 border-b border-[rgba(230,236,245,0.72)] bg-white/82 backdrop-blur-xl transition-transform duration-300 ${isHiddenBySection ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="section-shell py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoUrl} alt={logoAlt} width={208} height={40} className="h-10 w-auto object-contain" />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <SmartLink key={`${item.href}-${item.label}`} link={item} className="wc-body-sm text-[0.95rem] font-[600] transition-colors hover:text-[var(--wc-blue)]">
                {item.label}
              </SmartLink>
            ))}
            {languageSwitcher}
            <SmartLink link={cta} className="wc-btn-primary px-5 py-3">{cta.label}</SmartLink>
          </div>

          <button className="wc-text-dark lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="wc-surface-card mt-4 p-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <SmartLink
                  key={`${item.href}-${item.label}`}
                  link={item}
                  className="wc-body-sm rounded-[16px] px-3 py-3 font-[600] transition-colors hover:bg-[var(--wc-blue-soft)] hover:text-[var(--wc-blue)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </SmartLink>
              ))}
              <div className="mt-2">{languageSwitcher}</div>
              <SmartLink link={cta} className="wc-btn-primary mt-2 justify-center" onClick={() => setIsMenuOpen(false)}>{cta.label}</SmartLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
