'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import React, { useEffect } from 'react';

type WeatherCondition =
  | 'sunrise'
  | 'sunset'
  | 'sunny'
  | 'partlySunny'
  | 'fog'
  | 'haze'
  | 'cloudy'
  | 'rain'
  | 'drizzle'
  | 'heavyRain'
  | 'thunderBolt'
  | 'snow'
  | 'scatteredSnow'
  | 'sleet'
  | 'clearNight'
  | 'partlyCloudyNight'
  | 'nightDrizzle';

export interface WeatherData {
  time: string;
  temperature: number | null;
  condition: WeatherCondition;
}

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherIcon: React.FC<{ condition: WeatherCondition }> = ({
  condition,
}) => {
  const icons: Record<WeatherCondition, string> = {
    sunrise: `/weather-icons/sunrise.png`,
    sunset: `/weather-icons/sunset.png`,
    sunny: `/weather-icons/sunny.png`,
    partlySunny: `/weather-icons/partlySunny.png`,
    cloudy: `/weather-icons/cloudy.png`,
    haze: `/weather-icons/haze.png`,
    fog: `/weather-icons/fog.png`,
    drizzle: `/weather-icons/drizzle.png`,
    rain: `/weather-icons/rain.png`,
    heavyRain: `/weather-icons/heavyRain.png`,
    thunderBolt: `/weather-icons/thunderBolt.png`,
    snow: `/weather-icons/snow.png`,
    scatteredSnow: `/weather-icons/scatteredSnow.png`,
    sleet: `/weather-icons/sleet.png`,
    clearNight: `/weather-icons/clearNight.png`,
    partlyCloudyNight: `/weather-icons/partlyCloudyNight.png`,
    nightDrizzle: `/weather-icons/nightDrizzle.png`,
  };

  return (
    <img
      src={icons[condition]}
      alt={condition}
      width={48}
      height={48}
      className="w-12 h-12"
    />
  );
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <Card className="w-full h-full bg-transparent border-none shadow-none">
      <CardContent className="flex flex-col items-center justify-center h-full p-2">
        <div className="text-lg font-bold">{data.time}</div>
        <WeatherIcon condition={data.condition} />
        <div className="text-2xl font-bold mt-2">{data.temperature}°C</div>
      </CardContent>
    </Card>
  );
};

export const WeatherCarousel: React.FC<{ weatherData: WeatherData[] }> = ({
  weatherData,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const initialSlide = 19 % weatherData.length;

  useEffect(() => {
    if (!api) return;
    api.scrollTo(initialSlide);
  }, [api, initialSlide]);

  return (
    <div className="w-4/5 mx-auto relative py-4 ">
      <div className="py-4 text-center border-b border-gray-200">
        <h2 className="text-3xl font-bold mb-8 ">Previsión del tiempo</h2>
        <p>No le pusieron el nombre de Rascafría de manera aleatoria 😏 </p>
      </div>

      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {weatherData.map((data, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="p-1">
                <WeatherCard data={data} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative right-4" />
          <CarouselNext className="relative left-4" />
        </div>
      </Carousel>
    </div>
  );
};

export default WeatherCarousel;
