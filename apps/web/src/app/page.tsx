import { Hero } from '@/components/home/hero';
import { StatsSection } from '@/components/home/stats-section';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { RecentlyViewedSection } from '@/components/home/recently-viewed-section';
import { RevealOnScroll } from '@/components/shared/reveal-on-scroll';

export default function HomePage() {
  return (
    <>
      <Hero />
      <RevealOnScroll>
        <StatsSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <RecentlyViewedSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <FeaturedCategories />
      </RevealOnScroll>
    </>
  );
}
