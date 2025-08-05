const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function getUserCourses (id: string) {
  return fetch(`${API_URL}/user-course/user/${id}`, {
    credentials: 'include'
  }).then(response => response.json());
}