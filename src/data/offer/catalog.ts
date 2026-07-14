export const SITE_URL = 'https://webcode.com.pl';

export const locations = {
  poznan: {
    name: 'Poznań',
    inCity: 'w Poznaniu',
    fromCity: 'z Poznania',
    image: '/offer/poznan/hero.avif',
    imageDescription: 'Stary Rynek i Ratusz w Poznaniu',
  },
  komorniki: {
    name: 'Komorniki',
    inCity: 'w Komornikach',
    fromCity: 'z Komornik',
    image: '/offer/poznan/hero.avif',
    imageDescription: 'Stary Rynek i Ratusz w Poznaniu, symbolizujące lokalizację usług dla Komornik',
  },
  wagrowiec: {
    name: 'Wągrowiec',
    inCity: 'w Wągrowcu',
    fromCity: 'z Wągrowca',
    image: '/offer/wagrowiec/wagrowiec-rynek.webp',
    imageDescription: 'rynek w Wągrowcu',
  },
  chodziez: {
    name: 'Chodzież',
    inCity: 'w Chodzieży',
    fromCity: 'z Chodzieży',
    image: '/offer/chodziez/chodziez-rynek.avif',
    imageDescription: 'rynek w Chodzieży',
  },
  pila: {
    name: 'Piła',
    inCity: 'w Pile',
    fromCity: 'z Piły',
    image: '/offer/pila/pila-rynek.avif',
    imageDescription: 'rynek w Pile',
  },
} as const satisfies Record<string, {
  name: string;
  inCity: string;
  fromCity: string;
  image: string;
  imageDescription: string;
}>;

export type LocationSlug = keyof typeof locations;

type ServiceDefinition = {
  name: string;
  eyebrow: string;
  title: string;
  description: (location: (typeof locations)[LocationSlug]) => string;
  ctaNeed: string;
  ctaDescription: (location: (typeof locations)[LocationSlug]) => string;
  metadataDescription: (location: (typeof locations)[LocationSlug]) => string;
  faq: (location: (typeof locations)[LocationSlug]) => Array<{ question: string; answer: string }>;
};

export const services = {
  'strony-internetowe': {
    name: 'Strony internetowe',
    eyebrow: 'Strony internetowe',
    title: 'dla firm, które chcą pozyskiwać klientów online',
    description: ({ fromCity }) => `Projektuję i wdrażam nowoczesne strony WordPress, landing page’e i sklepy WooCommerce dla firm ${fromCity} i okolic. Dbam o czytelny UX, szybkie działanie, podstawy SEO i układ, który prowadzi użytkownika do kontaktu.`,
    ctaNeed: 'strony internetowej',
    ctaDescription: ({ inCity }) => `Chętnie odpowiem na wszystkie pytania dotyczące tworzenia stron internetowych ${inCity}. Skontaktuj się ze mną, aby omówić szczegóły i sprawdzić, jak mogę pomóc w realizacji Twojego projektu.`,
    metadataDescription: ({ inCity }) => `Nowoczesne strony internetowe WordPress ${inCity}. Indywidualny projekt, responsywność, SEO i wygodna edycja treści.`,
    faq: websiteFaq,
  },
  'sklepy-woocommerce': {
    name: 'Sklepy WooCommerce',
    eyebrow: 'Sklepy WooCommerce',
    title: 'przygotowane do wygodnej sprzedaży online',
    description: ({ fromCity }) => `Projektuję sklepy WooCommerce dla firm ${fromCity} i okolic. Dopasowuję katalog produktów, płatności, dostawy i ścieżkę zakupową tak, aby sklep był prosty w obsłudze dla klientów i zespołu.`,
    ctaNeed: 'sklepu WooCommerce',
    ctaDescription: ({ inCity }) => `Porozmawiajmy o sklepie WooCommerce ${inCity}. Pomogę dobrać funkcje, płatności i dostawy do Twojej oferty oraz przygotować przejrzysty proces zakupowy.`,
    metadataDescription: ({ inCity }) => `Sklepy WooCommerce ${inCity}: projekt, produkty, płatności, dostawy i wygodna obsługa zamówień.`,
    faq: woocommerceFaq,
  },
  'opieka-nad-stronami': {
    name: 'Opieka nad stronami',
    eyebrow: 'Opieka nad stronami',
    title: 'która zapewnia spokój i ciągłość działania',
    description: ({ fromCity }) => `Zapewniam opiekę techniczną nad stronami WordPress firm ${fromCity} i okolic. Zajmuję się aktualizacjami, kopiami zapasowymi, monitoringiem, bezpieczeństwem i bieżącymi zmianami.`,
    ctaNeed: 'opieki nad stroną',
    ctaDescription: ({ inCity }) => `Potrzebujesz niezawodnej opieki nad stroną ${inCity}? Sprawdzę jej stan i zaproponuję zakres wsparcia dopasowany do technologii oraz tempa rozwoju Twojej firmy.`,
    metadataDescription: ({ inCity }) => `Opieka nad stronami WordPress ${inCity}: aktualizacje, backupy, monitoring, bezpieczeństwo i szybkie wsparcie.`,
    faq: careFaq,
  },
  'optymalizacja-seo': {
    name: 'Optymalizacja SEO',
    eyebrow: 'Optymalizacja SEO',
    title: 'która buduje techniczne podstawy widoczności',
    description: ({ fromCity }) => `Pomagam firmom ${fromCity} i okolic poprawić techniczne SEO stron internetowych. Analizuję wydajność, indeksowanie, strukturę treści i błędy wdrożeniowe ograniczające widoczność w Google.`,
    ctaNeed: 'optymalizacji SEO',
    ctaDescription: ({ inCity }) => `Chcesz poprawić widoczność strony ${inCity}? Zacznijmy od analizy problemów technicznych i ustalenia zmian, które mają największy wpływ na jej jakość oraz indeksowanie.`,
    metadataDescription: ({ inCity }) => `Optymalizacja SEO ${inCity}: audyt techniczny, szybkość, indeksowanie, struktura i poprawne wdrożenie strony.`,
    faq: seoFaq,
  },
  'aplikacje-webowe': {
    name: 'Aplikacje webowe',
    eyebrow: 'Aplikacje webowe',
    title: 'dopasowane do procesów Twojej firmy',
    description: ({ fromCity }) => `Projektuję aplikacje webowe i dedykowane panele dla firm ${fromCity} i okolic. Łączę czytelny interfejs, integracje i funkcje wynikające z realnego procesu pracy, sprzedaży lub obsługi klientów.`,
    ctaNeed: 'aplikacji webowej',
    ctaDescription: ({ inCity }) => `Masz pomysł na aplikację webową ${inCity}? Omówimy proces, użytkowników i integracje, a następnie określimy bezpieczny zakres pierwszej wersji produktu.`,
    metadataDescription: ({ inCity }) => `Aplikacje webowe ${inCity}: dedykowane systemy, panele, integracje i interfejsy dopasowane do procesów firmy.`,
    faq: webAppFaq,
  },
  'projekty-graficzne-ui': {
    name: 'Projekty graficzne i UI',
    eyebrow: 'Projekty graficzne i UI',
    title: 'które porządkują komunikację i doświadczenie użytkownika',
    description: ({ fromCity }) => `Tworzę projekty graficzne i interfejsy UI dla firm ${fromCity} i okolic. Przygotowuję layouty stron, aplikacji, bannery i materiały wizualne spójne z marką oraz czytelne dla odbiorców.`,
    ctaNeed: 'projektu graficznego lub UI',
    ctaDescription: ({ inCity }) => `Potrzebujesz projektu graficznego lub UI ${inCity}? Opowiedz o marce, odbiorcach i zastosowaniu materiałów, a zaproponuję spójny kierunek wizualny.`,
    metadataDescription: ({ inCity }) => `Projekty graficzne i UI ${inCity}: layouty stron, interfejsy, bannery i spójne materiały wizualne.`,
    faq: designFaq,
  },
} as const satisfies Record<string, ServiceDefinition>;

export type ServiceSlug = keyof typeof services;

export const offerPageSlugs = (Object.keys(services) as ServiceSlug[]).flatMap((serviceSlug) =>
  (Object.keys(locations) as LocationSlug[]).map((locationSlug) => `${serviceSlug}-${locationSlug}`),
);

export function getOfferDefinition(slug: string) {
  const locationSlug = (Object.keys(locations) as LocationSlug[]).find((location) => slug.endsWith(`-${location}`));
  if (!locationSlug) return null;

  const serviceSlug = slug.slice(0, -(locationSlug.length + 1)) as ServiceSlug;
  const service = services[serviceSlug];
  if (!service) return null;

  return { serviceSlug, locationSlug, service, location: locations[locationSlug] };
}

function locationQuestion(location: (typeof locations)[LocationSlug]) {
  return {
    question: `Czy muszę być ${location.fromCity}, żeby rozpocząć współpracę?`,
    answer: `Nie. Współpracuję z firmami ${location.fromCity} i okolic, ale cały proces można wygodnie przeprowadzić zdalnie — od rozmowy i przekazania materiałów po realizację oraz odbiór.`,
  };
}

function websiteFaq(location: (typeof locations)[LocationSlug]) {
  return [
    { question: `Ile kosztuje strona internetowa ${location.inCity}?`, answer: 'Koszt zależy od liczby podstron, funkcji, poziomu indywidualnego projektu oraz wsparcia przy treściach, SEO i integracjach. Po poznaniu potrzeb przygotowuję wycenę dopasowaną do zakresu.' },
    { question: 'Jak długo trwa wykonanie strony?', answer: 'Termin zależy od rozbudowania witryny i sprawności przekazywania materiałów. Prosta strona firmowa powstaje szybciej niż projekt z rozbudowaną ofertą, integracjami lub sklepem.' },
    locationQuestion(location),
    { question: 'Czy strona będzie oparta na WordPressie?', answer: 'Najczęściej tak. WordPress zapewnia elastyczność i wygodną edycję treści, a w przypadku sprzedaży internetowej może zostać rozszerzony o WooCommerce.' },
    { question: 'Co obejmuje przygotowanie strony?', answer: 'Zakres może obejmować architekturę informacji, UX/UI, wdrożenie responsywne, formularze, podstawy SEO, optymalizację wydajności, testy i publikację.' },
    { question: 'Jakie materiały muszę przygotować?', answer: 'Najbardziej przydatne są informacje o firmie, oferta, logo, zdjęcia i dane kontaktowe. Jeśli treści nie są gotowe, pomogę ustalić strukturę i listę potrzebnych materiałów.' },
    { question: 'Czy po wdrożeniu mogę liczyć na opiekę techniczną?', answer: 'Tak. Po publikacji mogę zajmować się aktualizacjami, backupami, drobnymi zmianami, rozwojem strony i bieżącym wsparciem.' },
    { question: 'Czy projektujesz landing page’e pod kampanie?', answer: 'Tak. Przygotowuję landing page’e skupione na jednej usłudze, kampanii lub celu, z czytelną ścieżką prowadzącą użytkownika do działania.' },
  ];
}

function woocommerceFaq(location: (typeof locations)[LocationSlug]) {
  return [
    { question: `Ile kosztuje sklep WooCommerce ${location.inCity}?`, answer: 'Cena zależy od liczby produktów, wariantów, metod płatności i dostawy, wymaganych integracji oraz indywidualnego projektu. Wycena powstaje po ustaleniu modelu sprzedaży i zakresu.' },
    { question: 'Jak długo trwa uruchomienie sklepu?', answer: 'Termin zależy od wielkości katalogu, gotowości opisów i zdjęć oraz liczby integracji. Po analizie wymagań przygotowuję harmonogram obejmujący wdrożenie, testy i publikację.' },
    locationQuestion(location),
    { question: 'Co obejmuje wdrożenie WooCommerce?', answer: 'Zakres może obejmować produkty i kategorie, koszyk, zamówienia, płatności, dostawy, wiadomości e-mail, regulaminy, analitykę i podstawową optymalizację sprzedaży.' },
    { question: 'Jakie materiały są potrzebne do rozpoczęcia?', answer: 'Potrzebne są informacje o asortymencie, ceny, zdjęcia, warianty, zasady dostaw i płatności oraz dane firmy. Pomagam uporządkować je przed importem lub ręcznym dodaniem.' },
    { question: 'Czy integrujesz płatności i firmy kurierskie?', answer: 'Tak. Dobieram i konfiguruję rozwiązania dostępne dla WooCommerce, zależnie od operatorów płatności, przewoźników oraz sposobu realizacji zamówień.' },
    { question: 'Czy nauczę się samodzielnie obsługiwać sklep?', answer: 'Tak. WooCommerce pozwala zarządzać produktami i zamówieniami z panelu WordPress. Po wdrożeniu mogę przekazać instrukcję lub przeprowadzić szkolenie.' },
    { question: 'Czy zapewniasz późniejsze wsparcie i rozwój?', answer: 'Tak. Mogę opiekować się aktualizacjami, bezpieczeństwem i kopiami zapasowymi, a także wdrażać kolejne funkcje oraz integracje.' },
  ];
}

function careFaq(location: (typeof locations)[LocationSlug]) {
  return [
    { question: `Ile kosztuje opieka nad stroną ${location.inCity}?`, answer: 'Koszt zależy od technologii, stanu witryny, częstotliwości prac i oczekiwanego czasu reakcji. Po krótkim audycie proponuję zakres stałej opieki lub pojedynczej interwencji.' },
    { question: 'Jak szybko możesz przejąć opiekę?', answer: 'Najpierw sprawdzam stan strony, dostęp do hostingu, kopie zapasowe i używane rozszerzenia. Po audycie ustalamy priorytety i termin rozpoczęcia regularnego wsparcia.' },
    locationQuestion(location),
    { question: 'Co obejmuje opieka techniczna?', answer: 'W zależności od pakietu obejmuje aktualizacje, backupy, monitoring działania, kontrolę bezpieczeństwa, usuwanie usterek i drobne zmiany w treści lub wyglądzie.' },
    { question: 'Jakie dostępy są potrzebne?', answer: 'Zwykle potrzebny jest dostęp administratora WordPress oraz, zależnie od problemu, do hostingu, domeny, bazy danych i narzędzi analitycznych. Dostępy są wykorzystywane wyłącznie w ustalonym zakresie.' },
    { question: 'Czy wykonujesz kopie zapasowe przed aktualizacją?', answer: 'Tak. Bezpieczna aktualizacja powinna być poprzedzona sprawdzeniem aktualnego backupu, aby w razie konfliktu można było szybko przywrócić działającą wersję.' },
    { question: 'Czy możesz naprawić stronę po awarii lub ataku?', answer: 'Mogę zdiagnozować problem, przywrócić stronę z poprawnej kopii, usunąć przyczynę awarii i wdrożyć zabezpieczenia. Zakres zależy od dostępności backupów i skali uszkodzeń.' },
    { question: 'Czy opieka obejmuje rozwój strony?', answer: 'Tak, jeśli taki zakres zostanie ustalony. Oprócz utrzymania mogę dodawać sekcje, formularze, integracje i inne funkcje potrzebne wraz z rozwojem firmy.' },
  ];
}

function seoFaq(location: (typeof locations)[LocationSlug]) {
  return [
    { question: `Ile kosztuje optymalizacja SEO ${location.inCity}?`, answer: 'Koszt zależy od wielkości serwisu, technologii i liczby wykrytych problemów. Prace mogą obejmować sam audyt, wdrożenie zaleceń albo stałe wsparcie techniczne.' },
    { question: 'Jak długo trwa optymalizacja strony?', answer: 'Audyt i wdrożenie podstawowych poprawek można zaplanować w określonym terminie, ale efekty w wyszukiwarce pojawiają się stopniowo i zależą także od treści, konkurencji oraz historii domeny.' },
    locationQuestion(location),
    { question: 'Co obejmuje techniczne SEO?', answer: 'Analizuję m.in. indeksowanie, strukturę adresów i nagłówków, metadane, linkowanie wewnętrzne, dane strukturalne, błędy techniczne, wersję mobilną i wydajność.' },
    { question: 'Jakie dostępy są potrzebne?', answer: 'Najczęściej potrzebuję dostępu do strony, hostingu, Google Search Console i narzędzi analitycznych. Zakres dostępów zależy od tego, czy przygotowuję audyt, czy również wdrażam poprawki.' },
    { question: 'Czy optymalizacja gwarantuje pierwszą pozycję w Google?', answer: 'Nie można uczciwie zagwarantować konkretnej pozycji. Optymalizacja usuwa bariery techniczne i poprawia jakość serwisu, ale wynik zależy również od konkurencji, treści i autorytetu domeny.' },
    { question: 'Czy poprawiasz szybkość strony?', answer: 'Tak. Analizuję obrazy, skrypty, style, cache, hosting i sposób renderowania. Wdrażam zmiany możliwe w danej technologii bez naruszania kluczowych funkcji.' },
    { question: 'Czy po audycie wdrażasz zalecenia?', answer: 'Tak. Mogę przygotować listę zaleceń dla zespołu lub samodzielnie wdrożyć poprawki w uzgodnionym zakresie i zweryfikować rezultat.' },
  ];
}

function webAppFaq(location: (typeof locations)[LocationSlug]) {
  return [
    { question: `Ile kosztuje aplikacja webowa ${location.inCity}?`, answer: 'Koszt zależy od liczby ról użytkowników, procesów, ekranów, integracji i wymagań bezpieczeństwa. Najpierw określamy zakres pierwszej wersji, a następnie przygotowuję estymację.' },
    { question: 'Jak długo trwa stworzenie aplikacji?', answer: 'Termin zależy od złożoności produktu. Pracę warto podzielić na analizę, projekt UX/UI, wdrożenie, testy i rozwój kolejnych wersji, zaczynając od najważniejszych funkcji.' },
    locationQuestion(location),
    { question: 'Jakie aplikacje webowe realizujesz?', answer: 'Mogą to być panele klienta i administracyjne, systemy obsługi procesów, konfiguratory, portale, narzędzia wewnętrzne oraz rozwiązania integrujące dane z różnych usług.' },
    { question: 'Co trzeba przygotować przed rozpoczęciem?', answer: 'Najważniejszy jest opis problemu, użytkowników i obecnego procesu. Pomocne są przykładowe dane, istniejące dokumenty, lista integracji oraz wskazanie funkcji niezbędnych w pierwszej wersji.' },
    { question: 'Czy aplikację można zintegrować z innymi systemami?', answer: 'Tak, jeśli system udostępnia odpowiednie API lub inną bezpieczną metodę wymiany danych. Możliwości i ograniczenia integracji sprawdzam na etapie analizy.' },
    { question: 'Czy projekt obejmuje również UX i UI?', answer: 'Tak. Projektuję strukturę ekranów, przepływy użytkowników i interfejs, aby aplikacja wspierała konkretny proces i była czytelna na wymaganych urządzeniach.' },
    { question: 'Czy zapewniasz utrzymanie i rozwój aplikacji?', answer: 'Tak. Po uruchomieniu mogę monitorować rozwiązanie, usuwać błędy, aktualizować zależności i rozwijać kolejne funkcje na podstawie informacji od użytkowników.' },
  ];
}

function designFaq(location: (typeof locations)[LocationSlug]) {
  return [
    { question: `Ile kosztuje projekt graficzny lub UI ${location.inCity}?`, answer: 'Cena zależy od liczby ekranów lub formatów, zakresu identyfikacji wizualnej, liczby wariantów i potrzebnych materiałów. Po briefie określam zakres oraz liczbę etapów.' },
    { question: 'Jak długo trwa przygotowanie projektu?', answer: 'Termin zależy od objętości, gotowości treści i liczby rund uwag. Harmonogram obejmuje brief, kierunek wizualny, projekt właściwy, korekty i przygotowanie plików.' },
    locationQuestion(location),
    { question: 'Jakie projekty graficzne przygotowujesz?', answer: 'Projektuję layouty stron i aplikacji, landing page’e, bannery, grafiki do kampanii, prezentacje i inne materiały cyfrowe wymagające spójnego kierunku wizualnego.' },
    { question: 'Jakie materiały są potrzebne na start?', answer: 'Przydatne są logo, księga znaku, kolory, fonty, treści, zdjęcia, przykłady dotychczasowych materiałów oraz inspiracje. Jeśli marka nie ma wytycznych, zaczynamy od określenia kierunku.' },
    { question: 'Czy projektujesz również UX?', answer: 'Tak. W projektach interfejsów analizuję strukturę informacji i przepływy użytkownika, aby warstwa wizualna wspierała wygodną realizację celu.' },
    { question: 'W jakiej formie otrzymam projekt?', answer: 'Format zależy od zastosowania. Interfejsy przekazuję jako uporządkowany projekt do wdrożenia, a materiały graficzne w formatach odpowiednich do publikacji i dalszej edycji.' },
    { question: 'Czy możesz współpracować z programistą lub agencją?', answer: 'Tak. Przygotowuję projekty z myślą o wdrożeniu i mogę konsultować szczegóły z zespołem technicznym lub pracować jako partner przy realizacji dla klienta końcowego.' },
  ];
}
