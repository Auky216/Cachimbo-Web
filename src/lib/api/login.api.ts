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