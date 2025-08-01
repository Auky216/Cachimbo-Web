import React, { useState } from 'react';
import { BrutalButton } from './brutal-button';
import { BrutalInput } from './brutal-input';
import { ProgressBar } from './progress-bar';
import { BackButton } from './back-button';

interface NicknameStepProps {
  onNext: (nickname: string) => void;
  onBack: () => void;
  userName: string;
}

export const NicknameStep: React.FC<NicknameStepProps> = ({ onNext, onBack, userName }) => {
  const [nickname, setNickname] = useState<string>('');

  const handleNext = () => {
    if (nickname.trim()) {
      onNext(nickname.trim());
    }
  };

  const isValid = nickname.trim().length > 0 && nickname.length <= 20;

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <ProgressBar currentStep={4} totalSteps={5} />
      
      {/* Back Button */}
      <BackButton onBack={onBack} />
      
      <div className="flex-1 flex items-start justify-center p-6 pt-16 md:pt-24">

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black mb-2">
              ¡Hola {userName}! 👋
            </h1>
            <p className="text-gray-600 font-bold">Elige tu apodo</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded font-black text-sm">
                @
              </div>
              <BrutalInput
                placeholder="Escribe tu nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="pl-12"
                disabled={false}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500 font-bold">
              <p>El nickname es el nombre de usuario que todos verán en la aplicación</p>
              <p className="mt-1">{nickname.length}/20 caracteres</p>
            </div>
          </div>

          <BrutalButton
            onClick={handleNext}
            disabled={!isValid}
            variant={isValid ? 'primary' : 'secondary'}
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