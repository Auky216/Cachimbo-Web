import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    isAuthenticated: boolean;
    loading: boolean;
    name?: string;
    lastName?: string;
    email?: string;
    urlPhoto?: string;

    setAuthenticated: (isAuthenticated: boolean) => void;
    setLoading: (loading: boolean) => void;
    setName: (name: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setUrlPhoto: (urlPhoto: string) => void;
}

export const useAuthStore = create<UserState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            loading: false,
            name: undefined,
            lastName: undefined,
            email: undefined,
            urlPhoto: undefined,

            setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            setLoading: (loading) => set({ loading }),
            setName: (name) => set({ name }),
            setLastName: (lastName) => set({ lastName }),
            setEmail: (email) => set({ email }),
            setUrlPhoto: (urlPhoto) => set({ urlPhoto }),
        }),
        {
            name: "auth-storage",
        }
    )
);