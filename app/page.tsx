import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import HomeHero from '../src/components/home/HomeHero';
import HomeAbout from '../src/components/home/HomeAbout';
import HomeStory from '../src/components/home/HomeStory';
import HomeCaseStudies from '../src/components/home/HomeCaseStudies';
import HomeServices from '../src/components/home/HomeServices';
import HomeApproach from '../src/components/home/HomeApproach';
import HomeB2B from '../src/components/home/HomeB2B';
import HomeProcess from '../src/components/home/HomeProcess';
import Faq from '../src/components/home/Faq';
import HomeContact from '../src/components/home/HomeContact';
import Section from '../src/components/common/Section';
import CmsPageBlocks from '../src/components/cms/CmsPageBlocks';
import { getCmsPageBySlug } from '../src/lib/strapi';

export default async function HomePage() {
  const page = await getCmsPageBySlug('home');

  return (
    <div className="min-h-screen">
      <Header />
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
