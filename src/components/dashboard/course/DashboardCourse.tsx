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

import { getCourseById, getCourseComments } from '@/lib/api/course.api';

const CourseDetailPage = ({ courseId }: { courseId: string }) => {

  const [activeTab, setActiveTab] = useState('general');
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [paginationComment, setPaginationComment] = useState(1);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [pagination, setPagination] = useState<any>(null);

  // You can now use courseId throughout your component
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

  // New useEffect for loading comments
  useEffect(() => {
    const loadComments = async () => {
      try {
        setCommentsLoading(true);
        console.log('Cargando comentarios del curso, página:', paginationComment);

        const courseComments = await getCourseComments(courseId, paginationComment);
        console.log('Comentarios del curso:', courseComments);

        setComments(courseComments.data);
        setPagination(courseComments.pagination);
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        setCommentsLoading(false);
      }
    };

    if (courseId) {
      loadComments();
    }
  }, [courseId, paginationComment]);

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

  const handlePreviousPage = () => {
    if (pagination?.hasPrevPage) {
      setPaginationComment(paginationComment - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setPaginationComment(paginationComment + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg lg:text-xl font-bold text-black">
            Comentarios {pagination && `(${pagination.totalCount})`}
          </h2>
          {pagination && pagination.totalPages > 1 && (
            <div className="text-sm text-gray-600">
              Página {pagination.currentPage} de {pagination.totalPages}
            </div>
          )}
        </div>
        
        {/* Comments List */}
        <div className="space-y-4 mb-6">
          {commentsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
              <p className="text-gray-600">Cargando comentarios...</p>
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center overflow-hidden">
                      {comment.user.urlPhoto ? (
                        <img 
                          src={comment.user.urlPhoto} 
                          alt={comment.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-purple-500">
                          {comment.user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-bold text-black">
                        {comment.isAnonymous ? 'Anónimo' : `@${comment.user.nickname}`}
                      </h4>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-400">{formatDate(comment.date)}</span>
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex items-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= comment.calification 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({comment.calification}/5)
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{comment.comment}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">0</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">0</span>
                      </button>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000]">
              <p className="text-gray-600">No hay comentarios aún</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePreviousPage}
              disabled={!pagination.hasPrevPage}
              className={`flex items-center px-4 py-2 border-2 border-black rounded-lg font-medium text-sm lg:text-base transition-all duration-150 ${
                pagination.hasPrevPage 
                  ? 'bg-white text-black shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-1 active:translate-y-1 active:shadow-none'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </button>
            
            <span className="text-sm text-gray-600">
              {pagination.currentPage} / {pagination.totalPages}
            </span>
            
            <button 
              onClick={handleNextPage}
              disabled={!pagination.hasNextPage}
              className={`flex items-center px-4 py-2 border-2 border-black rounded-lg font-medium text-sm lg:text-base transition-all duration-150 ${
                pagination.hasNextPage 
                  ? 'bg-black text-white shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-1 active:translate-y-1 active:shadow-none'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
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