import { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { createAttendees } from '@/services/attendeesService';
import { SpotifySearch } from './SpotifySearch';
import { useSubdomainEvent } from '@/hooks/useSubdomain';
import { useEventStore } from '@/store/eventStore';
import { uiState } from '@/store/uiState';

export interface Attendee {
  name: string;
  intolerancesAndAllergies: string;
  useBusService: boolean;
  selectedTracks: string[];
  weddingId: string | null;
}

interface Song {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  previewUrl: string;
}

export default function ConfirmationForm() {
  const { loading, error } = useSubdomainEvent();
  const setShowAttendeeModal = uiState((state) => state.setShowAttendeeModal);

  const eventId = useEventStore((state) => state._id);

  const [attendees, setAttendees] = useState<Attendee[]>([
    {
      name: '',
      intolerancesAndAllergies: '',
      useBusService: false,
      selectedTracks: [],
      weddingId: null,
    },
  ]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showErrorCallout, setShowErrorCallout] = useState(false);

  const addAttendee = () => {
    if (attendees.length < 5 && eventId) {
      setAttendees([
        ...attendees,
        {
          name: '',
          intolerancesAndAllergies: '',
          useBusService: false,
          selectedTracks: [],
          weddingId: eventId,
        },
      ]);
    }
  };

  useEffect(() => {
    if (eventId) {
      setAttendees((prevAttendees) => [
        {
          ...prevAttendees[0],
          weddingId: eventId,
        },
      ]);
    }
  }, [eventId]);

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
    if (songs.length < 5 && !songs.some((s) => s.id === song.id)) {
      setSongs([...songs, song]);
    }
  };

  const removeSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  const handleConfirmAttendance = async () => {
    setIsFormSubmitted(true);
    const allNamesFilledOut = attendees.every(
      (attendee) => attendee.name.trim() !== ''
    );
    if (!allNamesFilledOut) {
      setShowErrorCallout(true);
      return;
    }
    const songIds = songs.map((song) => song.id); // Solo necesitamos los IDs
    console.log('Confirmación enviada', attendees, songIds);
    attendees[0].selectedTracks = songIds;
    await createAttendees(attendees);
    setShowAttendeeModal();
  };

  const areAllNamesFilled = () =>
    attendees.every((attendee) => attendee.name.trim() !== '');

  if (loading) return <div>Cargando información del evento...</div>;
  if (error) return <div>Error al cargar datos: {error}</div>;
  if (!eventId) return <div>No se encontró el ID del evento.</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-2 md:p-4 overflow-y-auto h-screen ">
      <div className="bg-white rounded-lg relative overflow-hidden shadow-xl max-w-2xl w-full ">
        <div className="flex justify-between items-center sticky top-0 bg-white z-10 border-b">
          <header className="p-6 flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold text-gray-800">
              Confirmar Asistencia
            </h2>
            <Button
              variant="ghost"
              className="w-max"
              onClick={setShowAttendeeModal}
            >
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
                  placeholder="Intolerancias Alimenticias (opcional)"
                  value={attendee.intolerancesAndAllergies}
                  onChange={(e) =>
                    updateAttendee(
                      index,
                      'intolerancesAndAllergies',
                      e.target.value
                    )
                  }
                  className="mb-2"
                />
                <div className="flex items-center">
                  <Switch
                    checked={attendee.useBusService}
                    onCheckedChange={(checked) =>
                      updateAttendee(index, 'useBusService', checked)
                    }
                    className={
                      attendee.useBusService
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
                      <div className="flex items-center">
                        <img
                          src={song.image}
                          alt={song.name}
                          className="w-10 h-10 mr-4 object-cover"
                        />
                        <span>
                          {song.name} - {song.artist}
                        </span>
                      </div>
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

              {/* Integración del componente de búsqueda */}
              <SpotifySearch onSongSelect={addSong} />
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
