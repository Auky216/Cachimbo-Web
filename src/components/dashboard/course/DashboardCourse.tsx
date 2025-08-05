"use client";   

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Star, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  Send,
  Heart,
  MessageCircle,
  MoreHorizontal
} from 'lucide-react';

import { getCourseById } from '@/lib/api/course.api';

const CourseDetailPage = ({ courseId }: { courseId: string }) => {

  const [activeTab, setActiveTab] = useState('general');
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // You can now use courseId throughout your component
  console.log('Course ID:', courseId);

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'material', label: 'Material' },
    { id: 'profesores', label: 'Profesores' }
  ];

  const comments = [
    {
      id: 1,
      user: {
        name: 'Carlos Paz',
        avatar: '👨‍💻',
        nickname: '@carlos.paz'
      },
      date: '15 Junio, 2025',
      content: 'El curso es bueno para aprender Python 10/10 papu',
      likes: 0,
      replies: 0
    },
    {
      id: 2,
      user: {
        name: 'Oreo',
        avatar: '🍪',
        nickname: '@oreo'
      },
      date: '5 Enero, 2024',
      content: 'Si no te gusta programar, mejor ni lo lleves',
      likes: 1,
      replies: 0
    },
    {
      id: 3,
      user: {
        name: 'Maria',
        avatar: '👩‍🎓',
        nickname: '@maria'
      },
      date: '14 Mayo, 2024',
      content: 'Soy bica y puedo decir que tiene su nivel D:',
      likes: 0,
      replies: 0
    }
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

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      console.log('Nuevo comentario:', newComment);
      console.log('Rating:', rating);
      setNewComment('');
      setRating(0);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log('Favorite toggled:', !isFavorite);
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
          <div className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4 lg:p-6">
            <h2 className="text-lg lg:text-xl font-bold mb-4 text-black">Definición</h2>
            <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
              {courseData.information}
            </p>
          </div>
        )}

        {activeTab === 'material' && (
          <div className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4 lg:p-6">
            <h2 className="text-lg lg:text-xl font-bold mb-4 text-black">Material del Curso</h2>
            <p className="text-gray-700 text-sm lg:text-base">
              Aquí encontrarás todos los materiales de estudio, documentos, presentaciones y recursos adicionales 
              para el curso de {courseData.name}.
            </p>
          </div>
        )}

        {activeTab === 'profesores' && (
          <div className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4 lg:p-6">
            <h2 className="text-lg lg:text-xl font-bold mb-4 text-black">Profesores</h2>
            <p className="text-gray-700 text-sm lg:text-base">
              Información sobre los profesores que imparten el curso de {courseData.name}, sus horarios y 
              métodos de contacto.
            </p>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="mb-6">
        <h2 className="text-lg lg:text-xl font-bold mb-4 text-black">Comentarios</h2>
        
        {/* Comments List */}
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center text-lg">
                    {comment.user.avatar}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-bold text-black">{comment.user.name}</h4>
                    <span className="text-xs text-gray-500">{comment.user.nickname}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{comment.content}</p>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">{comment.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{comment.replies}</span>
                    </button>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-6">
        <button className="flex items-center px-4 py-2 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none font-medium text-sm lg:text-base">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </button>
        <button className="flex items-center px-4 py-2 bg-black text-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none font-medium text-sm lg:text-base">
          Siguiente
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Comment Form */}
      <div className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4 lg:p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-black flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
          <div className="flex-1">
            {/* Rating Stars */}
            <div className="flex items-center space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-colors ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <Star className="w-5 h-5 fill-current" />
                </button>
              ))}
            </div>
            
            {/* Comment Input */}
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Escribe tu opinión..."
                className="w-full p-3 border-2 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                rows={3}
              />
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end mt-3">
              <button
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-black text-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none font-medium text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_0_#000000]"
              >
                <Send className="w-4 h-4 mr-2 inline" />
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;