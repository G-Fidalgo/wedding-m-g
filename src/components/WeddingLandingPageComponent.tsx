import { useState, useEffect, useRef } from 'react';
import { HeroSection } from './sections/HeroSection';
import { CountdownSection } from './sections/CountdownSection';
import { WeddingInfoSection } from './sections/WeddingInfoSection';
import { GiftsSection } from './sections/GiftsSection';
import { BankAccountComponent } from './bank-account';
import { HeaderComponent } from './sections/HeaderComponent';
import WeatherCarousel, { WeatherData } from './sections/WeatherSection';

export function WeddingLandingPageComponent() {
  const refCountDownSection = useRef<HTMLDivElement | null>(null);
  const refChevron = useRef<HTMLButtonElement | null>(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const weddingDate = new Date('2025-06-21T17:30:00');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

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

  const gifts = [
    {
      id: 1,
      title: 'Set de Cocina',
      image:
        'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png?height=200&width=300',
      reserved: false,
    },
    {
      id: 2,
      title: 'Viaje a París',
      image:
        'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png?height=200&width=300',
      reserved: true,
    },
    {
      id: 3,
      title: 'Juego de Sábanas',
      image:
        'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png?height=200&width=300',
      reserved: false,
    },
    {
      id: 4,
      title: 'Cena Romántica',
      image:
        'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png?height=200&width=300',
      reserved: false,
    },
    {
      id: 5,
      title: 'Vajilla Completa',
      image:
        'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png?height=200&width=300',
      reserved: true,
    },
    {
      id: 6,
      title: 'Curso de Cocina',
      image:
        'https://binamehta.com/wp-content/uploads/image-placeholder-300x200.png?height=200&width=300',
      reserved: false,
    },
  ];

  const weatherData: WeatherData[] = [
    { time: '00:00', temperature: 10, condition: 'clearNight' },
    { time: '01:00', temperature: 10, condition: 'clearNight' },
    { time: '02:00', temperature: 9, condition: 'clearNight' },
    { time: '03:00', temperature: 9, condition: 'clearNight' },
    { time: '04:00', temperature: 9, condition: 'clearNight' },
    { time: '05:00', temperature: 9, condition: 'clearNight' },
    { time: '06:00', temperature: 10, condition: 'sunny' },
    { time: '06:45', temperature: 10, condition: 'sunrise' },
    { time: '07:00', temperature: 13, condition: 'sunny' },
    { time: '08:00', temperature: 13, condition: 'sunny' },
    { time: '10:00', temperature: 16, condition: 'sunny' },
    { time: '12:00', temperature: 18, condition: 'sunny' },
    { time: '14:00', temperature: 21, condition: 'sunny' },
    { time: '15:00', temperature: 21, condition: 'sunny' },
    { time: '16:00', temperature: 22, condition: 'sunny' },
    { time: '17:00', temperature: 22, condition: 'sunny' },
    { time: '18:00', temperature: 21, condition: 'sunny' },
    { time: '19:00', temperature: 21, condition: 'sunny' },
    { time: '20:00', temperature: 18, condition: 'sunny' },
    { time: '21:00', temperature: 18, condition: 'sunny' },
    { time: '21:49', temperature: 10, condition: 'sunset' },
    { time: '22:00', temperature: 15, condition: 'clearNight' },
    { time: '23:00', temperature: 15, condition: 'clearNight' },
  ];

  return (
    <div className="min-h-screen  ">
      <HeaderComponent isSticky={isSticky} />

      <HeroSection
        scrollToNextSection={scrollToNextSection}
        refChevronSection={refChevron}
      />
      <div className="max-w-[80ch] mx-auto">
        <CountdownSection
          countdown={countdown}
          refCountDownSection={refCountDownSection}
        />

        <WeddingInfoSection />

        <WeatherCarousel weatherData={weatherData} />
      </div>

      {/* Ubicaciones Section */}

      <section className="bg-white">
        <BankAccountComponent />
        <GiftsSection gifts={gifts} />
      </section>
    </div>
  );
}
