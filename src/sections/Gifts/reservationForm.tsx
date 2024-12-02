'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, XCircle } from 'lucide-react';
import { reserveGift } from '@/services/giftService';
import { BankAccountComponent } from '@/components/layouts/bank-account';

interface GiftReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
  gift: {
    id: string;
    weddingId: string;
    title: string;
    isBankAccountGift?: boolean;
  };
  onReservationSuccess: () => void;
}

export function GiftReservationForm({
  isOpen,
  onClose,
  gift,
  onReservationSuccess,
}: GiftReservationFormProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationStatus, setReservationStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await reserveGift(gift.weddingId, gift.id, name);
      setReservationStatus('success');
      onReservationSuccess();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (error) {
      setReservationStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (gift.isBankAccountGift) {
      return (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Muchas gracias por participar en nuestra luna de miel, os dejamos
            los detalles bancarios para que nos podáis hacer llegar vuestra
            aportación
          </p>
          <div className="p-4">
            <BankAccountComponent />
          </div>
        </div>
      );
    }

    switch (reservationStatus) {
      case 'error':
        return (
          <div className="text-center">
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-semibold mb-2">
              Vaya, ha ocurrido algún error
            </h3>
            <p className="text-gray-600">
              Lo sentimos, debe haber algún error. Por favor, ponte en contacto
              con nosotros. TODO PONER AQUÍ EL MAIL
            </p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h3 className="text-lg font-semibold mb-4">
              ¡Genial! Ya hemos reservado el regalo. Muchas gracias!
            </h3>
            <ol className="space-y-6 text-left">
              <li className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-3 line-through">
                  1
                </span>
                <div className="line-through">
                  <h4 className="font-medium">Reservad el regalo</h4>
                  <p className="text-gray-600 text-sm w-3/4">
                    Elige el regalo que más te guste para nosotros, pinchando en
                    el botón 'Reservar'
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-3 line-through">
                  2
                </span>
                <div className="line-through">
                  <h4 className="font-medium">Rellenad el formulario</h4>
                  <p className="text-gray-600 text-sm w-3/4">
                    Completad la información necesaria en el formulario que
                    aparecerá
                  </p>
                </div>
              </li>
              <li className="flex items-center">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-3">
                  3
                </span>
                <div>
                  <h4 className="font-medium">Envío del regalo</h4>
                  <p className="text-gray-600 text-sm w-3/4">
                    Es hora de haceros con el regalo por vuestra cuenta, os
                    hemos dejado una dirección de envío en el siguiente
                    desplegable
                  </p>
                </div>
              </li>
            </ol>
          </div>
        );
      default:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-8">
              <p>
                Genial, por favor, indicadnos vuestro nombre y el regalo quedará
                reservado para vosotros
              </p>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nombre de los participantes del regalo:
                </label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={!name || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Reservando...' : 'Reservar'}
            </Button>
          </form>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reservar {gift.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{renderContent()}</div>
      </DialogContent>
    </Dialog>
  );
}
