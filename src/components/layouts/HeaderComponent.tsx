'use client';

import { Button } from '@/components/ui/button';
import ConfirmationForm from '../../sections/Home/Confirmation/confirmation-form';
import { LogoExample } from '@/components/LogoExample';
import { Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { uiState } from '@/store/uiState';

export const HeaderComponent = ({ isSticky }: { isSticky: boolean }) => {
  const showAttendeeModal = uiState((state) => state.showAttendeeModal);
  const setShowAttendeeModal = uiState((state) => state.setShowAttendeeModal);
  const location = useLocation();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
        <LogoExample />
        {location.pathname === '/gifts' ? (
          <Link
            to="/"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <Home className="h-6 w-6" />
          </Link>
        ) : (
          <>
            <Button
              size="lg"
              variant="link"
              className={`rounded-md px-4 ${
                isSticky
                  ? 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
              onClick={setShowAttendeeModal}
            >
              Confirmar asistencia
            </Button>
            {showAttendeeModal && <ConfirmationForm />}
          </>
        )}
      </div>
    </header>
  );
};
