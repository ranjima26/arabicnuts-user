import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BlanchedPeanuts } from './components/BlanchedPeanuts';
import { Collection } from './components/Collection';
import { WhyArabic } from './components/WhyArabic';
import { BestSellers } from './components/BestSellers';
import { GiftHampers } from './components/GiftHampers';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <BlanchedPeanuts />
        <Collection />
        <WhyArabic />
        <BestSellers />
        <GiftHampers />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
