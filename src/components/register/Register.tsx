
"use client";

import { useState } from 'react';
import ProgressHeader from './ui/ProgressHeader';
import StageStep from './ui/StageStep';
import YearStep from './ui/YearStep';
import CareerStep from './ui/CareerStep';
import NicknameStep from './ui/NicknameStep';
import WelcomeStep from './ui/WelcomeStep';
import Button1 from './ui/Button1';

export default function FinalRegister() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ 
    stage: '', 
    year: 0, 
    career: '', 
    nickname: '' 
  });

  const userName = "Adrian Auqui";
  const totalSteps = 5;

  const isValid = () => {
    switch(step) {
      case 1: return data.stage !== '';
      case 2: return data.year !== 0;
      case 3: return data.career !== '';
      case 4: return data.nickname.length >= 3;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      console.log('Finalizar registro:', data);
      // Aquí llamarías a tu API
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <StageStep
            selectedStage={data.stage}
            onStageSelect={(stage) => setData({...data, stage})}
            userName={userName}
          />
        );
      case 2:
        return (
          <YearStep
            selectedYear={data.year}
            onYearSelect={(year) => setData({...data, year})}
            userName={userName}
          />
        );
      case 3:
        return (
          <CareerStep
            selectedCareer={data.career}
            onCareerSelect={(career) => setData({...data, career})}
            userName={userName}
          />
        );
      case 4:
        return (
          <NicknameStep
            nickname={data.nickname}
            onNicknameChange={(nickname) => setData({...data, nickname})}
            userName={userName}
          />
        );
      case 5:
        return (
          <WelcomeStep
            nickname={data.nickname}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header con Progress */}
      <ProgressHeader
        step={step}
        totalSteps={totalSteps}
        onBack={() => setStep(step - 1)}
        showBackButton={step > 1}
      />
      
      {/* Content Area - Flex grow para ocupar espacio disponible */}
      <div className="flex-1 overflow-y-auto">
        {renderStep()}
      </div>

      {/* Footer fijo - Siempre visible */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex justify-end">
          <Button1
            text={step === totalSteps ? "Finalizar Registro" : "Siguiente"}
            onClick={handleNext}
            disabled={!isValid()}
            backgroundColor={isValid() ? '#8b5cf6' : '#d1d5db'}
            textColor={isValid() ? '#ffffff' : '#6b7280'}
            shadowColor={isValid() ? '#7c3aed' : '#9ca3af'}
            className="px-8"
          />
        </div>
      </div>
    </div>
  );
}