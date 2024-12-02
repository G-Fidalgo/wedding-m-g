import { useEventStore } from '@/store/eventStore';
import { ChevronDown } from 'lucide-react';
import React from 'react';

export const HeroSection = ({
  scrollToNextSection,
  refChevronSection,
}: {
  scrollToNextSection: () => void;
  refChevronSection: React.RefObject<HTMLButtonElement>;
}) => {
  // TODO: Hanlde multiple images
  const eventBackgroundImg = useEventStore(
    (state) => state.heroSectionImages[0]
  );

  return (
    <section
      id="hero-section"
      className="relative h-screen flex items-center justify-center text-center text-white"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${eventBackgroundImg})` }}
      ></div>
      <button
        ref={refChevronSection}
        onClick={scrollToNextSection}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer focus:outline-none"
        aria-label="Desplazarse a la siguiente sección"
      >
        <ChevronDown className="w-12 h-12" />
      </button>
    </section>
  );
};
