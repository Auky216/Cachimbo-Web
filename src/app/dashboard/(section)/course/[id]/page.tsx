"use client";
import DashboardCourse from "@/components/dashboard/course/DashboardCourse";
import { useParams } from "next/navigation";

export default function CoursePage() {
  const params = useParams();
  const courseId = params.id as string;

  console.log('Course ID:', courseId);
  return (
    <div>
      <DashboardCourse courseId={courseId} />
    </div>
  );
}