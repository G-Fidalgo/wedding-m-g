import axios from 'axios';

// Define types for the API response
interface GiftApiResponse {
  _id: string;
  name: string;
  url: string;
  images: string[];
  reserved: boolean;
  isReservable: boolean;
  isBankAccountGift: boolean;
  reservationFullName: string;
  weddingId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Gift {
  id: string;
  title: string;
  image: string[];
  reserved: boolean;
  isBankAccountGift: boolean;
  url?: string;
  isReservable: boolean;
  weddingId: string;
}

// Define the base URL for the API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch gifts by weddingId
export const getGiftsByWeddingId = async (
  weddingId: string
): Promise<Gift[]> => {
  try {
    const response = await axios.get<{ gifts: GiftApiResponse[] }>(
      `${BASE_URL}/gifts/${weddingId}`
    );

    // Map the response data to our desired format
    return response.data.gifts.map((gift) => ({
      id: gift._id,
      title: gift.name,
      image: gift.images,
      reserved: gift.reserved,
      isReservable: gift.isReservable,
      isBankAccountGift: gift.isBankAccountGift,
      url: gift.url,
      weddingId: gift.weddingId,
    }));
  } catch (error) {
    console.error('Error fetching gifts:', error);
    throw error; // Propagate the error to be handled by the calling component
  }
};

export const reserveGift = async (
  weddingId: string,
  giftId: string,
  name: string
): Promise<any> => {
  try {
    const response = await axios.post<{ gifts: GiftApiResponse[] }>(
      `${BASE_URL}/gifts/${giftId}/reserve`,
      {
        weddingId,
        reservationFullName: name,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error reserving gift:', error);
    throw error;
  }
};
