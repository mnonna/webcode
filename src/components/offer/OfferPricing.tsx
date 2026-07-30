"use client";

import { useState } from 'react';
import { Code2, LayoutTemplate, PencilRuler, Search, ShieldCheck, ShoppingCart } from 'lucide-react';
import OfferPriceCard from './OfferPriceCard';
import Tabs, { type TabItem } from '@/src/components/common/Tabs';
import { offerPricing } from '@/src/data/offer/offerPricing';
import type { ServiceSlug } from '@/src/data/offer/catalog';
import { useGsapReveal } from '@/src/hooks/useGsapReveal';

const offerTabs: TabItem<ServiceSlug>[] = [
    { value: 'strony-internetowe', label: 'Strony internetowe', icon: LayoutTemplate },
    { value: 'sklepy-woocommerce', label: 'Sklepy internetowe', icon: ShoppingCart },
    { value: 'optymalizacja-seo', label: 'Pozycjonowanie (SEO)', icon: Search },
    { value: 'opieka-nad-stronami', label: 'Opieka i rozwój', icon: ShieldCheck },
    { value: 'aplikacje-webowe', label: 'Aplikacje webowe', icon: Code2 },
    { value: 'projekty-graficzne-ui', label: 'Projekty graficzne i UI', icon: PencilRuler },
];

type OfferPricingProps = {
    serviceSlug?: ServiceSlug;
};

export default function OfferPricing({ serviceSlug }: OfferPricingProps) {
    const [selectedService, setSelectedService] = useState<ServiceSlug>(serviceSlug ?? 'strony-internetowe');
    const activeService = serviceSlug ?? selectedService;
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
    const packets = offerPricing[activeService];

    return (
        <section ref={sectionRef} className="section section--offerPricing">
            <div className="section-shell">
                <div data-offer-pricing-reveal="" className="flex flex-col items-center gap-8 mb-10 text-center mx-auto">
                    <h2 className="wc-heading-section max-w-[24ch] lg:max-w-[50ch]">Wybierz odpowiedni pakiet <span className="wc-text-highlight">dla siebie</span></h2>
                    <p className="wc-body-md lg:max-w-[70ch]">Porównaj dostępne warianty i wybierz zakres dopasowany do potrzeb, etapu rozwoju oraz budżetu Twojej firmy. Każdy pakiet możesz później rozbudować lub dostosować indywidualnie.</p>
                </div>
                {!serviceSlug && (
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
                        id={serviceSlug ? undefined : 'offer-pricing-panel'}
                        role={serviceSlug ? undefined : 'tabpanel'}
                        aria-labelledby={serviceSlug ? undefined : `tab-${activeService}`}
                        className="contents"
                    >
                        {packets.map((packet) => (
                            <OfferPriceCard key={packet.packetName} {...packet} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
