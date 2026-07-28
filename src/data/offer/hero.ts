import I_HeroOffer from "@/src/interface/HeroOffer";
import { parseOfferPageSlug } from "@/src/helpers";
import { getOfferDefinition } from "@/src/data/offer/catalog";

type HeroOfferData = Record<string, Record<string, I_HeroOffer>>;

const emptyHeroOffer: I_HeroOffer = {
    eyebrow: '',
    titleHighlight: '',
    title: '',
    description: '',
    image: '',
    imageAlt: '',
};

export default function getHeroOfferData(slug: string): I_HeroOffer {
    const offer = getOfferDefinition(slug);
    if (offer) {
        const { service, location } = offer;
        return {
            eyebrow: `${service.eyebrow} ${location.name}`,
            titleHighlight: ` ${service.title}`,
            title: service.name,
            description: service.description(location),
            image: location.image,
            imageAlt: `${service.name} ${location.inCity} - ${location.imageDescription}.`,
        };
    }

    const { offerSlug, locationSlug } = parseOfferPageSlug(slug);

    const heroOfferData: HeroOfferData = {
        'strony-internetowe': {
            'poznan': {
                eyebrow: 'Strony internetowe Poznań',
                title: 'Strony internetowe w Poznaniu',
                titleHighlight: 'dla firm, które chcą pozyskiwać klientów online',
                description: 'Projektuję i wdrażam nowoczesne strony WordPress, landing page’e i sklepy WooCommerce dla firm z Poznania i okolic. Dbam o czytelny UX, szybkie działanie, podstawy SEO i układ, który prowadzi użytkownika do kontaktu.',
                image: '/offer/poznan/hero.avif',
                imageAlt: 'Strony internetowe Poznań - zdjęcie rynku w Poznaniu z widokiem na Stary Rynek i Ratusz, symbolizujące lokalizację usług.',
            },
            'komorniki': {
                eyebrow: 'Strony internetowe Komorniki',
                title: 'Strony internetowe w Komornikach',
                titleHighlight: 'dla firm, które chcą pozyskiwać klientów online',
                description: 'Projektuję i wdrażam nowoczesne strony WordPress, landing page’e i sklepy WooCommerce dla firm z Komornik i okolic. Dbam o czytelny UX, szybkie działanie, podstawy SEO i układ, który prowadzi użytkownika do kontaktu.',
                image: '/offer/poznan/hero.avif',
                imageAlt: 'Strony internetowe Komorniki - zdjęcie rynku w Poznaniu z widokiem na Stary Rynek i Ratusz, symbolizujące lokalizację usług.',
            },
            'wagrowiec': {
                eyebrow: 'Strony internetowe Wągrowiec',
                title: 'Strony internetowe w Wągrowcu',
                titleHighlight: 'dla firm, które chcą pozyskiwać klientów online',
                description: 'Projektuję i wdrażam nowoczesne strony WordPress, landing page’e i sklepy WooCommerce dla firm z Wągrowca i okolic. Dbam o czytelny UX, szybkie działanie, podstawy SEO i układ, który prowadzi użytkownika do kontaktu.',
                image: '/offer/wagrowiec/wagrowiec-rynek.webp',
                imageAlt: 'Strony internetowe w Wągrowcu - zdjęcie rynku w Wągrowcu z widokiem na Stary Rynek, symbolizujące lokalizację usług.',
            },
            'chodziez': {
                eyebrow: 'Strony internetowe Chodzież',
                title: 'Strony internetowe w Chodzieży',
                titleHighlight: 'dla firm, które chcą pozyskiwać klientów online',
                description: 'Projektuję i wdrażam nowoczesne strony WordPress, landing page’e i sklepy WooCommerce dla firm z Chodzieży i okolic. Dbam o czytelny UX, szybkie działanie, podstawy SEO i układ, który prowadzi użytkownika do kontaktu.',
                image: '/offer/chodziez/chodziez-rynek.avif',
                imageAlt: 'Strony internetowe w Chodzieży - zdjęcie rynku w Chodzieży z widokiem na Stary Rynek, symbolizujące lokalizację usług.',
            },
            'pila': {
                eyebrow: 'Strony internetowe Piła',
                title: 'Strony internetowe w Pile',
                titleHighlight: 'dla firm, które chcą pozyskiwać klientów online',
                description: 'Projektuję i wdrażam nowoczesne strony WordPress, landing page’e i sklepy WooCommerce dla firm z Piły i okolic. Dbam o czytelny UX, szybkie działanie, podstawy SEO i układ, który prowadzi użytkownika do kontaktu.',
                image: '/offer/pila/pila-rynek.avif',
                imageAlt: 'Strony internetowe w Pile - zdjęcie rynku w Pile z widokiem na Stary Rynek, symbolizujące lokalizację usług.',
            },
        },
    };

    return heroOfferData[offerSlug]?.[locationSlug] || emptyHeroOffer;
}
