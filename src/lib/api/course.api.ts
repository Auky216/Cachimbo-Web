import httpClient from './httpClient';

// ==========================================
// 📚 CURSOS CON AUTO-REFRESH
// ==========================================

export function getUserCourses(idUser: string) {
  console.log(`📚 Obteniendo cursos del usuario ${idUser}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.get(`/user-course/user/${idUser}`);
}

export function getCourseById(idCourse: string) {
  console.log(`📚 Obteniendo curso ${idCourse}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.get(`/course/${idCourse}`);
}

// ==========================================
// 💬 COMENTARIOS DE CURSOS CON AUTO-REFRESH
// ==========================================

export function getCourseComments(idCourse: string, numberPage: number) {
  console.log(`💬 Obteniendo comentarios del curso ${idCourse}, página ${numberPage}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.get(`/course-comments/course/${idCourse}?page=${numberPage}&limit=5`);
}

export function checkUserCommentInCourse(userId: string, courseId: string) {
  console.log(`🔍 Verificando comentario del usuario ${userId} en curso ${courseId}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.get(`/course-comments/check/${userId}/${courseId}`);
}

export function createCourseComment(data: {
  userId: string;
  courseId: string;
  comment: string;
  calification: number;
  isAnonymous?: boolean;
}) {
  console.log(`💬 Creando comentario en curso ${data.courseId}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.post('/course-comments', data);
}

export function updateCourseComment(commentId: string, data: {
  comment?: string;
  calification?: number;
  isAnonymous?: boolean;
}) {
  console.log(`✏️ Actualizando comentario ${commentId}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.put(`/course-comments/${commentId}`, data);
}

export function deleteCourseComment(commentId: string) {
  console.log(`🗑️ Eliminando comentario ${commentId}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.delete(`/course-comments/${commentId}`);
}

// ==========================================
// 📝 FUNCIONES ADICIONALES CON AUTO-REFRESH
// ==========================================

export function getAllCourseComments(page: number = 1, limit: number = 10) {
  console.log(`💬 Obteniendo todos los comentarios, página ${page}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.get(`/course-comments?page=${page}&limit=${limit}`);
}

export function getCommentsByUser(userId: string, page: number = 1, limit: number = 10) {
  console.log(`💬 Obteniendo comentarios del usuario ${userId}, página ${page}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.get(`/course-comments/user/${userId}?page=${page}&limit=${limit}`);
}

export function getCourseCommentById(commentId: string) {
  console.log(`💬 Obteniendo comentario ${commentId}...`);
  // ✅ AUTO-REFRESH: Si token expira, se renueva automáticamente
  return httpClient.get(`/course-comments/${commentId}`);
}

// ==========================================
// 🔧 EJEMPLO DE USO ACTUALIZADO
// ==========================================

/*
// Antes (manual):
const response = await fetch(`/api/course/${id}`, {
  headers: {
    'Authorization': `Bearer ${token}`, // ❌ Manual
  }
});

// Ahora (automático):
const course = await getCourseById(id); // ✅ Auto-refresh automático

// Si el token expira durante la petición:
// 1. httpClient detecta 401
// 2. Renueva automáticamente el token
// 3. Reintenta la petición con el nuevo token
// 4. Devuelve los datos sin que el usuario note nada
*/

// ==========================================
// 📊 FUNCIONES DE ESTADÍSTICAS (EJEMPLOS)
// ==========================================

export function getCourseStats(courseId: string) {
  console.log(`📊 Obteniendo estadísticas del curso ${courseId}...`);
  return httpClient.get(`/course/${courseId}/stats`);
}

export function getUserCourseProgress(userId: string, courseId: string) {
  console.log(`📈 Obteniendo progreso del usuario ${userId} en curso ${courseId}...`);
  return httpClient.get(`/user/${userId}/course/${courseId}/progress`);
}

// ==========================================
// 🔄 FUNCIONES DE INSCRIPCIÓN
// ==========================================

export function enrollInCourse(userId: string, courseId: string) {
  console.log(`📝 Inscribiendo usuario ${userId} en curso ${courseId}...`);
  return httpClient.post('/user-course', {
    userId,
    courseId
  });
}

export function unenrollFromCourse(userId: string, courseId: string) {
  console.log(`❌ Desinscribiendo usuario ${userId} del curso ${courseId}...`);
  return httpClient.delete(`/user-course/${userId}/${courseId}`);
}

// ==========================================
// ⭐ FUNCIONES DE CALIFICACIÓN
// ==========================================

export function rateCourse(userId: string, courseId: string, rating: number) {
  console.log(`⭐ Usuario ${userId} calificando curso ${courseId} con ${rating} estrellas...`);
  return httpClient.post(`/course/${courseId}/rate`, {
    userId,
    rating
  });
}

export function getCourseRating(courseId: string) {
  console.log(`⭐ Obteniendo calificación del curso ${courseId}...`);
  return httpClient.get(`/course/${courseId}/rating`);
}