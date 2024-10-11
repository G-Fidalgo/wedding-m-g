import { useState, useEffect } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface Attendee {
  name: string;
  foodIntolerances: string;
  allergies: string;
  usesBusService: boolean;
}

interface Song {
  id: string;
  name: string;
  artist: string;
}

export default function ConfirmationForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [attendees, setAttendees] = useState<Attendee[]>([
    { name: '', foodIntolerances: '', allergies: '', usesBusService: false },
  ]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Song[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showErrorCallout, setShowErrorCallout] = useState(false);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      // Simular búsqueda en Spotify (reemplazar con API real)
      const fakeResults = [
        { id: '1', name: 'Canción 1', artist: 'Artista 1' },
        { id: '2', name: 'Canción 2', artist: 'Artista 2' },
        { id: '3', name: 'Canción 3', artist: 'Artista 3' },
        { id: '4', name: 'Canción 4', artist: 'Artista 4' },
        { id: '5', name: 'Canción 5', artist: 'Artista 5' },
      ];
      setSearchResults(fakeResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const addAttendee = () => {
    if (attendees.length < 5) {
      setAttendees([
        ...attendees,
        {
          name: '',
          foodIntolerances: '',
          allergies: '',
          usesBusService: false,
        },
      ]);
    }
  };

  const removeAttendee = (index: number) => {
    const newAttendees = attendees.filter((_, i) => i !== index);
    setAttendees(newAttendees);
  };

  const updateAttendee = (
    index: number,
    field: keyof Attendee,
    value: string | boolean
  ) => {
    const newAttendees = [...attendees];
    newAttendees[index] = { ...newAttendees[index], [field]: value };
    setAttendees(newAttendees);
  };

  const addSong = (song: Song) => {
    if (songs.length < 5) {
      setSongs([...songs, song]);
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const removeSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const handleConfirmAttendance = () => {
    setIsFormSubmitted(true);
    const allNamesFilledOut = attendees.every(
      (attendee) => attendee.name.trim() !== ''
    );
    if (!allNamesFilledOut) {
      setShowErrorCallout(true);
      return;
    }
    // Aquí iría la lógica para enviar la confirmación
    console.log('Confirmación enviada', attendees, songs);
  };

  const areAllNamesFilled = () =>
    attendees.every((attendee) => attendee.name.trim() !== '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-2 md:p-4 overflow-y-auto h-screen ">
      <div className="bg-white rounded-lg relative overflow-hidden shadow-xl max-w-2xl w-full ">
        <div className="flex justify-between items-center sticky top-0 bg-white z-10 border-b">
          <header className="p-6 flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold text-gray-800">
              Confirmar Asistencia
            </h2>
            <Button variant="ghost" className="w-max" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </header>
        </div>
        <div className=" max-h-[80vh] overflow-y-auto">
          <div className="p-6">
            {attendees.map((attendee, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {attendee.name || `Asistente ${index + 1}`}
                  </h3>
                  {index !== 0 && (
                    <Button
                      variant="ghost"
                      onClick={() => removeAttendee(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <Input
                  placeholder="Nombre y Apellidos"
                  value={attendee.name}
                  onChange={(e) =>
                    updateAttendee(index, 'name', e.target.value)
                  }
                  className="mb-2"
                  required
                />
                <Textarea
                  placeholder="Intolerancias Alimenticias"
                  value={attendee.foodIntolerances}
                  onChange={(e) =>
                    updateAttendee(index, 'foodIntolerances', e.target.value)
                  }
                  className="mb-2"
                />
                <Textarea
                  placeholder="Alergias"
                  value={attendee.allergies}
                  onChange={(e) =>
                    updateAttendee(index, 'allergies', e.target.value)
                  }
                  className="mb-2"
                />
                <div className="flex items-center">
                  <Switch
                    checked={attendee.usesBusService}
                    onCheckedChange={(checked) =>
                      updateAttendee(index, 'usesBusService', checked)
                    }
                    className={
                      attendee.usesBusService
                        ? 'data-[state=checked]:bg-[#17B169]'
                        : 'data-[state=unchecked]:bg-[#fd5c63]'
                    }
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Usarás el servicio de autobús
                  </span>
                </div>
              </div>
            ))}

            {attendees.length < 5 && (
              <Button onClick={addAttendee} className="mb-6">
                <Plus className="h-4 w-4 mr-2" /> Añadir Acompañante
              </Button>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Dinos si hay alguna canción que te encantaría bailar con
                nosotros
              </h3>

              {songs.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">
                    Canciones seleccionadas:
                  </h4>
                  {songs.map((song) => (
                    <div
                      key={song.id}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                    >
                      <span>
                        {song.name} - {song.artist}
                      </span>
                      <Button
                        variant="ghost"
                        onClick={() => removeSong(song.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="relative">
                <Input
                  placeholder="Buscar canción..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {searchResults.length > 0 && (
                <ul className="mt-2 bg-white border border-gray-200 rounded-md shadow-sm">
                  {searchResults.slice(0, 5).map((song) => (
                    <li
                      key={song.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-100"
                    >
                      <span>
                        {song.name} - {song.artist}
                      </span>
                      <Button variant="ghost" onClick={() => addSong(song)}>
                        Añadir
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {showErrorCallout && !areAllNamesFilled() && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Atención: </strong>
                <span className="block sm:inline">
                  Por favor, rellena el nombre de todos los asistentes antes de
                  confirmar.
                </span>
              </div>
            )}
          </div>
          <footer className="p-6 sticky border-t bottom-0 bg-white">
            <Button
              className="w-full  bg-[#17B169] text-white disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleConfirmAttendance}
              disabled={isFormSubmitted && !areAllNamesFilled()}
            >
              Confirmar Asistencia
            </Button>
          </footer>
        </div>
      </div>
    </div>
  );
}
