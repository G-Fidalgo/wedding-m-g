import { useEffect } from 'react';
import { useEventStore } from '@/store/eventStore'; // Nuestro store global

// Función para obtener el subdominio actual
const getSubdomain = (): string => {
  const { hostname } = window.location;

  if (hostname === 'localhost') {
    return 'localhost'; // Subdominio por defecto en entorno local
  }

  return hostname.split('.')[0];
};

// Hook para cargar datos del evento basado en el subdominio
export const useSubdomainEvent = () => {
  const fetchEventData = useEventStore((state) => state.fetchEventData);
  const eventData = useEventStore((state) => state._id); // Accede a los datos existentes
  const loading = useEventStore((state) => state.loading);
  const error = useEventStore((state) => state.error);

  useEffect(() => {
    const subdomain = getSubdomain();
    if (subdomain && !eventData) {
      fetchEventData(subdomain); // Solo llama si `eventData` es null
    }
  }, [fetchEventData, eventData]);

  return { loading, error };
};
