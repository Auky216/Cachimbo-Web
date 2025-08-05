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