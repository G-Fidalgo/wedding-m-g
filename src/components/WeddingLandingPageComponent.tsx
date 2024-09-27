import { useState, useEffect, useRef } from "react";
import { HeroSection } from "./sections/HeroSection";
import { CountdownSection } from "./sections/CountdownSection";
import { WeddingInfoSection } from "./sections/WeddingInfoSection";
import { WeatherSection } from "./sections/WeatherSection";
import { GiftsSection } from "./sections/GiftsSection";
import { BankAccountComponent } from "./bank-account";
import { BusInfoSection } from "./sections/BusInfoSection";
import { HeaderComponent } from "./sections/HeaderComponent";

export function WeddingLandingPageComponent() {
  const refCountDownSection = useRef<HTMLDivElement | null>(null);
  const refHeroSection = useRef<HTMLDivElement | null>(null);
  const refChevron = useRef<HTMLButtonElement | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const weddingDate = new Date("2025-06-21T17:30:00");
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      title: "Set de Cocina",
      image: "/placeholder.svg?height=200&width=300",
      reserved: false,
    },
    {
      id: 2,
      title: "Viaje a París",
      image: "/placeholder.svg?height=200&width=300",
      reserved: true,
    },
    {
      id: 3,
      title: "Juego de Sábanas",
      image: "/placeholder.svg?height=200&width=300",
      reserved: false,
    },
    {
      id: 4,
      title: "Cena Romántica",
      image: "/placeholder.svg?height=200&width=300",
      reserved: false,
    },
    {
      id: 5,
      title: "Vajilla Completa",
      image: "/placeholder.svg?height=200&width=300",
      reserved: true,
    },
    {
      id: 6,
      title: "Curso de Cocina",
      image: "/placeholder.svg?height=200&width=300",
      reserved: false,
    },
  ];

  const weatherData = [
    { time: "00:00", temperature: 10, precipitation: 0, sunHours: 0 },
    { time: "02:00", temperature: 9, precipitation: 0, sunHours: 0 },
    { time: "04:00", temperature: 9, precipitation: 0, sunHours: 0 },
    { time: "06:00", temperature: 10, precipitation: 0, sunHours: 1 },
    { time: "08:00", temperature: 13, precipitation: 0, sunHours: 2 },
    { time: "10:00", temperature: 16, precipitation: 0, sunHours: 3 },
    { time: "12:00", temperature: 18, precipitation: 0, sunHours: 4 },
    { time: "14:00", temperature: 21, precipitation: 0, sunHours: 4 },
    { time: "16:00", temperature: 22, precipitation: 0, sunHours: 4 },
    { time: "18:00", temperature: 21, precipitation: 0, sunHours: 3 },
    { time: "20:00", temperature: 18, precipitation: 0, sunHours: 2 },
    { time: "22:00", temperature: 15, precipitation: 0, sunHours: 0 },
  ];


  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderComponent isSticky={isSticky} />
      
      <HeroSection scrollToNextSection={scrollToNextSection}
       refChevronSection={refChevron} />

      <CountdownSection countdown={countdown} refCountDownSection={refCountDownSection} />

      <WeddingInfoSection />

      <WeatherSection weatherData={weatherData} />

      {/* Ubicaciones Section */}

      <BusInfoSection/>

      <section className="py-16 bg-white">
        <BankAccountComponent />
      </section>

      <GiftsSection gifts={gifts} />
    </div>
  );
}
