import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { searchSongs, Song } from '@/services/songsService';

interface SpotifySearchProps {
  onSongSelect: (song: Song) => void; // Función para pasar la canción seleccionada al componente padre
}

export const SpotifySearch: React.FC<SpotifySearchProps> = ({
  onSongSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  // Realiza la petición a la API cada vez que el query cambia
  useEffect(() => {
    const fetchSongs = async () => {
      if (searchQuery.length >= 3) {
        setLoading(true);
        try {
          const songs = await searchSongs(searchQuery); // Llamamos al servicio
          setSearchResults(songs);
        } catch (error) {
          console.error('Error fetching Spotify tracks:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    // Retrasar la petición hasta que el usuario deje de escribir (debounce)
    const timeoutId = setTimeout(() => fetchSongs(), 300);

    return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta
  }, [searchQuery]);

  return (
    <div className="relative">
      <Input
        placeholder="Buscar canción..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

      {loading && <p>Cargando resultados...</p>}

      {searchResults.length > 0 && (
        <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-sm">
          {searchResults.slice(0, 5).map((song) => (
            <li
              key={song.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <img
                  src={song.image}
                  alt={song.name}
                  className="w-10 h-10 mr-4 object-cover"
                />
                <div>
                  <p className="font-bold">{song.name}</p>
                  <p className="text-sm text-gray-600">
                    {song.artist} - {song.album}
                  </p>
                </div>
              </div>
              <Button variant="ghost" onClick={() => onSongSelect(song)}>
                Añadir
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
