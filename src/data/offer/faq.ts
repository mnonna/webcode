import I_Faq from '../../interface/Faq';
import { parseOfferPageSlug } from '@/src/helpers';
import { getOfferDefinition } from '@/src/data/offer/catalog';

type FaqOfferData = Record<string, Record<string, I_Faq[]>>;
const emptyFaqOffer: I_Faq[] = [];

export default function getOfferFaq(slug: string): I_Faq[] {
    const offer = getOfferDefinition(slug);
    if (offer) return offer.service.faq(offer.location);

    const { offerSlug, locationSlug } = parseOfferPageSlug(slug);

    const faqOfferData: FaqOfferData = {
        'strony-internetowe': {
            'poznan': [
                {
                    "question": "Ile kosztuje strona internetowa w Poznaniu?",
                    "answer": "Koszt strony zależy od zakresu projektu, liczby podstron, funkcji, poziomu indywidualnego projektu oraz tego, czy potrzebujesz dodatkowego wsparcia, np. przy treściach, SEO lub opiece technicznej. Po krótkiej rozmowie mogę przygotować wstępną wycenę dopasowaną do Twoich potrzeb."
                },
                {
                    "question": "Jak długo trwa wykonanie strony?",
                    "answer": "Czas realizacji zależy od rozbudowania strony i szybkości przekazywania materiałów. Prosta strona firmowa może powstać szybciej, a większy projekt z dodatkowymi funkcjami, integracjami lub sklepem WooCommerce wymaga więcej czasu."
                },
                {
                    "question": "Czy muszę być z Poznania, żeby rozpocząć współpracę?",
                    "answer": "Nie. Współpracuję zarówno z firmami z Poznania i okolic, jak i z klientami z całej Polski. Cały proces można wygodnie przeprowadzić zdalnie — od omówienia potrzeb, przez projekt, po wdrożenie strony."
                },
                {
                    "question": "Czy strona będzie oparta o WordPress?",
                    "answer": "Tak, najczęściej wdrażam strony na WordPressie, ponieważ daje dużą elastyczność i pozwala wygodnie zarządzać treściami. W przypadku sklepów internetowych korzystam z WooCommerce."
                },
                {
                    "question": "Czy pomagasz z treściami na stronę?",
                    "answer": "Tak. Mogę pomóc uporządkować strukturę treści, przygotować układ sekcji i wskazać, jakie informacje warto umieścić na stronie. Dzięki temu witryna jest bardziej czytelna dla użytkownika i lepiej prowadzi do kontaktu."
                },
                {
                    "question": "Czy po wdrożeniu mogę liczyć na opiekę techniczną?",
                    "answer": "Tak. Po publikacji strony mogę zająć się aktualizacjami, backupami, drobnymi zmianami, rozwojem strony oraz bieżącym wsparciem technicznym."
                },
                {
                    "question": "Czy wykonujesz też sklepy WooCommerce?",
                    "answer": "Tak. Projektuję i wdrażam sklepy internetowe oparte o WooCommerce — od konfiguracji produktów i płatności po przygotowanie wygodnej ścieżki zakupowej."
                },
                {
                    "question": "Czy projektujesz landing page’e pod kampanie?",
                    "answer": "Tak. Mogę przygotować landing page pod konkretną usługę, kampanię reklamową, lokalną ofertę lub test nowego pomysłu biznesowego. Taka strona skupia się na jednym celu i prowadzi użytkownika do wykonania konkretnej akcji."
                }
            ],
            'komorniki': [
                {
                    "question": "Ile kosztuje strona internetowa w Komornikach?",
                    "answer": "Koszt strony zależy od zakresu projektu, liczby podstron, funkcji, poziomu indywidualnego projektu oraz tego, czy potrzebujesz dodatkowego wsparcia, np. przy treściach, SEO lub opiece technicznej. Po krótkiej rozmowie mogę przygotować wstępną wycenę dopasowaną do Twoich potrzeb."
                },
                {
                    "question": "Jak długo trwa wykonanie strony?",
                    "answer": "Czas realizacji zależy od rozbudowania strony i szybkości przekazywania materiałów. Prosta strona firmowa może powstać szybciej, a większy projekt z dodatkowymi funkcjami, integracjami lub sklepem WooCommerce wymaga więcej czasu."
                },
                {
                    "question": "Czy muszę być z Komornik, żeby rozpocząć współpracę?",
                    "answer": "Nie. Współpracuję zarówno z firmami z Komornik i okolic, jak i z klientami z całej Polski. Cały proces można wygodnie przeprowadzić zdalnie — od omówienia potrzeb, przez projekt, po wdrożenie strony."
                },
                {
                    "question": "Czy strona będzie oparta o WordPress?",
                    "answer": "Tak, najczęściej wdrażam strony na WordPressie, ponieważ daje dużą elastyczność i pozwala wygodnie zarządzać treściami. W przypadku sklepów internetowych korzystam z WooCommerce."
                },
                {
                    "question": "Czy pomagasz z treściami na stronę?",
                    "answer": "Tak. Mogę pomóc uporządkować strukturę treści, przygotować układ sekcji i wskazać, jakie informacje warto umieścić na stronie. Dzięki temu witryna jest bardziej czytelna dla użytkownika i lepiej prowadzi do kontaktu."
                },
                {
                    "question": "Czy po wdrożeniu mogę liczyć na opiekę techniczną?",
                    "answer": "Tak. Po publikacji strony mogę zająć się aktualizacjami, backupami, drobnymi zmianami, rozwojem strony oraz bieżącym wsparciem technicznym."
                },
                {
                    "question": "Czy wykonujesz też sklepy WooCommerce?",
                    "answer": "Tak. Projektuję i wdrażam sklepy internetowe oparte o WooCommerce — od konfiguracji produktów i płatności po przygotowanie wygodnej ścieżki zakupowej."
                },
                {
                    "question": "Czy projektujesz landing page’e pod kampanie?",
                    "answer": "Tak. Mogę przygotować landing page pod konkretną usługę, kampanię reklamową, lokalną ofertę lub test nowego pomysłu biznesowego. Taka strona skupia się na jednym celu i prowadzi użytkownika do wykonania konkretnej akcji."
                }
            ],
            'wagrowiec': [
                {
                    "question": "Ile kosztuje strona internetowa w Wągrowcu?",
                    "answer": "Koszt strony zależy od zakresu projektu, liczby podstron, funkcji, poziomu indywidualnego projektu oraz tego, czy potrzebujesz dodatkowego wsparcia, np. przy treściach, SEO lub opiece technicznej. Po krótkiej rozmowie mogę przygotować wstępną wycenę dopasowaną do Twoich potrzeb."
                },
                {
                    "question": "Jak długo trwa wykonanie strony?",
                    "answer": "Czas realizacji zależy od rozbudowania strony i szybkości przekazywania materiałów. Prosta strona firmowa może powstać szybciej, a większy projekt z dodatkowymi funkcjami, integracjami lub sklepem WooCommerce wymaga więcej czasu."
                },
                {
                    "question": "Czy muszę być z Wągrowca, żeby rozpocząć współpracę?",
                    "answer": "Nie. Współpracuję zarówno z firmami z Wągrowca i okolic, jak i z klientami z całej Polski. Cały proces można wygodnie przeprowadzić zdalnie — od omówienia potrzeb, przez projekt, po wdrożenie strony."
                },
                {
                    "question": "Czy strona będzie oparta o WordPress?",
                    "answer": "Tak, najczęściej wdrażam strony na WordPressie, ponieważ daje dużą elastyczność i pozwala wygodnie zarządzać treściami. W przypadku sklepów internetowych korzystam z WooCommerce."
                },
                {
                    "question": "Czy pomagasz z treściami na stronę?",
                    "answer": "Tak. Mogę pomóc uporządkować strukturę treści, przygotować układ sekcji i wskazać, jakie informacje warto umieścić na stronie. Dzięki temu witryna jest bardziej czytelna dla użytkownika i lepiej prowadzi do kontaktu."
                },
                {
                    "question": "Czy po wdrożeniu mogę liczyć na opiekę techniczną?",
                    "answer": "Tak. Po publikacji strony mogę zająć się aktualizacjami, backupami, drobnymi zmianami, rozwojem strony oraz bieżącym wsparciem technicznym."
                },
                {
                    "question": "Czy wykonujesz też sklepy WooCommerce?",
                    "answer": "Tak. Projektuję i wdrażam sklepy internetowe oparte o WooCommerce — od konfiguracji produktów i płatności po przygotowanie wygodnej ścieżki zakupowej."
                },
                {
                    "question": "Czy projektujesz landing page’e pod kampanie?",
                    "answer": "Tak. Mogę przygotować landing page pod konkretną usługę, kampanię reklamową, lokalną ofertę lub test nowego pomysłu biznesowego. Taka strona skupia się na jednym celu i prowadzi użytkownika do wykonania konkretnej akcji."
                }
            ],
            'chodziez': [
                {
                    "question": "Ile kosztuje strona internetowa w Chodzieży?",
                    "answer": "Koszt strony zależy od zakresu projektu, liczby podstron, funkcji, poziomu indywidualnego projektu oraz tego, czy potrzebujesz dodatkowego wsparcia, np. przy treściach, SEO lub opiece technicznej. Po krótkiej rozmowie mogę przygotować wstępną wycenę dopasowaną do Twoich potrzeb."
                },
                {
                    "question": "Jak długo trwa wykonanie strony?",
                    "answer": "Czas realizacji zależy od rozbudowania strony i szybkości przekazywania materiałów. Prosta strona firmowa może powstać szybciej, a większy projekt z dodatkowymi funkcjami, integracjami lub sklepem WooCommerce wymaga więcej czasu."
                },
                {
                    "question": "Czy muszę być z Chodzieży, żeby rozpocząć współpracę?",
                    "answer": "Nie. Współpracuję zarówno z firmami z Chodzieży i okolic, jak i z klientami z całej Polski. Cały proces można wygodnie przeprowadzić zdalnie — od omówienia potrzeb, przez projekt, po wdrożenie strony."
                },
                {
                    "question": "Czy strona będzie oparta o WordPress?",
                    "answer": "Tak, najczęściej wdrażam strony na WordPressie, ponieważ daje dużą elastyczność i pozwala wygodnie zarządzać treściami. W przypadku sklepów internetowych korzystam z WooCommerce."
                },
                {
                    "question": "Czy pomagasz z treściami na stronę?",
                    "answer": "Tak. Mogę pomóc uporządkować strukturę treści, przygotować układ sekcji i wskazać, jakie informacje warto umieścić na stronie. Dzięki temu witryna jest bardziej czytelna dla użytkownika i lepiej prowadzi do kontaktu."
                },
                {
                    "question": "Czy po wdrożeniu mogę liczyć na opiekę techniczną?",
                    "answer": "Tak. Po publikacji strony mogę zająć się aktualizacjami, backupami, drobnymi zmianami, rozwojem strony oraz bieżącym wsparciem technicznym."
                },
                {
                    "question": "Czy wykonujesz też sklepy WooCommerce?",
                    "answer": "Tak. Projektuję i wdrażam sklepy internetowe oparte o WooCommerce — od konfiguracji produktów i płatności po przygotowanie wygodnej ścieżki zakupowej."
                },
                {
                    "question": "Czy projektujesz landing page’e pod kampanie?",
                    "answer": "Tak. Mogę przygotować landing page pod konkretną usługę, kampanię reklamową, lokalną ofertę lub test nowego pomysłu biznesowego. Taka strona skupia się na jednym celu i prowadzi użytkownika do wykonania konkretnej akcji."
                }
            ],
            'pila': [
                {
                    "question": "Ile kosztuje strona internetowa w Pile?",
                    "answer": "Koszt strony zależy od zakresu projektu, liczby podstron, funkcji, poziomu indywidualnego projektu oraz tego, czy potrzebujesz dodatkowego wsparcia, np. przy treściach, SEO lub opiece technicznej. Po krótkiej rozmowie mogę przygotować wstępną wycenę dopasowaną do Twoich potrzeb."
                },
                {
                    "question": "Jak długo trwa wykonanie strony?",
                    "answer": "Czas realizacji zależy od rozbudowania strony i szybkości przekazywania materiałów. Prosta strona firmowa może powstać szybciej, a większy projekt z dodatkowymi funkcjami, integracjami lub sklepem WooCommerce wymaga więcej czasu."
                },
                {
                    "question": "Czy muszę być z Piły, żeby rozpocząć współpracę?",
                    "answer": "Nie. Współpracuję zarówno z firmami z Piły i okolic, jak i z klientami z całej Polski. Cały proces można wygodnie przeprowadzić zdalnie — od omówienia potrzeb, przez projekt, po wdrożenie strony."
                },
                {
                    "question": "Czy strona będzie oparta o WordPress?",
                    "answer": "Tak, najczęściej wdrażam strony na WordPressie, ponieważ daje dużą elastyczność i pozwala wygodnie zarządzać treściami. W przypadku sklepów internetowych korzystam z WooCommerce."
                },
                {
                    "question": "Czy pomagasz z treściami na stronę?",
                    "answer": "Tak. Mogę pomóc uporządkować strukturę treści, przygotować układ sekcji i wskazać, jakie informacje warto umieścić na stronie. Dzięki temu witryna jest bardziej czytelna dla użytkownika i lepiej prowadzi do kontaktu."
                },
                {
                    "question": "Czy po wdrożeniu mogę liczyć na opiekę techniczną?",
                    "answer": "Tak. Po publikacji strony mogę zająć się aktualizacjami, backupami, drobnymi zmianami, rozwojem strony oraz bieżącym wsparciem technicznym."
                },
                {
                    "question": "Czy wykonujesz też sklepy WooCommerce?",
                    "answer": "Tak. Projektuję i wdrażam sklepy internetowe oparte o WooCommerce — od konfiguracji produktów i płatności po przygotowanie wygodnej ścieżki zakupowej."
                },
                {
                    "question": "Czy projektujesz landing page’e pod kampanie?",
                    "answer": "Tak. Mogę przygotować landing page pod konkretną usługę, kampanię reklamową, lokalną ofertę lub test nowego pomysłu biznesowego. Taka strona skupia się na jednym celu i prowadzi użytkownika do wykonania konkretnej akcji."
                }
            ],
        },
    };

    return faqOfferData[offerSlug]?.[locationSlug] || emptyFaqOffer;
}
