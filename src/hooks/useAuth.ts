"use client";
import { useAuthStore } from '@/store/auth.store';

export function useAuth() {
  const { isAuthenticated, loading, name, lastName, email, urlPhoto, setAuthenticated, setLoading, setName, setLastName, setEmail, setUrlPhoto } = useAuthStore();
  return {
    isAuthenticated,
    loading,
    name,
    lastName,
    email,
    urlPhoto,
    setAuthenticated,
    setLoading,
    setName,
    setLastName,
    setEmail,
    setUrlPhoto
  };
}