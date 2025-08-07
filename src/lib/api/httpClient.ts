// lib/httpClient.ts - CORREGIDO
class HttpClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  }

  private async request(
    endpoint: string, 
    options: RequestInit = {}, 
    config: { skipAuth?: boolean } = {}
  ) {
    const url = `${this.baseURL}${endpoint}`;
    
    // Headers base
    // Normalizar headers a Record<string, string>
    let normalizedHeaders: Record<string, string> = {};
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        normalizedHeaders[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        normalizedHeaders[key] = value;
      });
    } else if (typeof options.headers === 'object' && options.headers !== null) {
      normalizedHeaders = { ...options.headers as Record<string, string> };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...normalizedHeaders,
    };

    // Si NO es skipAuth, agregar token
    if (!config.skipAuth) {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    // Configuración de request
    const requestConfig: RequestInit = {
      ...options,
      headers,
      // 👈 NO incluir credentials para requests públicos
      ...(config.skipAuth ? {} : { credentials: 'omit' })
    };

    console.log(`📡 ${options.method || 'GET'} ${endpoint}`);
    
    try {
      const response = await fetch(url, requestConfig);
      
      // Si es 401 y NO es skipAuth, intentar refresh
      if (response.status === 401 && !config.skipAuth) {
        console.log('🔄 Token expirado, intentando renovar...');
        
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry con nuevo token
          const newToken = localStorage.getItem('access_token');
          if (newToken) {
            headers['Authorization'] = `Bearer ${newToken}`;
          }
          
          const retryResponse = await fetch(url, {
            ...requestConfig,
            headers
          });
          
          if (!retryResponse.ok) {
            throw new Error(`HTTP ${retryResponse.status}: ${retryResponse.statusText}`);
          }
          
          return retryResponse.json();
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error(`❌ Error en ${endpoint}:`, error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
        credentials: 'omit' // 👈 Sin credentials
      });

      if (response.ok) {
        const tokens = await response.json();
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        return true;
      }

      // Si refresh falla, limpiar tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return false;
    } catch (error) {
      console.error('❌ Error al renovar token:', error);
      return false;
    }
  }

  async get(endpoint: string, config: { skipAuth?: boolean } = {}) {
    return this.request(endpoint, { method: 'GET' }, config);
  }

  async post(endpoint: string, data: any, config: { skipAuth?: boolean } = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }, config);
  }

  async put(endpoint: string, data: any, config: { skipAuth?: boolean } = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, config);
  }

  async delete(endpoint: string, config: { skipAuth?: boolean } = {}) {
    return this.request(endpoint, { method: 'DELETE' }, config);
  }
}

const httpClient = new HttpClient();
export default httpClient;