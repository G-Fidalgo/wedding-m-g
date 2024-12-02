import { Attendee } from '@/sections/Home/Confirmation/confirmation-form';
import axios from 'axios';

// Define the base URL for the API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch gifts by weddingId
export const createAttendees = async (attendees: Attendee[]): Promise<void> => {
  try {
    await axios.post<{}>(`${BASE_URL}/attendees`, {
      attendees,
    });
  } catch (error) {
    console.error('Error creating attendees:', error);
    throw error;
  }
};
