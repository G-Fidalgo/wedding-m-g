import { WeatherData } from '@/sections/Home/WeatherSection';
import { fetchEventBySubdomain } from '@/services/weddingService';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface EventState {
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
  eventDateTime: string | null;
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

  // Estado adicional para manejo de carga y errores
  loading: boolean;
  error: string | null;

  // Métodos para manipular el estado
  setEventData: (data: Partial<EventState>) => void;
  fetchEventData: (subdomain: string) => Promise<void>;
}

// Implementación del store
export const useEventStore = create<EventState>()(
  devtools((set, get) => ({
    _id: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    bankAccountDetails: {
      bankAccountNumber: '',
      bankAccountHolders: '',
    },
    busSchedules: [],
    contactDetails: {
      phoneNumber: '',
      email: '',
    },
    eventDateTime: null,
    expectedTemperature: [],
    gifsUrl: {
      default: [],
      personalized: {},
    },
    giftLocation: [],
    heroSectionImages: [],
    logo: null,
    celebration: {
      title: '',
      locationName: '',
      locationDetails: {
        street: '',
        number: '',
        city: '',
      },
      locationUrl: '',
      time: '',
    },
    ceremony: {
      title: '',
      locationName: '',
      locationDetails: {
        street: '',
        number: '',
        city: '',
      },
      locationUrl: '',
      time: '',
    },
    others: [],
    loading: true,
    error: null,

    // Método para actualizar datos específicos del evento
    setEventData: (data) =>
      set((state) => ({
        ...state,
        ...data,
      })),

    fetchEventData: async (subdomain) => {
      const currentData = get()._id;

      if (currentData) {
        console.log(
          'Datos ya cargados en el store. No se realizará una nueva llamada.'
        );
        return;
      }
      try {
        const data = await fetchEventBySubdomain(subdomain);
        set({ ...data, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },
  }))
);
