"use client";

import { useState } from 'react';
import { Search } from 'lucide-react';
import FixedButton2 from './Button2';

interface CareerStepProps {
  selectedCareer: string;
  onCareerSelect: (career: string) => void;
  userName?: string;
}

const careers = [
  'Ciencias de la Computación', 'Ingeniería Industrial', 'Ingeniería de Sistemas',
  'Ingeniería Civil', 'Ingeniería Ambiental', 'Ingeniería Electrónica',
  'Ingeniería Mecánica', 'Medicina', 'Derecho', 'Psicología'
];

export default function CareerStep({ 
  selectedCareer, 
  onCareerSelect, 
  userName = "Adrian Auqui" 
}: CareerStepProps) {
  const [search, setSearch] = useState('');
  const filteredCareers = careers.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white">
      {/* Mobile */}
      <div className="md:hidden px-6 py-6">
        <h1 className="text-2xl font-bold mb-2">¡Hola {userName}! 👋</h1>
        <p className="text-gray-600 mb-6">¿Qué carrera estás estudiando?</p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            placeholder="Buscar Carrera"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]"
          />
        </div>
        
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {filteredCareers.map(career => (
            <FixedButton2
              key={career}
              icon="🎯"
              text={career}
              selected={selectedCareer === career}
              selectedColor="#8b5cf6"
              onClick={() => onCareerSelect(career)}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-8 min-h-[60vh]">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold mb-4">¡Hola {userName}! 👋</h1>
            <p className="text-xl text-gray-600 mb-6">¿Qué carrera estás estudiando?</p>
            <p className="text-gray-500 mb-6">Selecciona tu carrera para conectarte con estudiantes de tu misma área de estudio.</p>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                placeholder="Buscar tu carrera..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]"
              />
            </div>
          </div>
          
          <div className="col-span-3 border-2 border-black shadow-[4px_4px_0px_0px_#000] p-6 rounded-xl h-96">
            <h3 className="text-lg font-semibold mb-4">Carreras disponibles ({filteredCareers.length})</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {filteredCareers.map(career => (
                <FixedButton2
                  key={career}
                  icon="🎯"
                  text={career}
                  selected={selectedCareer === career}
                  selectedColor="#8b5cf6"
                  onClick={() => onCareerSelect(career)}
                  className="text-sm py-3"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}