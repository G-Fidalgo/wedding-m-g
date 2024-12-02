import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, MapPin } from 'lucide-react';

export const WeddingInfoSection = () => {
  return (
    <section className="">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 py-16 bg-white px-4 ">
          <div className="grid gap-8">
            <a
              href="https://maps.app.goo.gl/YCfABzBMTWuYuS969"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <MapPin className="mr-2" /> Ceremonia
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Real Monasterio de Santa María de El Paular</p>
                  <p>Rascafría, M-604</p>
                  <p>17:30 horas</p>
                </CardContent>
              </Card>
            </a>
            <a
              href="https://maps.app.goo.gl/4krmsGUdvvzqmVMS9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <MapPin className="mr-2" /> Celebración
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Finca El Robledo</p>
                  <p>Carretera, M-611, Km 30, 200, 28740 Rascafría</p>
                  <p>19:30 horas</p>
                </CardContent>
              </Card>
            </a>
          </div>
          <a
            href="https://maps.app.goo.gl/HnfU5kejkZTFd4PBA"
            target="_blank"
            rel="noopener noreferrer"
            className="h-full block"
          >
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Bus className="mr-2" /> Horario de autobuses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-8 mt-4">
                  <li className="flex items-center">
                    <Bus className="mr-4" />
                    <div>
                      <p className="font-bold">16:15</p>
                      <p>Salida desde Plaza de Colón</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Bus className="mr-4" />
                    <div>
                      <p className="font-bold">01:00</p>
                      <p>Primera salida de vuelta</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Bus className="mr-4" />
                    <div>
                      <p className="font-bold">04:30</p>
                      <p>Última salida de vuelta</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </section>
  );
};
