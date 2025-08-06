import httpClient from './httpClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// ==========================================
// 🔓 FUNCIONES PÚBLICAS (SIN AUTENTICACIÓN)
// ==========================================

export function redirectToGoogleLogin() {
  console.log('🔄 Redirigiendo a Google OAuth...');
  window.location.href = `${API_URL}/auth/google`;
}

export async function getRegistrationData() {
  console.log('📥 Obteniendo datos de registro...');
  return httpClient.get('/auth/registration-data', { skipAuth: true });
}

export async function getUserData() {
  console.log('👤 Obteniendo datos de usuario...');
  return httpClient.get('/auth/user-data', { skipAuth: true });
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
  return httpClient.post('/auth/complete-registration', data, { skipAuth: true });
}

// ==========================================
// 🔐 FUNCIONES PROTEGIDAS (CON AUTO-REFRESH)
// ==========================================

export async function getProfile() {
  console.log('👤 Obteniendo perfil...');
  return httpClient.get('/auth/profile');
}

export async function logout() {
  console.log('👋 Cerrando sesión...');
  return httpClient.post('/auth/logout');
}

// ==========================================
// 📚 CURSOS (CON AUTO-REFRESH)
// ==========================================

export async function getUserCourses(userId: string) {
  console.log(`📚 Obteniendo cursos del usuario ${userId}...`);
  return httpClient.get(`/user/${userId}/courses`);
}

export async function getCourses() {
  console.log('📚 Obteniendo todos los cursos...');
  return httpClient.get('/course');
}

export async function getCourseById(id: string) {
  console.log(`📚 Obteniendo curso ${id}...`);
  return httpClient.get(`/course/${id}`);
}

export async function enrollInCourse(courseId: string) {
  console.log(`📝 Inscribiéndose al curso ${courseId}...`);
  return httpClient.post(`/course/${courseId}/enroll`);
}

// ==========================================
// 📄 MATERIALES (CON AUTO-REFRESH)
// ==========================================

export async function getMaterials() {
  console.log('📄 Obteniendo materiales...');
  return httpClient.get('/material');
}

export async function createMaterial(data: {
  title: string;
  description?: string;
  courseId: string;
  universityId: string;
}) {
  console.log('📝 Creando material...');
  return httpClient.post('/material', data);
}

export async function updateMaterial(id: string, data: any) {
  console.log(`✏️ Actualizando material ${id}...`);
  return httpClient.put(`/material/${id}`, data);
}

export async function deleteMaterial(id: string) {
  console.log(`🗑️ Eliminando material ${id}...`);
  return httpClient.delete(`/material/${id}`);
}

export async function likeMaterial(materialId: string) {
  console.log(`❤️ Dando like al material ${materialId}...`);
  return httpClient.post(`/material/${materialId}/like`);
}

// ==========================================
// 👨‍🏫 PROFESORES (CON AUTO-REFRESH)
// ==========================================

export async function getTeachers() {
  console.log('👨‍🏫 Obteniendo profesores...');
  return httpClient.get('/teacher');
}

export async function rateTeacher(teacherId: string, data: {
  rating: number;
  comment?: string;
  isAnonymous?: boolean;
}) {
  console.log(`⭐ Calificando profesor ${teacherId}...`);
  return httpClient.post(`/teacher/${teacherId}/rate`, data);
}

// ==========================================
// 🏢 ORGANIZACIONES (CON AUTO-REFRESH)
// ==========================================

export async function getOrganizations() {
  console.log('🏢 Obteniendo organizaciones...');
  return httpClient.get('/organization');
}

export async function followOrganization(organizationId: string) {
  console.log(`➕ Siguiendo organización ${organizationId}...`);
  return httpClient.post(`/organization/${organizationId}/follow`);
}

// ==========================================
// ⚙️ USUARIO (CON AUTO-REFRESH)
// ==========================================

export async function updateUserProfile(data: {
  name?: string;
  lastname?: string;
  nickname?: string;
  stage?: string;
  startYear?: number;
  career?: string;
}) {
  console.log('✏️ Actualizando perfil...');
  return httpClient.put('/user/profile', data);
}

export async function getUserFavorites() {
  console.log('⭐ Obteniendo favoritos...');
  return httpClient.get('/user/favorites');
}

// ==========================================
// 🔧 EJEMPLO DE USO EN COMPONENTES
// ==========================================

/*
// En cualquier componente:
import { getCourses, createMaterial } from '@/lib/api/api';

const MiComponente = () => {
  const handleGetCourses = async () => {
    try {
      // ✅ AUTO-REFRESH: Si el token expira, se renueva automáticamente
      const courses = await getCourses();
      console.log('Cursos:', courses);
    } catch (error) {
      // Si hay error, el token ya fue renovado automáticamente
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleGetCourses}>
      Obtener Cursos
    </button>
  );
};
*/