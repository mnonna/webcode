export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  date: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'platforma-ecommerce-fashion',
    title: 'Platforma E-commerce Fashion',
    category: 'Sklep internetowy',
    description: 'Kompleksowy sklep internetowy z płatnościami online, systemem zarządzania produktami i panelem administracyjnym.',
    fullDescription: 'Stworzyłem zaawansowaną platformę e-commerce dla marki odzieżowej, która łączy elegancki design z zaawansowaną funkcjonalnością. Projekt obejmował integrację z systemem płatności Stripe, zarządzanie stanem koszyka w czasie rzeczywistym, oraz responsywny interfejs dostosowany do urządzeń mobilnych. System wspiera wielowalutowość i automatyczne przeliczanie cen w czasie rzeczywistym.',
    image: 'https://images.unsplash.com/photo-1723705027411-9bfc3c99c2e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2NzUzMzA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    date: '2025'
  },
  {
    id: 2,
    slug: 'dashboard-analytics-pro',
    title: 'Dashboard Analytics Pro',
    category: 'Aplikacja webowa',
    description: 'Zaawansowany panel analityczny z interaktywnymi wykresami, raportami w czasie rzeczywistym i integracjami API.',
    fullDescription: 'Panel analityczny stworzony dla firmy SaaS, który pozwala na monitorowanie kluczowych wskaźników biznesowych w czasie rzeczywistym. Wykorzystałem Vue.js do stworzenia dynamicznego interfejsu, Chart.js do wizualizacji danych oraz REST API do komunikacji z backendem. System obsługuje eksport danych do PDF/Excel oraz automatyczne generowanie raportów.',
    image: 'https://images.unsplash.com/photo-1634804519576-d7047c5b39d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY3NTA1MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Vue.js', 'Chart.js', 'REST API', 'PostgreSQL'],
    date: '2025'
  },
  {
    id: 3,
    slug: 'portfolio-kreatywne',
    title: 'Portfolio Kreatywne',
    category: 'Strona wizytówka',
    description: 'Eleganckie portfolio dla fotografa z galerią, animacjami i optymalizacją SEO.',
    fullDescription: 'Projekt portfolio dla profesjonalnego fotografa, gdzie kluczem było zaprezentowanie prac w jak najlepszym świetle. Wykorzystałem Next.js dla optymalnej wydajności i SEO, Motion dla płynnych animacji, oraz Tailwind CSS dla spójnego designu. Strona ładuje się błyskawicznie dzięki optymalizacji obrazów i lazy loading.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjB3ZWJzaXRlfGVufDF8fHx8MTc2NzUzMzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['Next.js', 'Tailwind CSS', 'Motion', 'Vercel'],
    date: '2024'
  },
  {
    id: 4,
    slug: 'booking-system-restauracja',
    title: 'Booking System Restauracja',
    category: 'Aplikacja webowa',
    description: 'System rezerwacji stolików online z panelem dla restauracji i powiadomieniami email.',
    fullDescription: 'Kompleksowy system rezerwacji dla sieci restauracji, który pozwala gościom na łatwe rezerwowanie stolików online. System wysyła automatyczne potwierdzenia email, wspiera zarządzanie dostępnością stolików w czasie rzeczywistym oraz integruje się z kalendarzem Google. Panel administracyjny umożliwia zarządzanie rezerwacjami i generowanie raportów.',
    image: 'https://images.unsplash.com/photo-1682778418768-16081e4470a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZXxlbnwxfHx8fDE3Njc1MjM1NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['React', 'Firebase', 'Nodemailer'],
    date: '2024'
  },
  {
    id: 5,
    slug: 'corporate-website-tech-startup',
    title: 'Corporate Website Tech Startup',
    category: 'Strona firmowa',
    description: 'Nowoczesna strona firmowa z sekcją blog, formularzem kontaktowym i integracją z CRM.',
    fullDescription: 'Strona korporacyjna dla startupu technologicznego, która łączy profesjonalny wizerunek z funkcjonalnością. Zbudowana na WordPress z wykorzystaniem Advanced Custom Fields dla elastycznego zarządzania treścią. Integracja z HubSpot CRM automatyzuje proces obsługi leadów, a blog wspiera strategię content marketingową firmy.',
    image: 'https://images.unsplash.com/photo-1677469684112-5dfb3aa4d3df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2NzQ2Njk5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['WordPress', 'PHP', 'MySQL', 'ACF'],
    date: '2024'
  },
  {
    id: 6,
    slug: 'mobile-app-landing-page',
    title: 'Mobile App Landing Page',
    category: 'Strona wizytówka',
    description: 'Landing page dla aplikacji mobilnej z animacjami scroll i sekcją Download.',
    fullDescription: 'Dynamiczny landing page stworzony dla promocji nowej aplikacji mobilnej. Wykorzystałem GSAP do stworzenia efektownych animacji scroll, które angażują użytkowników podczas przeglądania strony. Sekcja download automatycznie wykrywa system operacyjny użytkownika i kieruje do odpowiedniego sklepu. Strona została zoptymalizowana pod kątem konwersji i zawiera wyraźne call-to-action.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY3NDgyMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tags: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
    date: '2023'
  }
];
