import { create } from 'zustand';

interface PlayerState {
  activePlayerKey: string;
  setActivePlayerKey: (key: string) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  activePlayerKey: '主角',
  setActivePlayerKey: (key: string) => set({ activePlayerKey: key }),
}));
