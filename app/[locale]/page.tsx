import {notFound} from 'next/navigation';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import HomeHero from '@/src/components/home/HomeHero';
import HomeAbout from '@/src/components/home/HomeAbout';
import HomeStory from '@/src/components/home/HomeStory';
import HomeCaseStudies from '@/src/components/home/HomeCaseStudies';
import HomeServices from '@/src/components/home/HomeServices';
import HomeApproach from '@/src/components/home/HomeApproach';
import HomeB2B from '@/src/components/home/HomeB2B';
import HomeProcess from '@/src/components/home/HomeProcess';
import Faq from '@/src/components/home/Faq';
import HomeContact from '@/src/components/home/HomeContact';
import Section from '@/src/components/common/Section';
import CmsPageBlocks from '@/src/components/cms/CmsPageBlocks';
import { getCmsPageBySlug } from '@/src/lib/strapi';
import type {AppLocale} from '@/src/i18n/routing';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {getAvailableAlternates, getLocalizedUrl, OPEN_GRAPH_LOCALE} from '@/src/i18n/seo';

type HomePageProps = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: HomePageProps): Promise<Metadata> {
  const {locale} = await params;
  setRequestLocale(locale);
  const [page, t] = await Promise.all([
    getCmsPageBySlug('home', locale),
    getTranslations({locale, namespace: 'Metadata'}),
  ]);
  const localizedPaths = Object.fromEntries(
    (page?.localizations ?? [{locale, slug: 'home'}]).map((item) => [item.locale, '/']),
  ) as Partial<Record<AppLocale, string>>;
  return {
    title: page?.seo?.metaTitle ?? t('homeTitle'),
    description: page?.seo?.metaDescription ?? t('homeDescription'),
    alternates: getAvailableAlternates(locale, localizedPaths),
    robots: page?.seo?.noIndex ? {index: false, follow: false} : undefined,
    openGraph: {
      title: page?.seo?.metaTitle ?? t('homeTitle'),
      description: page?.seo?.metaDescription ?? t('homeDescription'),
      url: getLocalizedUrl(locale, '/'),
      locale: OPEN_GRAPH_LOCALE[locale],
      type: 'website',
    },
  };
}

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;
  setRequestLocale(locale);
  const page = await getCmsPageBySlug('home', locale);

  if (locale !== 'pl' && !page?.blocks?.length) notFound();
  const localeLinks = Object.fromEntries(
    (page?.localizations ?? [{locale: 'pl'}]).map((item) => [item.locale, '/']),
  );

  return (
    <div className="min-h-screen">
      <Header localeLinks={localeLinks} />
      <main>
        {page?.blocks?.length ? (
          <CmsPageBlocks blocks={page.blocks} />
        ) : (
          <>
            <HomeHero />
            <HomeAbout />
            <HomeStory />
            <HomeCaseStudies />
            <Section id="services" className="py-section-y-big">
              <HomeServices />
            </Section>
            <HomeApproach />
            <Section id="b2b" className="py-section-y-big">
              <HomeB2B />
            </Section>
            <HomeProcess />
            <Faq data={null} />
            <HomeContact />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
