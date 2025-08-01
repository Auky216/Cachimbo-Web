// lib/store/user.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  nickname?: string;
  stage?: string;
  startYear?: number;
  career?: string;
  urlPhoto?: string;
};

type UserState = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clear: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      clear: () => set({ user: null, token: null }),
    }),
    {
      name: 'user-storage', // localStorage key
    }
  )
);
