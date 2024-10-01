import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export const GiftsSection = ({ gifts }: { gifts: any[] }) => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto text-center">
        <p className="text-pretty mb-4 px-4">Si preferís hacernos un regalo, hemos preparado una lista con algunas ideas que nos hacen ilusión</p>
        <Carousel className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
          <CarouselContent>
            {gifts.map((gift) => (
              <CarouselItem key={gift.id}>
                <Card className="relative overflow-hidden">
                  {gift.reserved && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1 w-max">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <img src={gift.image} alt={gift.title} className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-center text-pretty">{gift.title}</CardTitle>
                  </CardHeader>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="relative top-0 mt-8 md:absolute md:top-1/2 md:mt-0 " />
            <CarouselNext className="relative top-0 mt-8 ml-3 md:absolute md:top-1/2 md:m-0" />
        </Carousel>
      </div>
    </section>
  );
};
