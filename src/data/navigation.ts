export type NavItem = {
    href: string;
    labelKey: 'offer' | 'blog' | 'contact' | 'privacy';
};

export const NAV_ITEMS: NavItem[] = [
    { href: '/oferta', labelKey: 'offer' },
    { href: '/blog', labelKey: 'blog' },
    { href: '/kontakt', labelKey: 'contact' },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    { href: '/oferta', labelKey: 'offer' },
    { href: '/polityka-prywatnosci', labelKey: 'privacy' },
    { href: '/kontakt', labelKey: 'contact' },
]
