// lib/api/login.api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export function redirectToGoogleLogin() {
  window.location.href = `${API_URL}/auth/google`;
}
