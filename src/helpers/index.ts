export function parseOfferPageSlug(slug: string) {
    const normalizedSlug = slug.toLowerCase().trim().replace(/\s+/g, '-');
    const slugParts = normalizedSlug.split('-').filter(Boolean);

    return {
        locationSlug: slugParts.at(-1) ?? '',
        offerSlug: slugParts.slice(0, -1).join('-'),
    };
}