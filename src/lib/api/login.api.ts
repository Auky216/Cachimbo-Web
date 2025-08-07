// lib/api/login.api.ts - CON ZUSTAND STORE
import httpClient from './httpClient';
import { useTokenStore } from '@/store/token.store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function redirectToGoogleLogin() {
  console.log('🔄 Redirigiendo a Google OAuth...');
  window.location.href = `${API_URL}/auth/google`;
}

export function extractGoogleDataFromUrl(): any | null {
  const params = new URLSearchParams(window.location.search);
  const encodedData = params.get('data');
  
  if (encodedData) {
    try {
      const decodedData = JSON.parse(atob(encodedData));
      console.log('📥 Datos de Google extraídos:', decodedData);
      return decodedData;
    } catch (error) {
      console.error('❌ Error al decodificar datos:', error);
      return null;
    }
  }
  
  return null;
}

export function extractTokensFromUrl(): { access_token: string; refresh_token: string } | null {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  
  if (accessToken && refreshToken) {
    // 🎯 GUARDAR EN ZUSTAND STORE (no localStorage)
    const { setToken } = useTokenStore.getState();
    setToken(accessToken, refreshToken);
    
    // Limpiar URL
    window.history.replaceState({}, document.title, window.location.pathname);
    
    console.log('🎫 Tokens extraídos y guardados en Zustand store');
    return { access_token: accessToken, refresh_token: refreshToken };
  }
  
  return null;
}

export async function completeRegistration(data: {
  email: string;
  name: string;
  lastname: string;
  urlPhoto?: string;
  nickname?: string;
  stage?: string;
  startYear?: number;
  career?: string;
}) {
  console.log('📝 Completando registro...');
  const response = await httpClient.post('/auth/complete-registration', data, { skipAuth: true });
  
  // Si la respuesta incluye tokens, guardarlos en el store
  if (response.access_token && response.refresh_token) {
    const { setToken } = useTokenStore.getState();
    setToken(response.access_token, response.refresh_token);
    console.log('🎫 Tokens de registro guardados en Zustand store');
  }
  
  return response;
}

export async function getProfile() {
  console.log('👤 Obteniendo perfil...');
  return httpClient.get('/auth/profile');
}

export async function logout() {
  console.log('👋 Cerrando sesión...');
  
  try {
    await httpClient.post('/auth/logout', {});
  } catch (error) {
    console.error('Error al cerrar sesión en el servidor:', error);
  }
  
  // Limpiar tokens del store
  const { clearToken } = useTokenStore.getState();
  clearToken();
}