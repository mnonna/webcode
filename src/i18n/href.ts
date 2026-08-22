import type {ComponentProps} from 'react';
import {Link} from '@/src/i18n/navigation';

export type LocalizedHref = ComponentProps<typeof Link>['href'];

/**
 * CMS links are runtime values, so TypeScript cannot compare them with the
 * statically configured next-intl pathnames. Keep that assertion in one place.
 */
export function toLocalizedHref(href: string): LocalizedHref {
  return href as LocalizedHref;
}
