import React from 'react';
import { BrutalButton } from './brutal-button';
import { ProgressBar } from './progress-bar';
import { BackButton } from './back-button';

interface WelcomeStepProps {
  onFinish: () => void;
  onBack: () => void;
  nickname: string;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onFinish, onBack, nickname }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <ProgressBar currentStep={5} totalSteps={5} />
      
      {/* Back Button */}
      <BackButton onBack={onBack} />
      
      <div className="flex-1 flex items-start justify-center p-6 pt-16 md:pt-24">

        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              ¡Bienvenido!
            </h1>
          </div>

          {/* Profile Card */}
          <div className="mb-8">
            <div className="bg-purple-500 rounded-t-2xl p-4 border-4 border-black border-b-0">
              <div className="bg-black h-8 rounded-t-xl"></div>
            </div>
            
            <div className="bg-white border-4 border-black border-t-0 rounded-b-2xl p-6 shadow-[6px_6px_0px_0px_#000]">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-purple-200 rounded-full border-4 border-black flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h2 className="text-xl font-black">@{nickname}</h2>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 border-2 border-black">
                    <div className="text-xs font-bold text-gray-600">UTEC</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 border-2 border-black">
                    <div className="text-xs font-bold text-gray-600">Pregrado</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 border-2 border-black">
                    <div className="text-xs font-bold text-gray-600">Ciencias de la Computación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BrutalButton
            onClick={onFinish}
            variant="primary"
            className="w-full"
            size="lg"
          >
            Finalizar Registro
          </BrutalButton>
        </div>
      </div>
    </div>
  );
};