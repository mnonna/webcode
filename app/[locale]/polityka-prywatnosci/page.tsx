import { privacyPolicy } from '@/src/data/privacy';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import Section from '@/src/components/common/Section';
import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import {getCmsPageBySlug} from '@/src/lib/strapi';
import type {AppLocale} from '@/src/i18n/routing';
import {getAvailableAlternates} from '@/src/i18n/seo';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';

type PrivacyPageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: PrivacyPageProps): Promise<Metadata> {
    const {locale} = await params;
    setRequestLocale(locale);
    const [page, t] = await Promise.all([
        locale === 'en' ? getCmsPageBySlug('privacy-policy', locale) : Promise.resolve(null),
        getTranslations({locale, namespace: 'Metadata'}),
    ]);
    return {
        title: page?.seo?.metaTitle ?? t('privacyTitle'),
        description: page?.seo?.metaDescription ?? t('privacyDescription'),
        alternates: getAvailableAlternates(locale, {[locale]: '/polityka-prywatnosci'}),
        robots: page?.seo?.noIndex ? {index: false, follow: false} : undefined,
    };
}

export default async function PrivacyPolicyPage({params}: PrivacyPageProps) {
    const {locale} = await params;
    setRequestLocale(locale);
    const page = locale === 'en' ? await getCmsPageBySlug('privacy-policy', locale) : null;
    if (locale === 'en' && !page?.blocks?.length) notFound();
    const localeLinks = Object.fromEntries(
        (page?.localizations ?? [{locale: 'pl'}]).map((item) => [item.locale, '/polityka-prywatnosci']),
    );

    return (
        <div className="min-h-screen">
            <Header localeLinks={localeLinks} />
            <main>
                {page?.blocks?.length ? <CmsPageBlocks blocks={page.blocks} /> : <Section className="wysiwyg">
                    <div className="section-shell">
                        <article className='wysiwyg xl:max-w-[1000px] mx-auto' dangerouslySetInnerHTML={{ __html: privacyPolicy }}></article>
                    </div>
                </Section>}
            </main>
            <Footer />
        </div>
    )
}
