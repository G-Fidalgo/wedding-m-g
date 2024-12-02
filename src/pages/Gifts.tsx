import { Button } from '@/components/ui/button';
import { GiftList } from '@/sections/Gifts/list';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HeaderComponent } from '@/components/layouts/HeaderComponent';
import { useEventStore } from '@/store/eventStore';

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const GiftsPage = () => {
  const eventId = useEventStore((state) => state._id);
  const loading = useEventStore((state) => state.loading);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loading) return <div>Cargando información del evento...</div>;
  // if (error) return <div>Error al cargar datos: {error}</div>;
  if (!eventId) return <div>No se encontró el ID del evento.</div>;

  // text-base sm:text-lg md:text-xl
  return (
    <div className="min-h-screen">
      <HeaderComponent isSticky={true} />
      <section className="w-full max-w-4xl mx-auto my-4 pt-14">
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <p className="text-lg">
              Bienvenidos a la lista de regalos que hemos seleccionado para
              nuestra boda.
            </p>
            <p className="text-lg">
              Si preferís no hacer una transferencia, hemos pensado en una serie
              de regalos para que no tengáis que pensar demasiado. Os hemos
              dejado unas instrucciones en la sección ¿Cómo funciona?
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="mb-6  rounded-md p-2 w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-xl">
                ¿Cómo funciona?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg">
                    Hemos intentado hacerlo lo más sencillo posible, en cada
                    regalo encontraréis dos botones, uno para obtener más
                    detalles sobre el regalo o donde comprarlo{' '}
                    <span className="text-primary underline-offset-4 hover:underline">
                      {' '}
                      + Info
                    </span>{' '}
                    y otro para reservarlo, es{' '}
                    <span className="rounded-md font-semibold text-lg">
                      importante que no nos hagáis un regalo sin antes
                      reservarlo, por favor.
                    </span>{' '}
                  </p>
                  <p className="text-gray-700 text-lg">
                    Hay regalos que ya no estarán disponible, los vereis de un
                    color apagado y con una etiqueta de{' '}
                    <span className="bg-red-200 text-white px-2 py-1 rounded-md text-sm font-semibold">
                      Reservado
                    </span>
                    , tendréis que buscar otra opción.
                  </p>
                  <p className="text-gray-700 text-lg">
                    Os hemos dejado un enlace para ver más detalles del
                    producto, podréis verlos pinchando en el botón{' '}
                    <strong>+ Info</strong>
                  </p>

                  <h3 className="font-semibold text-lg mt-6 mb-4">
                    Si ya lo tenéis seguro, los pasos a seguir son los
                    siguientes:
                  </h3>
                  <ol className="space-y-6">
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-3">
                        1
                      </span>
                      <div>
                        <h4 className="font-medium">Reservad el regalo</h4>
                        <p className="text-gray-600 text-sm w-3/4">
                          Elige el regalo que más te guste para nosotros,
                          pinchando en el botón 'Reservar'
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-3">
                        2
                      </span>
                      <div>
                        <h4 className="font-medium">Rellenad el formulario</h4>
                        <p className="text-gray-600 text-sm w-3/4">
                          Completad la información necesaria en el formulario
                          que aparecerá
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-3">
                        3
                      </span>
                      <div>
                        <h4 className="font-medium">Envío del regalo</h4>
                        <p className="text-gray-600 text-sm w-3/4">
                          Es hora de haceros con el regalo por vuestra cuenta,
                          os hemos dejado una dirección de envío en el siguiente
                          desplegable
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold text-xl">
                Detalles para el envío
              </AccordionTrigger>
              <AccordionContent>
                <InfoComponent text="Gonzalo Fidalgo Martínez-Merello" />
                <InfoComponent text="Calle Jose Abascal 22, 4ºA Madrid 28003" />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <GiftList weddingId={eventId} />
        </div>
      </section>
    </div>
  );
};
function InfoComponent({ text }: { text: string }) {
  const [copiedFields, setCopiedFields] = useState<Boolean>(false);

  const handleCopy = () => {
    setCopiedFields(true);
    setTimeout(() => {
      setCopiedFields(false);
    }, 2000);
  };

  const setCopy = () => copyToClipboard(text);
  return (
    <div className="space-y-2 mx-2">
      <div
        className={`flex justify-between items-center p-2 rounded transition-colors duration-300 `}
      >
        <div className="flex items-center">
          <span className="mr-2">{text}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setCopy();
              handleCopy();
            }}
            aria-label="Copiar nombre"
          >
            {copiedFields ? (
              <Check className="h-4 w-4 text-green-800" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
