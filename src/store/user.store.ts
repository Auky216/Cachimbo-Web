import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
 id: string;
 stage: string;
 startYear: number;
 career: string;
 nickname: string;
 email: string;
 name: string;
 lastName: string;
 isActive: boolean;
 urlPhoto: string;
};

type UserStore = {
 user: User | null;
 setUser: (user: User) => void;
 clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
 persist(
   (set) => ({
     user: null,
     setUser: (user) => set({ user }),
     clearUser: () => set({ user: null }),
   }),
   {
     name: "user-storage",
     // getStorage: () => localStorage, // Esta línea no es necesaria (es por defecto)
   }
 )
);