import React from 'react';

interface CourseGeneralSectionProps {
  courseData: any;
}

const CourseGeneralSection = ({ courseData }: CourseGeneralSectionProps) => {
  return (
    <div className="bg-yellow-200 border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl font-bold mb-4 text-black">Definición</h2>
      <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
        {courseData.information}
      </p>
    </div>
  );
};

export default CourseGeneralSection;