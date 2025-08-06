"use client";

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Send, Heart, MessageCircle, Trash2, EyeOff, Eye } from 'lucide-react';
import { getCourseComments, createCourseComment, deleteCourseComment } from '@/lib/api/course.api';
import { useUser } from '@/hooks/useUser';

interface CourseCommentsSectionProps {
courseId: string;
}

const CourseCommentsSection = ({ courseId }: CourseCommentsSectionProps) => {
const { id: currentUserId, urlPhoto: currentUserPhoto, nickname: currentUserNickname } = useUser();
const [page, setPage] = useState(1);
const [comments, setComments] = useState<any[]>([]);
const [pagination, setPagination] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [newComment, setNewComment] = useState('');
const [rating, setRating] = useState(0);
const [submitting, setSubmitting] = useState(false);
const [isAnonymous, setIsAnonymous] = useState(false);

const loadComments = async () => {
  try {
    setLoading(true);
    const response = await getCourseComments(courseId, page);
    setComments(response.data);
    setPagination(response.pagination);
  } catch (error) {
    console.error('Error loading comments:', error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (courseId) loadComments();
}, [courseId, page]);

const handleSubmit = async () => {
  if (!newComment.trim() || !rating || !currentUserId) return;

  try {
    setSubmitting(true);
    const response = await createCourseComment({
      userId: currentUserId,
      courseId,
      comment: newComment,
      calification: rating,
      isAnonymous
    });

    if (response.success) {
      setNewComment('');
      setRating(0);
      setIsAnonymous(false);
      setPage(1);
      loadComments();
    } else {
      alert('Error: ' + response.message);
    }
  } catch (error) {
    alert('Error de conexión');
  } finally {
    setSubmitting(false);
  }
};

const handleDelete = async (commentId: string) => {
  if (!confirm('¿Eliminar comentario?')) return;

  try {
    const response = await deleteCourseComment(commentId);
    if (response.success) {
      loadComments();
    } else {
      alert('Error: ' + response.message);
    }
  } catch (error) {
    alert('Error de conexión');
  }
};

const formatDate = (date: string) => new Date(date).toLocaleDateString('es-ES');

if (!currentUserId) {
  return (
    <div className="text-center py-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
      <p className="text-yellow-800">Debes estar logueado para ver comentarios</p>
    </div>
  );
}

return (
  <div className="mb-6">
    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Comentarios ({pagination?.totalCount || 0})</h2>
      {pagination?.totalPages > 1 && (
        <span className="text-sm text-gray-600">
          Página {pagination.currentPage} de {pagination.totalPages}
        </span>
      )}
    </div>

    {/* Comments List */}
    <div className="space-y-4 mb-6">
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center">
                {comment.isAnonymous ? (
                  <EyeOff className="w-5 h-5 text-gray-500" />
                ) : comment.user?.urlPhoto ? (
                  <img src={comment.user.urlPhoto} alt="" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-lg font-bold text-purple-500">
                    {comment.user?.name?.charAt(0) || 'U'}
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-bold">
                    {comment.isAnonymous ? 'Anónimo' : `@${comment.user?.nickname || 'Usuario'}`}
                  </h4>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{formatDate(comment.date)}</span>
                  {comment.isAnonymous && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Anónimo</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${star <= (comment.calification || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({comment.calification || 0}/5)</span>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{comment.comment}</p>
                
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">0</span>
                  </button>
                </div>
              </div>
              
              {comment.userId === currentUserId && (
                <button 
                  onClick={() => handleDelete(comment.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000]">
          <p className="text-gray-600">No hay comentarios aún</p>
        </div>
      )}
    </div>

    {/* Pagination */}
    {pagination?.totalPages > 1 && (
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setPage(page - 1)}
          disabled={!pagination.hasPrevPage}
          className={`flex items-center px-4 py-2 border-2 border-black rounded-lg font-medium text-sm ${
            pagination.hasPrevPage 
              ? 'bg-white text-black shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </button>
        
        <span className="text-sm text-gray-600">{page} / {pagination.totalPages}</span>
        
        <button 
          onClick={() => setPage(page + 1)}
          disabled={!pagination.hasNextPage}
          className={`flex items-center px-4 py-2 border-2 border-black rounded-lg font-medium text-sm ${
            pagination.hasNextPage 
              ? 'bg-black text-white shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Siguiente
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    )}

    {/* Comment Form */}
    <div className="bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] p-4">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-black flex items-center justify-center overflow-hidden">
          {isAnonymous ? (
            <EyeOff className="w-5 h-5 text-gray-500" />
          ) : currentUserPhoto ? (
            <img 
              src={currentUserPhoto} 
              alt="Tu foto" 
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-purple-500">
              {currentUserNickname?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Agregar comentario</h3>
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg border-2 border-black text-sm transition-colors ${
                isAnonymous 
                  ? 'bg-gray-800 text-white' 
                  : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              {isAnonymous ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isAnonymous ? 'Anónimo' : 'Público'}</span>
            </button>
          </div>

          {isAnonymous && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
              <p className="text-xs text-gray-600">
                📝 Tu comentario será publicado de forma anónima. Tu identidad no será visible para otros usuarios.
              </p>
            </div>
          )}
          
          <div className="flex items-center space-x-1 mb-3">
            <span className="text-sm text-gray-600 mr-2">Calificación:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="w-5 h-5 fill-current" />
              </button>
            ))}
            {rating > 0 && <span className="text-sm text-gray-500 ml-2">({rating}/5)</span>}
          </div>
          
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isAnonymous ? "Escribe tu opinión anónima..." : "Escribe tu opinión..."}
            className="w-full p-3 border-2 border-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
            rows={3}
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim() || !rating || submitting}
              className="px-6 py-2 bg-black text-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] font-medium text-sm disabled:opacity-50"
            >
              {submitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2 inline" />
                  Enviar {isAnonymous ? 'Anónimo' : ''}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default CourseCommentsSection;