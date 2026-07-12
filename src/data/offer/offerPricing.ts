import type I_OfferPriceCard from '@/src/interface/OfferPriceCard';
import type { OfferPacketName } from '@/src/interface/OfferPriceCard';
import type { ServiceSlug } from './catalog';

const packet = (packetName: OfferPacketName, priceNet: number, description: string, realizationTime: string, features: string[]): I_OfferPriceCard => ({
    packetName, priceNet, priceGross: Number((priceNet * 1.23).toFixed(2)), description, realizationTime, features,
    buttonText: packetName === 'custom' ? 'Zapytaj o wycenę' : 'Skontaktuj się', buttonLink: '#contact',
});

export const offerPricing = {
    'strony-internetowe': [
        packet('basic', 2990, 'Prosta strona dla małej firmy lub marki osobistej.', '1–2 tygodnie', ['Do 5 podstron', 'Formularz kontaktowy', 'Integracja z Google Maps', 'Podstawowa optymalizacja SEO', 'Edycja treści w CMS', 'Wersja mobilna']),
        packet('standard', 4990, 'Rozbudowana strona firmowa nastawiona na pozyskiwanie klientów.', '3–4 tygodnie', ['Do 10 podstron', 'Indywidualny projekt UX/UI', 'Blog lub aktualności', 'Analityka i formularze', 'Optymalizacja szybkości', 'Szkolenie z obsługi']),
        packet('premium', 7990, 'Kompleksowy serwis z dopracowaną komunikacją i integracjami.', '5–7 tygodni', ['Do 20 podstron', 'Warsztat i architektura informacji', 'Zaawansowane animacje', 'Integracje zewnętrzne', 'Rozszerzona optymalizacja SEO', '3 miesiące opieki technicznej']),
        packet('custom', 9990, 'Dedykowany serwis o niestandardowym zakresie i funkcjach.', 'Termin indywidualny', ['Dowolna liczba widoków', 'Dedykowane funkcjonalności', 'Wielojęzyczność', 'Integracje API', 'Migracja danych', 'Indywidualny harmonogram']),
    ],
    'sklepy-woocommerce': [
        packet('basic', 3990, 'Sklep na start z podstawowym procesem sprzedaży.', '3–4 tygodnie', ['Do 30 produktów', 'Płatności online', 'Jedna metoda dostawy', 'Konfiguracja podatków', 'E-maile transakcyjne', 'Szkolenie z obsługi']),
        packet('standard', 6990, 'Pełny sklep dla rozwijającej się sprzedaży internetowej.', '5–7 tygodni', ['Do 100 produktów', 'Warianty i kupony', 'Płatności i kurierzy', 'Integracja z analityką', 'Optymalizacja koszyka', 'Import produktów']),
        packet('premium', 10990, 'Zaawansowany sklep z indywidualnym UX i automatyzacjami.', '8–12 tygodni', ['Nielimitowany katalog', 'Indywidualny projekt UX/UI', 'Integracje ERP lub CRM', 'Automatyzacje sprzedaży', 'Zaawansowane raportowanie', '3 miesiące wsparcia']),
        packet('custom', 15990, 'Platforma sprzedażowa dopasowana do niestandardowego modelu biznesowego.', 'Termin indywidualny', ['Sprzedaż B2B lub marketplace', 'Dedykowane integracje API', 'Cenniki i role klientów', 'Migracja dużego katalogu', 'Wielojęzyczność i waluty', 'Indywidualny harmonogram']),
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
    'aplikacje-webowe': [
        packet('basic', 4990, 'Prototyp lub prosta aplikacja rozwiązująca jeden proces.', '4–6 tygodni', ['Analiza wymagań', 'Do 5 kluczowych widoków', 'Logowanie użytkowników', 'Responsywny interfejs', 'Podstawowy panel administracyjny', 'Wdrożenie produkcyjne']),
        packet('standard', 9990, 'Pierwsza kompletna wersja produktu z bazą danych i integracjami.', '8–12 tygodni', ['Warsztaty produktowe', 'Do 12 widoków', 'Role i uprawnienia', 'Integracja jednego API', 'Testy funkcjonalne', 'Dokumentacja obsługi']),
        packet('premium', 19990, 'Rozbudowany system wspierający wiele ról i procesów.', '3–5 miesięcy', ['Indywidualny UX/UI', 'Zaawansowane uprawnienia', 'Wiele integracji API', 'Automatyzacje procesów', 'Testy i monitoring', '3 miesiące rozwoju']),
        packet('custom', 39990, 'Dedykowana platforma rozwijana etapami według roadmapy.', 'Termin indywidualny', ['Discovery produktowe', 'Architektura skalowalna', 'Integracje systemowe', 'Wymagania bezpieczeństwa', 'CI/CD i środowiska', 'Stały zespół rozwojowy']),
    ],
    'projekty-graficzne-ui': [
        packet('basic', 1490, 'Spójny projekt pojedynczej strony lub małego zestawu materiałów.', '5–7 dni', ['Brief projektowy', 'Jeden kierunek wizualny', 'Do 3 ekranów lub formatów', 'Jedna runda poprawek', 'Pliki do publikacji', 'Uporządkowane źródła']),
        packet('standard', 2990, 'Kompletny projekt strony firmowej lub zestawu interfejsów.', '2–3 tygodnie', ['Analiza inspiracji', 'Do 8 ekranów', 'Wersja desktop i mobile', 'Dwie rundy poprawek', 'Biblioteka komponentów', 'Przekazanie dla developera']),
        packet('premium', 5990, 'Rozbudowany system UI dla produktu cyfrowego.', '4–6 tygodni', ['Do 20 ekranów', 'Prototyp interaktywny', 'Design system', 'Stany i warianty komponentów', 'Konsultacje wdrożeniowe']),
    ],
} satisfies Record<ServiceSlug, I_OfferPriceCard[]>;

export default function resolveOfferPacketName(packetName: OfferPacketName) {
    const packetNames: Record<OfferPacketName, string> = { basic: 'Podstawowy', standard: 'Standardowy', premium: 'Premium', custom: 'Custom' };
    return packetNames[packetName];
}
