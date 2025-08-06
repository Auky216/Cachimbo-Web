import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type TokenStore = {
  // Estados
  token_access: string | null;
  token_refresh: string | null;
  
  // Acciones
  setToken: (access: string, refresh: string) => void;
  clearToken: () => void;
  
  // Getters útiles
  hasAccessToken: () => boolean;
  hasRefreshToken: () => boolean;
  isAuthenticated: () => boolean;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
};

export const useTokenStore = create<TokenStore>()(
  persist(
    (set, get) => ({
      // Estados iniciales
      token_access: null,
      token_refresh: null,
      
      // Guardar ambos tokens
      setToken: (access: string, refresh: string) => {
        console.log('🔐 Guardando tokens en el store');
        set(() => ({ 
          token_access: access, 
          token_refresh: refresh 
        }));
      },
      
      // Limpiar todos los tokens
      clearToken: () => {
        console.log('🧹 Limpiando tokens del store');
        set(() => ({ 
          token_access: null, 
          token_refresh: null 
        }));
      },
      
      // Verificar si tiene access token
      hasAccessToken: () => {
        const state = get();
        return !!state.token_access;
      },
      
      // Verificar si tiene refresh token
      hasRefreshToken: () => {
        const state = get();
        return !!state.token_refresh;
      },
      
      // Verificar si está autenticado (tiene al menos uno de los tokens)
      isAuthenticated: () => {
        const state = get();
        return !!(state.token_access || state.token_refresh);
      },
      
      // Obtener access token
      getAccessToken: () => {
        const state = get();
        return state.token_access;
      },
      
      // Obtener refresh token
      getRefreshToken: () => {
        const state = get();
        return state.token_refresh;
      },
    }),
    {
      name: "token-storage", // nombre del item en localStorage
      storage: createJSONStorage(() => localStorage), // sintaxis correcta para Zustand v4+
    }
  )
);