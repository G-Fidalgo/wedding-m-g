import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CountdownSection = ({
  countdown,
  refCountDownSection,
}: {
  countdown: any;
  refCountDownSection: React.RefObject<HTMLDivElement>;
}) => {
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
