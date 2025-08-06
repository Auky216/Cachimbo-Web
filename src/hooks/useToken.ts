import { useTokenStore } from '@/store/token.store';    

export const useToken = () => {
  const { 
    getAccessToken, 
    getRefreshToken, 
    hasAccessToken, 
    hasRefreshToken,
    setToken,  // ← Agregar esto
    clearToken // ← Y esto también por si lo necesitas
  } = useTokenStore();

  return {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    isAuthenticated: hasAccessToken() || hasRefreshToken(),
    setToken,     // ← Exponer la función
    clearToken,   // ← Y esta también
  };
};