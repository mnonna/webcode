'use client';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import HomeHero from '../src/components/home/HomeHero';
import HomeStory from '../src/components/home/HomeStory';
import HomeServices from '../src/components/home/HomeServices';
import HomeTechnologies from '../src/components/home/HomeTechnologies';
import HomeB2B from '../src/components/home/HomeB2B';
import HomeProcess from '../src/components/home/HomeProcess';
import Faq from '../src/components/home/Faq';
import HomeContact from '../src/components/home/HomeContact';

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HomeHero />
        <HomeStory />
        <HomeServices />
        <HomeTechnologies />
        <HomeB2B />
        <HomeProcess />
        <Faq data={null}/>
        <HomeContact />
      </main>
      <Footer />
    </div>
  );
}
