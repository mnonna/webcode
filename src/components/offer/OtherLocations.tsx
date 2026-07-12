import Link from 'next/link';
import { locations, type LocationSlug, type ServiceSlug } from '@/src/data/offer/catalog';

type OtherLocationsProps = {
    serviceSlug: ServiceSlug;
    currentLocationSlug: LocationSlug;
};

export default function OtherLocations({ serviceSlug, currentLocationSlug }: OtherLocationsProps) {
    const otherLocations = (Object.entries(locations) as Array<
        [LocationSlug, (typeof locations)[LocationSlug]]
    >).filter(([locationSlug]) => locationSlug !== currentLocationSlug);

    return (
        <section className="section" aria-labelledby="other-locations-heading">
            <div className="section-shell">
                <div className="flex flex-col items-center text-center">
                    <div className="wc-eyebrow justify-center">Lokalizacje</div>
                    <h2 id="other-locations-heading" className="wc-heading-section wc-text-dark">
                        Sprawdź w <span className="wc-text-highlight">innych lokalizacjach</span>
                    </h2>

                    <nav
                        className="mt-8 flex flex-wrap justify-center gap-3"
                        aria-label="Ta sama oferta w innych lokalizacjach"
                    >
                        {otherLocations.map(([locationSlug, location]) => (
                            <Link
                                key={locationSlug}
                                href={`/oferta/${serviceSlug}-${locationSlug}`}
                                className="rounded-full border border-[var(--wc-border)] bg-white px-5 py-3 text-[0.95rem] font-[600] text-[var(--wc-dark)] transition-colors hover:border-[var(--wc-blue)] hover:bg-[var(--wc-blue-soft)] hover:text-[var(--wc-blue)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--wc-blue)]"
                            >
                                {location.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
}
