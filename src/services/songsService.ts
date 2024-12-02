import axios from 'axios';

export interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  previewUrl: string;
}

// Define the base URL for the API
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Función para buscar canciones en Spotify
export const searchSongs = async (trackName: string): Promise<Song[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/spotify/tracks/search`, {
      params: { trackName },
    });

    const songs = response.data.searchResult.map((track: any) => ({
      id: track.id,
      name: track.name,
      artist: track.artist,
      album: track.album,
      image: track.image,
      previewUrl: track.previewUrl,
    }));

    return songs;
  } catch (error) {
    console.error('Error fetching Spotify tracks:', error);
    throw error;
  }
};
