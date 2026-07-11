import I_Cta from "@/src/interface/Cta";
import { parseOfferPageSlug } from "@/src/helpers";
import { getOfferDefinition } from "@/src/data/offer/catalog";

type CtaData = Record<string, Record<string, I_Cta>>;
const emptyCtaData: I_Cta = {
    eyebrow: '',
    title: '',
    description: '',
    button: {
        text: '',
        href: '',
    },
}

export default function getOfferCta(slug: string): I_Cta {
    const offer = getOfferDefinition(slug);
    if (offer) {
        const { service, location } = offer;
        return {
            eyebrow: 'Masz pytania?',
            title: `Potrzebujesz ${service.ctaNeed} <span class="wc-text-blue">${location.inCity}</span>?`,
            description: service.ctaDescription(location),
            button: {
                text: 'Napisz do mnie',
                href: '/kontakt',
            },
        };
    }

    const { offerSlug, locationSlug } = parseOfferPageSlug(slug);

    const ctaData: CtaData = {
        'strony-internetowe': {
            'poznan': {
                eyebrow: 'Masz pytania?',
                title: 'Potrzebujesz strony internetowej <span class="wc-text-blue">w Poznaniu</span>?',
                description: 'Chętnie odpowiemy na wszystkie Twoje pytania dotyczące tworzenia stron internetowych w Poznaniu. Skontaktuj się z nami, aby omówić szczegóły i dowiedzieć się, jak możemy pomóc w realizacji Twojego projektu.',
                button: {
                    text: 'Napisz do nas',
                    href: '/kontakt',
                },
            },
            'komorniki': {
                eyebrow: 'Masz pytania?',
                title: 'Potrzebujesz strony internetowej <span class="wc-text-blue">w Komornikach</span>?',
                description: 'Chętnie odpowiemy na wszystkie Twoje pytania dotyczące tworzenia stron internetowych w Komornikach. Skontaktuj się z nami, aby omówić szczegóły i dowiedzieć się, jak możemy pomóc w realizacji Twojego projektu.',
                button: {
                    text: 'Napisz do nas',
                    href: '/kontakt',
                },
            },
            'wagrowiec': {
                eyebrow: 'Masz pytania?',
                title: 'Potrzebujesz strony internetowej <span class="wc-text-blue">w Wągrowcu</span>?',
                description: 'Chętnie odpowiemy na wszystkie Twoje pytania dotyczące tworzenia stron internetowych w Wągrowcu. Skontaktuj się z nami, aby omówić szczegóły i dowiedzieć się, jak możemy pomóc w realizacji Twojego projektu.',
                button: {
                    text: 'Napisz do nas',
                    href: '/kontakt',
                },
            },
            'chodziez': {
                eyebrow: 'Masz pytania?',
                title: 'Potrzebujesz strony internetowej <span class="wc-text-blue">w Chodzieży</span>?',
                description: 'Chętnie odpowiemy na wszystkie Twoje pytania dotyczące tworzenia stron internetowych w Chodzieży. Skontaktuj się z nami, aby omówić szczegóły i dowiedzieć się, jak możemy pomóc w realizacji Twojego projektu.',
                button: {
                    text: 'Napisz do nas',
                    href: '/kontakt',
                },
            },
            'pila': {
                eyebrow: 'Masz pytania?',
                title: 'Potrzebujesz strony internetowej <span class="wc-text-blue">w Pile</span>?',
                description: 'Chętnie odpowiemy na wszystkie Twoje pytania dotyczące tworzenia stron internetowych w Pile. Skontaktuj się z nami, aby omówić szczegóły i dowiedzieć się, jak możemy pomóc w realizacji Twojego projektu.',
                button: {
                    text: 'Napisz do nas',
                    href: '/kontakt',
                },
            },
        },
    };

    return ctaData[offerSlug]?.[locationSlug] || emptyCtaData;
}
