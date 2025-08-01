import React from 'react';
import { BrutalCard } from './brutal-card';

interface LoadingOverlayProps {
 isVisible: boolean;
 message?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
 isVisible,
 message = "Cargando..."
}) => {
 if (!isVisible) return null;

 return (
   <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
     <BrutalCard className="text-center max-w-xs w-full">
       <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
       <p className="font-black text-lg">{message}</p>
     </BrutalCard>
   </div>
 );
};