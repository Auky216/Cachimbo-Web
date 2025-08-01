import React, { useState } from 'react';
import { BrutalButton } from './brutal-button';
import { ProgressBar } from './progress-bar';
import { BackButton } from './back-button';

interface AcademicLevelStepProps {
  onNext: (level: string) => void;
  userName: string;
}

interface YearStepProps {
  onNext: (year: number) => void;
  onBack: () => void;
  userName: string;
}

export const AcademicLevelStep: React.FC<AcademicLevelStepProps> = ({ onNext, userName }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const academicLevels = [
    { id: 'pregrado', label: 'Pregrado', icon: '🎓', color: 'bg-purple-500' },
    { id: 'egresado', label: 'Egresado', icon: '👨‍🎓', color: 'bg-blue-500' },
    { id: 'postgrado', label: 'Postgrado', icon: '📚', color: 'bg-red-500' }
  ];

  const handleNext = () => {
    if (selectedLevel) {
      onNext(selectedLevel);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={1} totalSteps={5} />
      
      {/* Contenedor centrado con ancho máximo */}
      <div className="flex-1 flex items-start justify-center p-6 pt-16 md:pt-24">
        <div className="w-full max-w-md">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black mb-2">
              ¡Hola {userName}! 👋
            </h1>
            <p className="text-gray-600 font-bold">¿En que etapa te encuentras?</p>
          </div>

          {/* Academic Level Options */}
          <div className="space-y-4 mb-8">
            {academicLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`w-full p-4 rounded-2xl border-4 border-black font-black text-lg flex items-center gap-3 transition-all ${
                  selectedLevel === level.id
                    ? `${level.color} text-white shadow-[4px_4px_0px_0px_#000]`
                    : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000]'
                }`}
              >
                <span className="text-2xl">{level.icon}</span>
                {level.label}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <BrutalButton
            onClick={handleNext}
            disabled={!selectedLevel}
            variant={selectedLevel ? 'primary' : 'secondary'}
            className="w-full"
            size="lg"
          >
            Siguiente
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};