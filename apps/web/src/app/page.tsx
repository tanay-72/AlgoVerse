import { Hero } from '@/components/home/hero';
import { StatsSection } from '@/components/home/stats-section';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { RecentlyViewedSection } from '@/components/home/recently-viewed-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <RecentlyViewedSection />
      <FeaturedCategories />
    </>
  );
}
