'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GiftReservationForm } from './reservationForm';

interface Gift {
  id: string;
  weddingId: string;
  title: string;
  image: string[];
  url?: string;
  isReservable: boolean;
  reserved: boolean;
  isBankAccountGift?: boolean;
}

export default function GiftCard({
  gift,
  onReservationUpdate,
}: {
  gift: Gift;
  onReservationUpdate: (giftId: string, reserved: boolean) => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReservationFormOpen, setIsReservationFormOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gift.image.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + gift.image.length) % gift.image.length
    );
  };

  return (
    <div
      className={`max-w-sm border rounded-xl overflow-hidden bg-white relative ${gift.reserved ? 'opacity-70' : ''}`}
    >
      {gift.reserved && (
        <div
          className="absolute top-2 right-2 bg-red-200 text-white px-2 py-1 rounded-md text-sm font-semibold z-10"
          aria-label="Reservado"
        >
          Reservado
        </div>
      )}
      <div className="relative h-48">
        <img
          src={gift.image[currentImageIndex]}
          alt={gift.title}
          className="w-full h-48 object-contain"
        />
        {gift.image.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-center text-xl mb-2">{gift.title}</div>
        <div className="flex flex-col items-center mt-4 space-y-4">
          {gift.url && (
            <Link
              to={gift.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              + Info
            </Link>
          )}
          {gift.isReservable && (
            <Button
              onClick={() => setIsReservationFormOpen(true)}
              disabled={gift.reserved}
            >
              {gift.reserved ? 'Reservado' : 'Resérvalo ya!'}
            </Button>
          )}
        </div>
      </div>
      <GiftReservationForm
        isOpen={isReservationFormOpen}
        onClose={() => setIsReservationFormOpen(false)}
        gift={gift}
        onReservationSuccess={() => onReservationUpdate(gift.id, true)}
      />
    </div>
  );
}
