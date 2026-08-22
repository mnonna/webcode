import {getLocale} from 'next-intl/server';
import HeaderClient from '@/src/components/HeaderClient';
import type {AppLocale} from '@/src/i18n/routing';
import {getCmsGlobal} from '@/src/lib/strapi';

export default async function Header({localeLinks}: {localeLinks?: Partial<Record<AppLocale, string>>}) {
  const locale = await getLocale() as AppLocale;
  const settings = await getCmsGlobal(locale);

  return <HeaderClient localeLinks={localeLinks} settings={settings} />;
}
