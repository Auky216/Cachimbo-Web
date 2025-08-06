"use client";   

import React, { useEffect, useState } from 'react';
import { 
  Star, 
  Users
} from 'lucide-react';

import { getCourseById } from '@/lib/api/course.api';
import CourseGeneralSection from './ui/CourseGeneralSectionComponent';
import CourseMaterialSection from './ui/CourseMaterialSectionComponent';
import CourseTeachersSection from './ui/CourseTeachersSectionComponent';
import CourseCommentsSection from './ui/CourseCommentsSectionComponent';

const CourseDetailPage = ({ 
  courseId, 
   
}: { 
  courseId: string;
}) => {

  const [activeTab, setActiveTab] = useState('general');
  const [isFavorite, setIsFavorite] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log('Course ID:', courseId);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'material', label: 'Material' },
    { id: 'profesores', label: 'Profesores' }
  ];

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        console.log('Cargando datos del curso con ID:', courseId);

        const data = await getCourseById(courseId);
        console.log('Datos del curso:', data);

        setCourseData(data);
      } catch (error) {
        console.error('Error loading course data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadCourseData();
    }
  }, [courseId]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite toggled:', !isFavorite);
    // Aquí puedes llamar a la API para toggle del favorito
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos del curso...</p>
        </div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No se pudieron cargar los datos del curso</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-purple-500 rounded-lg border-2 border-black shadow-[3px_3px_0_0_#000000] p-4 lg:p-6 text-white relative overflow-hidden mb-6">
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold mb-2">{courseData.name}</h1>
            <div className="flex items-center text-sm opacity-90 mb-2">
              <Users className="w-4 h-4 mr-1" />
              <span>{courseData.followers} seguidores</span>
            </div>
            {/* Course Rating */}
            <div className="flex items-center text-sm opacity-90">
              <Star className="w-4 h-4 mr-1 fill-current text-yellow-300" />
              <span>{courseData.calification}/5.0</span>
            </div>
          </div>
          <button
            onClick={toggleFavorite}
            className={`
              p-2 rounded-lg border-2 transition-all duration-200
              hover:scale-110 active:scale-95 z-20
              ${isFavorite 
                ? 'bg-yellow-400 text-white border-yellow-400 shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]' 
                : 'bg-transparent text-white border-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400'
              }
            `}
          >
            <Star 
              className={`w-5 h-5 transition-all duration-200 ${
                isFavorite ? 'fill-current' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 lg:space-x-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                px-4 py-2 rounded-lg border-2 border-black font-medium text-sm lg:text-base
                transition-all duration-150 ease-in-out whitespace-nowrap
                hover:translate-x-[-1px] hover:translate-y-[-1px]
                active:translate-x-1 active:translate-y-1
                ${activeTab === tab.id
                  ? 'bg-black text-white shadow-[3px_3px_0_0_#000000]'
                  : 'bg-white text-black shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'general' && (
          <CourseGeneralSection courseData={courseData} />
        )}

        {activeTab === 'material' && (
          <CourseMaterialSection courseData={courseData} />
        )}

        {activeTab === 'profesores' && (
          <CourseTeachersSection courseData={courseData} />
        )}
      </div>

      {/* Comments Section */}
      <CourseCommentsSection 
        courseId={courseId} 
      />
    </div>
  );
};

export default CourseDetailPage;