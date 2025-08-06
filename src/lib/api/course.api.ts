const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function getUserCourses (idUser: string) {
  return fetch(`${API_URL}/user-course/user/${idUser} `, {
    credentials: 'include'
  }).then(response => response.json());
}

export function getCourseById (idCourse: string) {
  return fetch(`${API_URL}/course/${idCourse}`, {
    credentials: 'include'
  }).then(response => response.json());
}

export function getCourseComments (idCourse: string, numberPage: number) {
  return fetch(`${API_URL}/course-comments/course/${idCourse}?page=${numberPage}&limit=5`, {
    credentials: 'include'
  }).then(response => response.json());
}

export function checkUserCommentInCourse(userId: string, courseId: string) {
  return fetch(`${API_URL}/course-comments/check/${userId}/${courseId}`, {
    credentials: 'include'
  }).then(response => response.json());
}

export function createCourseComment(data: {
  userId: string;
  courseId: string;
  comment: string;
  calification: number;
  isAnonymous?: boolean;
}) {
  return fetch(`${API_URL}/course-comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data)
  }).then(response => response.json());
}

export function updateCourseComment(commentId: string, data: {
  comment?: string;
  calification?: number;
  isAnonymous?: boolean;
}) {
  return fetch(`${API_URL}/course-comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data)
  }).then(response => response.json());
}

export function deleteCourseComment(commentId: string) {
  return fetch(`${API_URL}/course-comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(response => response.json());
}

// ===== FUNCIONES ADICIONALES =====

export function getAllCourseComments(page: number = 1, limit: number = 10) {
  return fetch(`${API_URL}/course-comments?page=${page}&limit=${limit}`, {
    credentials: 'include'
  }).then(response => response.json());
}

export function getCommentsByUser(userId: string, page: number = 1, limit: number = 10) {
  return fetch(`${API_URL}/course-comments/user/${userId}?page=${page}&limit=${limit}`, {
    credentials: 'include'
  }).then(response => response.json());
}

export function getCourseCommentById(commentId: string) {
  return fetch(`${API_URL}/course-comments/${commentId}`, {
    credentials: 'include'
  }).then(response => response.json());
}