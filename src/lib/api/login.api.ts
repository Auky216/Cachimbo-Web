const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function redirectToGoogleLogin() {
  console.log('Redirigiendo a Google...');
  window.location.href = `${API_URL}/auth/google`;
}

export async function getUserData() {
  const response = await fetch(`${API_URL}/auth/user-data`, {
    credentials: 'include' // Para incluir cookies
  });
  return response.json();
}

export async function getRegistrationData() {
  const response = await fetch(`${API_URL}/auth/registration-data`, {
    credentials: 'include'
  });
  return response.json();
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
  const response = await fetch(`${API_URL}/auth/complete-registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al completar el registro');
  }

  return response.json();
}

export async function refreshToken(refreshToken: string) {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Error al refrescar el token');
  }

  return response.json();
}

export async function logout() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }

  return response.json();
}