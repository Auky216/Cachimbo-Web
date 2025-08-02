"use client";

import FixedButton2 from './Button2';

interface YearStepProps {
  selectedYear: number;
  onYearSelect: (year: number) => void;
  userName?: string;
}

export default function YearStep({ 
  selectedYear, 
  onYearSelect, 
  userName = "Adrian Auqui" 
}: YearStepProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  return (
    <div className="bg-white">
      {/* Mobile */}
      <div className="md:hidden px-6 py-6">
        <h1 className="text-2xl font-bold mb-2">¡Hola {userName}! 👋</h1>
        <p className="text-gray-600 mb-8">¿En qué año iniciaste?</p>
        
        <div className="grid grid-cols-3 gap-3">
          {years.map(year => (
            <FixedButton2
              key={year}
              text={year.toString()}
              selected={selectedYear === year}
              selectedColor="#8b5cf6"
              onClick={() => onYearSelect(year)}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-12 items-start min-h-[60vh]">
          <div>
            <h1 className="text-4xl font-bold mb-4">¡Hola {userName}! 👋</h1>
            <p className="text-xl text-gray-600 mb-6">¿En qué año iniciaste?</p>
            <p className="text-gray-500 mb-4">Selecciona el año en que comenzaste tus estudios universitarios.</p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-blue-700 text-sm">💡 Esto nos ayuda a conectarte con estudiantes de tu misma generación.</p>
            </div>
          </div>
          <div className="border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Selecciona tu año:</h3>
            <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {years.map(year => (
                <FixedButton2
                  key={year}
                  text={year.toString()}
                  selected={selectedYear === year}
                  selectedColor="#8b5cf6"
                  onClick={() => onYearSelect(year)}
                  className="text-sm"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}