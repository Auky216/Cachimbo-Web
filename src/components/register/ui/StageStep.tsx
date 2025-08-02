"use client";

import FixedButton2 from './Button2';

interface StageStepProps {
  selectedStage: string;
  onStageSelect: (stage: string) => void;
  userName?: string;
}

const stages = [
  { id: 'pregrado', text: 'Pregrado', icon: '🎓', color: '#8b5cf6' },
  { id: 'egresado', text: 'Egresado', icon: '👨‍🎓', color: '#64748b' },
  { id: 'postgrado', text: 'Postgrado', icon: '📚', color: '#ef4444' }
];

export default function StageStep({ 
  selectedStage, 
  onStageSelect, 
  userName = "Adrian Auqui" 
}: StageStepProps) {
  return (
    <div className="bg-white">
      {/* Mobile */}
      <div className="md:hidden px-6 py-6">
        <h1 className="text-2xl font-bold mb-2">¡Hola {userName}! 👋</h1>
        <p className="text-gray-600 mb-8">¿En qué etapa te encuentras?</p>
        
        <div className="space-y-4">
          {stages.map(stage => (
            <FixedButton2
              key={stage.id}
              icon={stage.icon}
              text={stage.text}
              selected={selectedStage === stage.id}
              selectedColor={stage.color}
              onClick={() => onStageSelect(stage.id)}
            />
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-12 items-center min-h-[60vh]">
          <div>
            <h1 className="text-4xl font-bold mb-4">¡Hola {userName}! 👋</h1>
            <p className="text-xl text-gray-600 mb-6">¿En qué etapa te encuentras?</p>
            <p className="text-gray-500">Selecciona tu nivel académico actual para personalizar tu experiencia en Cachimbo.</p>
          </div>
          <div className="space-y-4">
            {stages.map(stage => (
              <FixedButton2
                key={stage.id}
                icon={stage.icon}
                text={stage.text}
                selected={selectedStage === stage.id}
                selectedColor={stage.color}
                onClick={() => onStageSelect(stage.id)}
                className="text-lg py-6"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}