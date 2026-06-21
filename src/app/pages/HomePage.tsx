import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeHero from '../components/home/HomeHero';
import HomeStory from '../components/home/HomeStory';
import HomeServices from '../components/home/HomeServices';
import HomeB2B from '../components/home/HomeB2B';
import HomeProcess from '../components/home/HomeProcess';
import HomeContact from '../components/home/HomeContact';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HomeHero />
        <HomeStory />
        <HomeServices />
        <HomeB2B />
        <HomeProcess />
        <HomeContact />
      </main>
      <Footer />
    </div>
  );
}