// components/ui/back-button.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button
      onClick={onBack}
      className="absolute top-4 left-4 p-2 rounded-xl border-2 border-black bg-white hover:bg-gray-100 transition-all shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] active:translate-x-1 active:translate-y-1"
    >
      <ArrowLeft className="w-5 h-5 text-black" />
    </button>
  );
};