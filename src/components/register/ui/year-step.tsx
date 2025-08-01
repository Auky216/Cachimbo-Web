// components/register/year-step.tsx
import React, { useState } from 'react';
import { BrutalButton } from './brutal-button';
import { ProgressBar } from './progress-bar';
import { BackButton } from './back-button';

interface YearStepProps {
  onNext: (year: number) => void;
  onBack: () => void; // 👈 Agregar esta línea
  userName: string;
}

export const YearStep: React.FC<YearStepProps> = ({ onNext, onBack, userName }) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = Array.from({ length: 15 }, (_, i) => 2024 - i);

  const handleNext = () => {
    if (selectedYear) {
      onNext(selectedYear);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <ProgressBar currentStep={2} totalSteps={5} />
      
      {/* Back Button */}
      <BackButton onBack={onBack} />
      
      {/* Layout mejorado para desktop */}
      <div className="flex-1 flex items-start justify-center p-6 pt-16 md:pt-24">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black mb-2">
              ¡Hola {userName}! 👋
            </h1>
            <p className="text-gray-600 font-bold">¿En que año iniciaste?</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-8 max-h-64 overflow-y-auto">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`p-3 rounded-xl border-4 border-black font-black text-sm transition-all ${
                  selectedYear === year
                    ? 'bg-purple-500 text-white shadow-[3px_3px_0px_0px_#000]'
                    : 'bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          <BrutalButton
            onClick={handleNext}
            disabled={!selectedYear}
            variant={selectedYear ? 'primary' : 'secondary'}
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