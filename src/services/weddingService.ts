// src/services/eventService.ts
import { WeatherData } from '@/sections/Home/WeatherSection';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface EventResponse {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  bankAccountDetails: {
    bankAccountNumber: string;
    bankAccountHolders: string;
  };
  busSchedules: Array<{
    stops: Array<{
      locationName: string;
      locationUrl: string;
      departureTime: string;
    }>;
    returnTimes: string[];
  }>;
  contactDetails: {
    phoneNumber: string;
    email: string;
  };
  eventDateTime: string;
  expectedTemperature: Array<WeatherData>;
  gifsUrl: {
    default: string[];
    personalized: Record<string, string>;
  };
  giftLocation: Array<{
    name: string;
    street: string;
    number: string;
    postalCode: string;
    city: string;
  }>;
  heroSectionImages: string[];
  logo: string | null;
  celebration: {
    title: string;
    locationName: string;
    locationDetails: {
      street: string;
      number: string;
      city: string;
    };
    locationUrl: string;
    time: string;
  };
  ceremony: {
    title: string;
    locationName: string;
    locationDetails: {
      street: string;
      number: string;
      city: string;
    };
    locationUrl: string;
    time: string;
  };
  others: any[];
}

// Fetch event data by subdomain
export const fetchEventBySubdomain = async (
  subdomain: string
): Promise<EventResponse> => {
  try {
    const response = await axios.get<any>(`${BASE_URL}/wedding/${subdomain}`);
    return response.data.wedding;
  } catch (error) {
    console.error('Error fetching event data:', error);
    throw error;
  }
};
