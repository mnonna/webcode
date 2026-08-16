"use client";

import { useState } from 'react';
import { Code2, LayoutTemplate, PencilRuler, Search, ShieldCheck, ShoppingCart } from 'lucide-react';
import OfferPriceCard from './OfferPriceCard';
import Tabs, { type TabItem } from '@/src/components/common/Tabs';
import { offerPricing } from '@/src/data/offer/offerPricing';
import type { ServiceSlug } from '@/src/data/offer/catalog';
import { useGsapReveal } from '@/src/hooks/useGsapReveal';
import Section from '@/src/components/common/Section';
import type { SectionSpacing } from '@/src/components/common/Section';
import type I_OfferPriceCard from '@/src/interface/OfferPriceCard';

const pricingIcons = {
    'layout-template': LayoutTemplate,
    'shopping-cart': ShoppingCart,
    'code-2': Code2,
    'shield-check': ShieldCheck,
    search: Search,
    'pencil-ruler': PencilRuler,
};

export type OfferPricingSet = {
    key: string;
    label: string;
    iconKey: string;
    packages: I_OfferPriceCard[];
};

const defaultPricingSets: OfferPricingSet[] = [
    { key: 'strony-internetowe', label: 'Strony internetowe', iconKey: 'layout-template', packages: offerPricing['strony-internetowe'] },
    { key: 'sklepy-woocommerce', label: 'Sklepy internetowe', iconKey: 'shopping-cart', packages: offerPricing['sklepy-woocommerce'] },
    { key: 'aplikacje-webowe', label: 'Aplikacje webowe', iconKey: 'code-2', packages: offerPricing['aplikacje-webowe'] },
    { key: 'opieka-nad-stronami', label: 'Opieka i rozwój', iconKey: 'shield-check', packages: offerPricing['opieka-nad-stronami'] },
    { key: 'optymalizacja-seo', label: 'Pozycjonowanie (SEO)', iconKey: 'search', packages: offerPricing['optymalizacja-seo'] },
    { key: 'projekty-graficzne-ui', label: 'Projekty UI/UX', iconKey: 'pencil-ruler', packages: offerPricing['projekty-graficzne-ui'] },
];

type OfferPricingProps = {
    serviceSlug?: ServiceSlug;
    pricingKey?: string | null;
    showTabs?: boolean;
    pricingSets?: OfferPricingSet[];
    eyebrow?: string | null;
    title?: string;
    titleHighlight?: string;
    description?: string;
    anchor?: string | null;
    paddingTop?: SectionSpacing | null;
    paddingBottom?: SectionSpacing | null;
};

export default function OfferPricing({
    serviceSlug,
    pricingKey,
    showTabs = !serviceSlug,
    pricingSets,
    eyebrow,
    title = 'Wybierz odpowiedni pakiet',
    titleHighlight = 'dla siebie',
    description = 'Porównaj dostępne warianty i wybierz zakres dopasowany do potrzeb, etapu rozwoju oraz budżetu Twojej firmy. Każdy pakiet możesz później rozbudować lub dostosować indywidualnie.',
    anchor,
    paddingTop,
    paddingBottom,
}: OfferPricingProps) {
    const availableSets = pricingSets?.length ? pricingSets : defaultPricingSets;
    const initialKey = serviceSlug ?? pricingKey ?? availableSets[0]?.key ?? 'strony-internetowe';
    const [selectedService, setSelectedService] = useState(initialKey);
    const activeService = serviceSlug ?? pricingKey ?? selectedService;
    const sectionRef = useGsapReveal<HTMLElement>({
        selector: '[data-offer-pricing-reveal]',
        start: 'top 82%',
    });
    const cardsRef = useGsapReveal<HTMLDivElement>({
        selector: '[data-offer-pricing-card]',
        start: 'top 88%',
        duration: 0.65,
        ease: 'power2.out',
        dependencyKey: activeService,
    });
    const activePricingSet = availableSets.find((pricingSet) => pricingSet.key === activeService) ?? availableSets[0];
    const packets = activePricingSet?.packages ?? [];
    const offerTabs: TabItem<string>[] = availableSets.map((pricingSet) => ({
        value: pricingSet.key,
        label: pricingSet.label,
        icon: pricingIcons[pricingSet.iconKey as keyof typeof pricingIcons] ?? LayoutTemplate,
    }));

    return (
        <Section ref={sectionRef} id={anchor ?? undefined} paddingTop={paddingTop} paddingBottom={paddingBottom}>
            <div className="section-shell">
                <div data-offer-pricing-reveal="" className="flex flex-col items-center gap-8 mb-10 text-center mx-auto">
                    {eyebrow && <div className="wc-eyebrow justify-center">{eyebrow}</div>}
                    <h2 className="wc-heading-section max-w-[24ch] lg:max-w-[50ch]">{title} <span className="wc-text-highlight">{titleHighlight}</span></h2>
                    <p className="wc-body-md lg:max-w-[70ch]">{description}</p>
                </div>
                {showTabs && offerTabs.length > 1 && (
                    <div data-offer-pricing-reveal="" className='flex justify-center mb-10 last:mb-0'>
                        <Tabs
                            items={offerTabs}
                            activeValue={activeService}
                            onValueChange={setSelectedService}
                            ariaLabel="Rodzaj oferty"
                            panelId="offer-pricing-panel"
                        />
                    </div>
                )}
                <div ref={cardsRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    <div
                        key={activeService}
                        id={showTabs ? 'offer-pricing-panel' : undefined}
                        role={showTabs ? 'tabpanel' : undefined}
                        aria-labelledby={showTabs ? `tab-${activeService}` : undefined}
                        className="contents"
                    >
                        {packets.map((packet) => (
                            <OfferPriceCard key={packet.packetName} {...packet} />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
