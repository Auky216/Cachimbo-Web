"use client";

import { ArrowLeft } from "lucide-react";

interface ProgressHeaderProps {
  step: number;
  totalSteps: number;
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function ProgressHeader({ 
  step, 
  totalSteps, 
  onBack, 
  showBackButton = true
}: ProgressHeaderProps) {
  const progressPercent = (step / totalSteps) * 100;

  return (
    <div className="bg-white">
      {/* Mobile */}
      <div className="md:hidden px-4 py-4">
        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          {showBackButton && onBack ? (
            <button onClick={onBack} className="p-1">
              <ArrowLeft size={24} />
            </button>
          ) : <div />}
          <span className="text-sm text-gray-600">{step}/{totalSteps}</span>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block px-6 py-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {showBackButton && onBack ? (
              <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-black">
                <ArrowLeft size={20} />
                Atrás
              </button>
            ) : <div />}
            <span className="text-sm text-gray-600">{step}/{totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}