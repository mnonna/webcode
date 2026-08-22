import { SITE_URL } from '@/src/config/site';

const descriptions = {
    pl: "Projektuję nowoczesne strony internetowe, sklepy online i aplikacje webowe. Szybkie realizacje, SEO, responsywność i profesjonalne wsparcie.",
    en: "I design modern websites, online stores and web applications. Fast delivery, SEO, responsive design and professional support.",
};

const names = {
    pl: "Webcode - Tworzę strony, które działają",
    en: "Webcode - Websites that work",
};

export const getOrganizationLd = (locale: 'pl' | 'en') => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo-icon.png`,
    "name": names[locale],
    "description": descriptions[locale],
    "inLanguage": locale === 'pl' ? 'pl-PL' : 'en-GB',
    "email": "webcode.kontakt@gmail.com",
    "telephone": "+48 798 344 959",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Cyprysowa 30A/1",
        "addressLocality": "Komorniki",
        "addressCountry": "PL",
        "addressRegion": "Wielkopolskie",
        "postalCode": "62-052"
    },
    "taxID": "7792533418",
});

export const getLocalBusinessLd = (locale: 'pl' | 'en') => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Cyprysowa 30A/1",
        "addressLocality": "Komorniki",
        "addressCountry": "PL",
        "addressRegion": "Wielkopolskie",
        "postalCode": "62-052"
    },
    "description": descriptions[locale],
    "name": names[locale],
    "inLanguage": locale === 'pl' ? 'pl-PL' : 'en-GB',
    "telephone": "+48 798 344 959",
    "email": "webcode.kontakt@gmail.com",
});
