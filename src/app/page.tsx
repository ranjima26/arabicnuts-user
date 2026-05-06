import { Hero } from '@/components/Hero';
import { BlanchedPeanuts } from '@/components/BlanchedPeanuts';
import { Collection } from '@/components/Collection';
import { WhyArabic } from '@/components/WhyArabic';
import { BestSellers } from '@/components/BestSellers';
import { GiftHampers } from '@/components/GiftHampers';
import { Testimonials } from '@/components/Testimonials';

export default function Home() {
  return (
    <main>
      <Hero />
      <BlanchedPeanuts />
      <Collection />
      <WhyArabic />
      <BestSellers />
      <GiftHampers />
      <Testimonials />
    </main>
  );
}
