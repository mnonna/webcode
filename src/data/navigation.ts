export type NavItem = {
    href: string;
    label: string;
};

export const NAV_ITEMS: NavItem[] = [
    { href: '/oferta', label: 'Oferta' },
    { href: '/blog', label: 'Blog' },
    { href: '/kontakt', label: 'Kontakt' },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
    { href: '/oferta', label: 'Oferta' },
    { href: '/polityka-prywatnosci', label: 'Polityka prywatności' },
    { href: '/kontakt', label: 'Kontakt' },
]