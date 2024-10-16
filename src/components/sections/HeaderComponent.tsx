import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ConfirmationForm from '../confirmation-form';

export const HeaderComponent = ({ isSticky }: { isSticky: boolean }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
        <h1
          className={`text-2xl font-bold ${
            isSticky ? 'text-gray-800' : 'text-black'
          }`}
        >
          ¡Nos casamos!
        </h1>
        <Button
          size="lg"
          variant="link"
          className={`rounded-md ${
            isSticky
              ? 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          onClick={() => setIsFormOpen(true)}
        >
          Confirmar asistencia
        </Button>
        {isFormOpen && (
          <ConfirmationForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </header>
  );
};
