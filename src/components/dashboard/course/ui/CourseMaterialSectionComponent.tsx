import React from 'react';

interface CourseMaterialSectionProps {
  courseData: any;
}

const CourseMaterialSection = ({ courseData }: CourseMaterialSectionProps) => {
  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4 lg:p-6">
      <h2 className="text-lg lg:text-xl font-bold mb-4 text-black">Material del Curso</h2>
      
      {courseData.materials && courseData.materials.length > 0 ? (
        <div className="space-y-3">
          {courseData.materials.map((material: any) => (
            <div 
              key={material.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-medium text-black text-sm lg:text-base">{material.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Subido el {new Date(material.date).toLocaleDateString('es-ES')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-700 text-sm lg:text-base">
            Aquí encontrarás todos los materiales de estudio, documentos, presentaciones y recursos adicionales 
            para el curso de {courseData.name}.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            No hay materiales disponibles en este momento.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseMaterialSection;