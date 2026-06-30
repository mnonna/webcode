'use client';

import Header from './Header';
import Footer from './Footer';
import HomeHero from './home/HomeHero';
import HomeStory from './home/HomeStory';
import HomeServices from './home/HomeServices';
import HomeB2B from './home/HomeB2B';
import HomeProcess from './home/HomeProcess';
import Faq from './home/Faq';
import HomeContact from './home/HomeContact';

export default function HomePageClient() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HomeHero />
        <HomeStory />
        <HomeServices />
        <HomeB2B />
        <HomeProcess />
        <Faq />
        <HomeContact />
      </main>
      <Footer />
    </div>
  );
}
