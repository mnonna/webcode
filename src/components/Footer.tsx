import Image from 'next/image';
import {getLocale, getTranslations} from 'next-intl/server';
import {FOOTER_NAV_ITEMS} from '../data/navigation';
import {Link} from '@/src/i18n/navigation';
import type {AppLocale} from '@/src/i18n/routing';
import type {CmsNavigationLink} from '@/src/interface/CmsGlobal';
import {getCmsGlobal} from '@/src/lib/strapi';
import {getStrapiMediaUrl} from '@/src/lib/strapi-media';

function FooterLink({link}: {link: CmsNavigationLink}) {
  const className = 'text-[0.95rem] font-[600] text-[var(--wc-text)] transition-colors hover:text-[var(--wc-blue)]';
  const external = link.external || /^(?:https?:|mailto:|tel:)/i.test(link.href);
  return external ? (
    <a
      href={link.href}
      className={className}
      target={/^https?:/i.test(link.href) ? '_blank' : undefined}
      rel={/^https?:/i.test(link.href) ? 'noreferrer' : undefined}
    >
      {link.label}
    </a>
  ) : (
    <Link href={link.href as never} className={className}>{link.label}</Link>
  );
}

export default async function Footer() {
  const locale = await getLocale() as AppLocale;
  const [t, nav, settings] = await Promise.all([
    getTranslations({locale, namespace: 'Footer'}),
    getTranslations({locale, namespace: 'Navigation'}),
    getCmsGlobal(locale),
  ]);
  const logoUrl = (settings?.logo ? getStrapiMediaUrl(settings.logo) : '') || '/logo.png';
  const logoAlt = settings?.logoAlternativeText || settings?.logo?.alternativeText || settings?.siteName || 'Webcode';
  const footerLinks: CmsNavigationLink[] = settings?.footerLinks?.length
    ? settings.footerLinks
    : FOOTER_NAV_ITEMS.map((item) => ({label: nav(item.labelKey), href: item.href, external: false}));
  const footerEmail = settings?.footerEmail || 'webcode.kontakt@gmail.com';

  return (
    <footer className="border-t border-[rgba(230,236,245,0.9)] bg-white/86 py-10 backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Image src={logoUrl} alt={logoAlt} width={178} height={34} className="h-[34px] w-auto object-contain" />
            <p className="mt-4 max-w-[34ch] text-[0.96rem] leading-[1.7] text-[var(--wc-text)]">
              {settings?.footerText || t('description')}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((item) => (
              <FooterLink key={`${item.href}-${item.label}`} link={item} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[rgba(230,236,245,0.9)] pt-6 text-[0.92rem] text-[var(--wc-text)] md:flex-row md:items-center md:justify-between">
          <p>{(settings?.footerCopyright || t('copyright')).replace('{year}', String(new Date().getFullYear()))}</p>
          <a href={`mailto:${footerEmail}`} className="font-[600] text-[var(--wc-blue)]">
            {footerEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}

