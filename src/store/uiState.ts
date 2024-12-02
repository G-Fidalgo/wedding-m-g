import { create } from 'zustand';

interface IuiState {
  showAttendeeModal: boolean;
  setShowAttendeeModal: () => void;
}

export const uiState = create<IuiState>((set, get) => ({
  showAttendeeModal: false,
  setShowAttendeeModal: () => {
    set({ showAttendeeModal: !get().showAttendeeModal });
  },
}));
