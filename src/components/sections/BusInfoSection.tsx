import { Bus } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

export const BusInfoSection = () => {
    return (
        <section className="py-16 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Horarios</h2>
          <div className="flex flex-col items-center space-y-8">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <Bus className="mr-2" /> Horario de autobuses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
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
          </div>
        </div>
        </section>
        
    )

}