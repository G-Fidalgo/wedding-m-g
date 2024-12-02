import { CountdownSection } from '@/sections/Home/CountdownSection';
import { HeaderComponent } from '@/components/layouts/HeaderComponent';
import { HeroSection } from '@/sections/Home/HeroSection';
import WeatherCarousel from '@/sections/Home/WeatherSection';
import { WeddingInfoSection } from '@/sections/Home/WeddingInfoSection';
import { useState, useEffect, useRef } from 'react';
import { WeddingListSection } from '@/sections/Home/WeddingListSection';
import { useSubdomainEvent } from '@/hooks/useSubdomain';

export function WeddingLandingPageComponent() {
  const { loading, error } = useSubdomainEvent();
  const refCountDownSection = useRef<HTMLDivElement | null>(null);
  const refChevron = useRef<HTMLButtonElement | null>(null);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (refChevron.current) {
        const heroBottom =
          refChevron.current.offsetTop + refChevron.current.offsetHeight - 32;
        setIsSticky(window.pageYOffset > heroBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    if (refCountDownSection.current) {
      const nextSection = refCountDownSection.current;
      if (nextSection) {
        nextSection.scrollIntoView();
      }
    }
  };

  // TODO: Improve maybe add skeleton
  if (loading || error) {
    return (
      <div>
        <p>Cargando wait until we fetch info</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <HeaderComponent isSticky={isSticky} />

      <HeroSection
        scrollToNextSection={scrollToNextSection}
        refChevronSection={refChevron}
      />
      <div className="max-w-[80ch] mx-auto">
        <CountdownSection refCountDownSection={refCountDownSection} />

        <WeddingInfoSection />

        <WeatherCarousel />
      </div>

      {/* Ubicaciones Section */}

      <section className="bg-white">
        <WeddingListSection />
      </section>
    </div>
  );
}
