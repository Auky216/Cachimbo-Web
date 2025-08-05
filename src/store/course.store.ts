import { create } from "zustand";
import { persist } from "zustand/middleware";


type Course = {
  id: string;
  name: string;
};


type CourseStore = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  addCourse: (course: Course) => void;
  removeCourse: (courseId: string) => void;
};


export const useCourseStore = create<CourseStore>()(
  persist(
    (set) => ({
      courses: [],
      setCourses: (courses) => set({ courses }),
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
      removeCourse: (courseId) => set((state) => ({
        courses: state.courses.filter(course => course.id !== courseId)
      })),
    }),
    {
      name: "course-storage",
    }
  )
);
