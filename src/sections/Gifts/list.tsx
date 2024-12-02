import React, { useEffect, useState } from 'react';
import { getGiftsByWeddingId, Gift } from '@/services/giftService';
import GiftCard from './card';

interface GiftsSectionProps {
  weddingId: string;
}

export const GiftList: React.FC<GiftsSectionProps> = ({ weddingId }) => {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGifts = async () => {
      if (!weddingId) return; // Verifica que el weddingId esté presente antes de hacer la petición

      try {
        setLoading(true); // Empieza el loading
        const fetchedGifts = await getGiftsByWeddingId(weddingId);
        setGifts(fetchedGifts);
        setLoading(false); // Detiene el loading tras recibir los datos
      } catch (err) {
        setError('No se pudieron cargar los regalos.');
        console.error(err);
        setLoading(false); // Detiene el loading si hubo error
      }
    };

    fetchGifts();
  }, [weddingId]);

  const updateGiftReservation = (giftId: string, reserved: boolean) => {
    setGifts((prevGifts) =>
      prevGifts.map((gift) =>
        gift.id === giftId ? { ...gift, reserved } : gift
      )
    );
  };

  if (loading) {
    return <p className="text-center">Cargando regalos...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-4 p-4">
      {gifts.map((gift) => (
        <GiftCard
          key={gift.id}
          gift={gift}
          onReservationUpdate={updateGiftReservation}
        />
      ))}
    </div>
  );
};
