import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const WeddingInfoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Info de nuestro día</h2>
        <div className="flex flex-col items-center space-y-8">
          <Card className="w-full max-w-md">
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
          <Card className="w-full max-w-md">
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
        </div>
      </div>
    </section>
  );
};
