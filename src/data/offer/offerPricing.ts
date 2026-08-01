import type I_OfferPriceCard from '@/src/interface/OfferPriceCard';
import type { OfferPacketName } from '@/src/interface/OfferPriceCard';
import type { ServiceSlug } from './catalog';

const previousPacketNames: Partial<Record<OfferPacketName, string>> = {
    standard: 'podstawowym',
    premium: 'standardowym',
    custom: 'premium',
};

const packet = (packetName: OfferPacketName, priceNet: number, description: string, realizationTime: string, features: string[], displayName?: string): I_OfferPriceCard => ({
    packetName,
    displayName,
    priceNet,
    priceGross: Number((priceNet * 1.23).toFixed(2)),
    description,
    realizationTime,
    features: previousPacketNames[packetName]
        ? [`Wszystko, co w pakiecie ${previousPacketNames[packetName]}, plus:`, ...features]
        : features,
    buttonText: packetName === 'custom' ? 'Zapytaj o wycenę' : 'Skontaktuj się', buttonLink: '#contact',
});

export const offerPricing = {
    'strony-internetowe': [
        packet('basic', 1590, 'Prosta strona dla małej firmy lub marki osobistej.', '1–2 tygodnie', ['Do 5 podstron', 'Formularz kontaktowy', 'Integracja z Google Maps', 'Podstawowa optymalizacja SEO', 'Edycja treści w CMS', 'Wersja mobilna']),
        packet('standard', 2990, 'Rozbudowana strona firmowa nastawiona na pozyskiwanie klientów.', '3–4 tygodnie', ['Do 10 podstron', 'Indywidualny projekt UX/UI', 'Blog lub aktualności', 'Analityka i formularze', 'Optymalizacja szybkości', 'Szkolenie z obsługi']),
        packet('premium', 4990, 'Kompleksowy serwis z dopracowaną komunikacją i integracjami.', '5–7 tygodni', ['Do 20 podstron', 'Warsztat i architektura informacji', 'Zaawansowane animacje', 'Integracje zewnętrzne', 'Rozszerzona optymalizacja SEO', '3 miesiące opieki technicznej']),
        packet('custom', 9990, 'Dedykowany serwis o niestandardowym zakresie i funkcjach.', 'Termin indywidualny', ['Dowolna liczba widoków', 'Dedykowane funkcjonalności', 'Wielojęzyczność', 'Integracje API', 'Migracja danych', 'Indywidualny harmonogram']),
    ],
    'sklepy-woocommerce': [
        packet('basic', 3990, 'Sklep na start z podstawowym procesem sprzedaży.', '3–4 tygodnie', [
            "konfiguracja WooCommerce,",
            "do 20 produktów,",
            "produkty proste i podstawowe warianty,",
            "koszyk i proces zamówienia,",
            "jedna metoda płatności,",
            "jedna metoda dostawy,",
            "konfiguracja wiadomości e-mail,",
            "podstawowe strony regulaminowe,",
            "wersja mobilna,",
            "krótkie szkolenie."
        ]),
        packet('standard', 6990, 'Pełny sklep dla rozwijającej się sprzedaży internetowej.', '5–7 tygodni', [
            "do 100 produktów,",
            "produkty wariantowe,",
            "kategorie i filtry,",
            "płatności online,",
            "integracja z kurierem lub paczkomatami,",
            "kupony rabatowe,",
            "konfiguracja podatków,",
            "analityka sprzedaży,",
            "optymalizacja ścieżki zakupowej,",
            "szkolenie z obsługi."
        ]),
        packet('premium', 10990, 'Zaawansowany sklep z indywidualnym UX i automatyzacjami.', '8–12 tygodni', [
            "rozbudowany katalog,",
            "import produktów,",
            "zaawansowane warianty,",
            "filtry i wyszukiwarka,",
            "integracje płatności i dostaw,",
            "automatyczne faktury,",
            "porzucone koszyki,",
            "integracja z newsletterem,",
            "niestandardowe elementy UX,",
            "optymalizacja wydajności,",
            "wsparcie po uruchomieniu."
        ]),
        packet('custom', 15990, 'Platforma sprzedażowa dopasowana do niestandardowego modelu biznesowego.', 'Termin indywidualny', [
            "rozbudowany katalog,",
            "import produktów,",
            "zaawansowane warianty,",
            "filtry i wyszukiwarka,",
            "integracje płatności i dostaw,",
            "automatyczne faktury,",
            "porzucone koszyki,",
            "integracja z newsletterem,",
            "niestandardowe elementy UX,",
            "optymalizacja wydajności,",
            "wsparcie po uruchomieniu."
        ]),
    ],
    'aplikacje-webowe': [
        packet('basic', 4990, 'Prototyp lub prosta aplikacja rozwiązująca jeden proces.', '4–6 tygodni', ['Analiza wymagań', 'Do 5 kluczowych widoków', 'Logowanie użytkowników', 'Responsywny interfejs', 'Podstawowy panel administracyjny', 'Wdrożenie produkcyjne']),
        packet('standard', 9990, 'Pierwsza kompletna wersja produktu z bazą danych i integracjami.', '8–12 tygodni', ['Warsztaty produktowe', 'Do 12 widoków', 'Role i uprawnienia', 'Integracja jednego API', 'Testy funkcjonalne', 'Dokumentacja obsługi']),
        packet('premium', 19990, 'Rozbudowany system wspierający wiele ról i procesów.', '3–5 miesięcy', ['Indywidualny UX/UI', 'Zaawansowane uprawnienia', 'Wiele integracji API', 'Automatyzacje procesów', 'Testy i monitoring', '3 miesiące rozwoju']),
        packet('custom', 39990, 'Dedykowana platforma rozwijana etapami według roadmapy.', 'Termin indywidualny', ['Discovery produktowe', 'Architektura skalowalna', 'Integracje systemowe', 'Wymagania bezpieczeństwa', 'CI/CD i środowiska', 'Stały zespół rozwojowy']),
    ],
    'opieka-nad-stronami': [
        packet('basic', 290, 'Podstawowe bezpieczeństwo i regularne aktualizacje.', 'Rozliczenie miesięczne', ['Aktualizacje raz w miesiącu', 'Kopie zapasowe', 'Monitoring dostępności', 'Kontrola bezpieczeństwa', '30 minut drobnych zmian', 'Raport miesięczny']),
        packet('standard', 590, 'Stała opieka dla aktywnie rozwijanej strony.', 'Rozliczenie miesięczne', ['Aktualizacje co tydzień', 'Codzienne kopie zapasowe', 'Monitoring 24/7', '2 godziny prac', 'Wsparcie e-mail', 'Optymalizacja bazy danych']),
        packet('premium', 1190, 'Priorytetowe utrzymanie serwisu o znaczeniu biznesowym.', 'Rozliczenie miesięczne', ['Bieżące aktualizacje', 'Backup zewnętrzny', 'Reakcja do 4 godzin', '5 godzin prac', 'Monitoring wydajności', 'Raport i rekomendacje']),
        packet('custom', 1990, 'Dedykowane SLA i utrzymanie wielu serwisów.', 'Warunki indywidualne', ['Indywidualny czas reakcji', 'Opieka nad wieloma stronami', 'Środowisko testowe', 'Stały rozwój funkcji', 'Audyty bezpieczeństwa', 'Dedykowany zakres godzin']),
    ],
    'optymalizacja-seo': [
        packet('basic', 1490, 'Audyt najważniejszych technicznych elementów strony.', '5–7 dni', ['Audyt indeksowania', 'Analiza metadanych', 'Kontrola nagłówków', 'Analiza szybkości', 'Lista błędów i priorytetów', 'Raport z rekomendacjami']),
        packet('standard', 2990, 'Audyt wraz z wdrożeniem kluczowych poprawek.', '2–3 tygodnie', ['Pełny audyt techniczny', 'Wdrożenie poprawek', 'Optymalizacja obrazów', 'Dane strukturalne', 'Linkowanie wewnętrzne'])
    ],
    'projekty-graficzne-ui': [
        packet(
            'basic',
            1190,
            'Praktyczny projekt interfejsu prostej strony, przygotowany z myślą o sprawnym wdrożeniu.',
            '5–7 dni',
            [
                'Brief i ustalenie celów strony',
                'Prosta makieta układu treści',
                'Do 3 widoków strony',
                'Projekt desktop i mobile',
                'Jedna runda poprawek',
                'Projekt w Figmie gotowy do wdrożenia',
                'Dopasowanie do istniejącej identyfikacji marki'
            ]
        ),
        packet('standard', 2290, 'Rozszerzony projekt interfejsu strony firmowej, dopasowany do jej treści, funkcji i późniejszego wdrożenia.', '2–3 tygodnie', ['Analiza potrzeb i inspiracji', 'Makiety kluczowych widoków', 'Do 8 widoków strony', 'Projekt desktop i mobile', 'Komponenty UI potrzebne do wdrożenia', 'Dwie rundy poprawek', 'Uporządkowany projekt w Figmie'], 'Rozszerzony'),
    ],
} satisfies Record<ServiceSlug, I_OfferPriceCard[]>;

export default function resolveOfferPacketName(packetName: OfferPacketName) {
    const packetNames: Record<OfferPacketName, string> = { basic: 'Podstawowy', standard: 'Standardowy', premium: 'Premium', custom: 'Custom' };
    return packetNames[packetName];
}
