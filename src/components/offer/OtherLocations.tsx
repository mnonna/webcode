import {Link} from '@/src/i18n/navigation';
import { locations, type LocationSlug, type ServiceSlug } from '@/src/data/offer/catalog';
import Section from '@/src/components/common/Section';
import type { SectionSpacing } from '@/src/components/common/Section';

type OtherLocationsProps = {
    serviceSlug: ServiceSlug | string;
    currentLocationSlug?: LocationSlug;
    items?: Array<{ name: string; slug: string }>;
    eyebrow?: string;
    title?: string;
    titleHighlight?: string;
    anchor?: string | null;
    paddingTop?: SectionSpacing | null;
    paddingBottom?: SectionSpacing | null;
};

export default function OtherLocations({
    serviceSlug,
    currentLocationSlug,
    items,
    eyebrow = 'Lokalizacje',
    title = 'Sprawdź w',
    titleHighlight = 'innych lokalizacjach',
    anchor,
    paddingTop,
    paddingBottom,
}: OtherLocationsProps) {
    const otherLocations = items ?? (Object.entries(locations) as Array<
        [LocationSlug, (typeof locations)[LocationSlug]]
    >)
        .filter(([locationSlug]) => locationSlug !== currentLocationSlug)
        .map(([slug, location]) => ({ slug, name: location.name }));

    return (
        <Section id={anchor ?? undefined} paddingTop={paddingTop} paddingBottom={paddingBottom} aria-labelledby="other-locations-heading">
            <div className="section-shell">
                <div className="flex flex-col items-center text-center">
                    <div className="wc-eyebrow justify-center">{eyebrow}</div>
                    <h2 id="other-locations-heading" className="wc-heading-section wc-text-dark">
                        {title} <span className="wc-text-highlight">{titleHighlight}</span>
                    </h2>

                    <nav
                        className="mt-8 flex flex-wrap justify-center gap-3"
                        aria-label="Ta sama oferta w innych lokalizacjach"
                    >
                        {otherLocations.map((location) => (
                            <Link
                                key={location.slug}
                                href={`/oferta/${serviceSlug}-${location.slug}`}
                                className="rounded-full border border-[var(--wc-border)] bg-white px-5 py-3 text-[0.95rem] font-[600] text-[var(--wc-dark)] transition-colors hover:border-[var(--wc-blue)] hover:bg-[var(--wc-blue-soft)] hover:text-[var(--wc-blue)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--wc-blue)]"
                            >
                                {location.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </Section>
    );
}
