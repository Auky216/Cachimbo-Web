import { useTokenStore } from '@/store/token.store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface RequestConfig extends RequestInit {
  skipAuth?: boolean;
  skipRefresh?: boolean;
}

class HttpClient {
  private isRefreshing = false;
  private refreshSubscribers: Array<(token: string) => void> = [];

  constructor() {
    // Inicializar verificación automática cada 50 minutos
    this.startTokenChecker();
  }

  // 🔄 VERIFICACIÓN AUTOMÁTICA DE TOKENS CADA 50 MINUTOS
  private startTokenChecker() {
    setInterval(async () => {
      const { token_refresh, hasRefreshToken } = useTokenStore.getState();
      
      if (hasRefreshToken()) {
        console.log('⏰ Verificación automática: renovando token preventivamente...');
        await this.handleTokenRefresh();
      }
    }, 50 * 60 * 1000); // 50 minutos
  }

  // 🔄 RENOVAR TOKENS
  private async refreshToken(): Promise<string | null> {
    const { getRefreshToken, setToken, clearToken } = useTokenStore.getState();
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      console.log('❌ No hay refresh token disponible');
      clearToken();
      this.redirectToLogin();
      return null;
    }

    try {
      console.log('🔄 Renovando tokens...');
      
      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      
      if (data.access_token && data.refresh_token) {
        console.log('✅ Tokens renovados exitosamente');
        setToken(data.access_token, data.refresh_token);
        return data.access_token;
      }

      throw new Error('Respuesta de refresh inválida');
      
    } catch (error) {
      console.error('❌ Error renovando token:', error);
      clearToken();
      this.redirectToLogin();
      return null;
    }
  }

  // 🚪 REDIRIGIR AL LOGIN
  private redirectToLogin() {
    console.log('🚪 Redirigiendo al login por tokens expirados...');
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  // 🔄 MANEJAR RENOVACIÓN CON COLA
  private async handleTokenRefresh(): Promise<string | null> {
    if (this.isRefreshing) {
      // Si ya está renovando, esperar en cola
      console.log('⏳ Esperando renovación en progreso...');
      return new Promise((resolve) => {
        this.refreshSubscribers.push(resolve);
      });
    }

    this.isRefreshing = true;
    const newToken = await this.refreshToken();
    this.isRefreshing = false;

    // Notificar a todos los que esperan
    this.refreshSubscribers.forEach(callback => callback(newToken || ''));
    this.refreshSubscribers = [];

    return newToken;
  }

  // 🔐 OBTENER HEADERS DE AUTORIZACIÓN
  private getAuthHeaders(): Record<string, string> {
    const { getAccessToken } = useTokenStore.getState();
    const token = getAccessToken();
    
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // 📡 PETICIÓN HTTP PRINCIPAL CON AUTO-REFRESH
  async request<T = any>(
    endpoint: string, 
    config: RequestConfig = {}
  ): Promise<T> {
    const { skipAuth = false, skipRefresh = false, ...fetchConfig } = config;
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    // Preparar headers
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(config.headers instanceof Headers
        ? Object.fromEntries(config.headers.entries())
        : Array.isArray(config.headers)
        ? Object.fromEntries(config.headers)
        : (config.headers || {})),
    };

    // Agregar token de autorización si no se omite
    if (!skipAuth) {
      headers = { ...headers, ...this.getAuthHeaders() };
    }

    console.log(`📡 ${fetchConfig.method || 'GET'} ${endpoint}`);

    // 🎯 PRIMERA SOLICITUD
    let response = await fetch(url, {
      ...fetchConfig,
      headers,
      credentials: 'include',
    });

    // 🔄 SI ES 401 (NO AUTORIZADO), RENOVAR TOKEN AUTOMÁTICAMENTE
    if (response.status === 401 && !skipAuth && !skipRefresh) {
      const { hasRefreshToken } = useTokenStore.getState();
      
      if (hasRefreshToken()) {
        console.log('🔑 Token expirado (401), renovando automáticamente...');
        const newToken = await this.handleTokenRefresh();
        
        if (newToken) {
          // ✅ REINTENTAR CON NUEVO TOKEN
          headers['Authorization'] = `Bearer ${newToken}`;
          console.log(`🔄 Reintentando ${fetchConfig.method || 'GET'} ${endpoint} con nuevo token`);
          
          response = await fetch(url, {
            ...fetchConfig,
            headers,
            credentials: 'include',
          });
        }
      } else {
        console.log('❌ No hay refresh token válido');
        this.redirectToLogin();
        throw new Error('Session expired');
      }
    }

    // ✅ PROCESAR RESPUESTA
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `HTTP Error ${response.status}` 
      }));
      
      console.error(`❌ Error ${response.status}:`, errorData.message);
      throw new Error(errorData.message || `HTTP Error ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    return response.text() as unknown as T;
  }

  // 📡 MÉTODOS DE CONVENIENCIA
  async get<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  async patch<T = any>(endpoint: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// 🎯 INSTANCIA SINGLETON
export const httpClient = new HttpClient();
export default httpClient;