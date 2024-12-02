import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEventStore } from '@/store/eventStore';
import React, { useEffect, useState } from 'react';

export const CountdownSection = ({
  refCountDownSection,
}: {
  refCountDownSection: React.RefObject<HTMLDivElement>;
}) => {
  const eventDate = useEventStore((state) => state.eventDateTime);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!eventDate) {
      return;
    }
    const timer = setInterval(() => {
      const now = new Date();
      const difference = new Date(eventDate).getTime() - now.getTime();
      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto text-center" ref={refCountDownSection}>
        <h2 className="text-3xl font-bold mb-8 pt-8">
          Cuenta atrás para el gran día
        </h2>
        <div className="flex justify-center space-x-4">
          {Object.entries(countdown).map(([unit, value]) => (
            <Card key={unit} className="w-24">
              <CardHeader className="p-2">
                <CardTitle className="text-3xl">{String(value)}</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <p className="text-sm capitalize">{unit}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
