import React from 'react';
import { User } from 'lucide-react';

interface CourseTeachersSectionProps {
  courseData: any;
}

const CourseTeachersSection = ({ courseData }: CourseTeachersSectionProps) => {
  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl font-bold mb-4 text-black">Profesores</h2>
      
      {courseData.teacherCourses && courseData.teacherCourses.length > 0 ? (
        <div className="space-y-4">
          {courseData.teacherCourses.map((teacherCourse: any) => (
            <div 
              key={teacherCourse.teacher.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center overflow-hidden">
                  {teacherCourse.teacher.urlPhoto ? (
                    <img 
                      src={teacherCourse.teacher.urlPhoto} 
                      alt={`${teacherCourse.teacher.name} ${teacherCourse.teacher.lastname}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-purple-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-black text-sm lg:text-base">
                    {teacherCourse.teacher.name} {teacherCourse.teacher.lastname}
                  </h3>
                  {teacherCourse.teacher.description && (
                    <p className="text-gray-600 text-xs lg:text-sm mt-1">
                      {teacherCourse.teacher.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-700 text-sm lg:text-base">
            Información sobre los profesores que imparten el curso de {courseData.name}, sus horarios y 
            métodos de contacto.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            No hay información de profesores disponible en este momento.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseTeachersSection;