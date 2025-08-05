"use client";
import { useCourseStore } from "@/store/course.store";

export function useCourse() {
  const { courses, setCourses, addCourse, removeCourse } = useCourseStore();

  return {
    courses,
    setCourses,
    addCourse,
    removeCourse
  };
}