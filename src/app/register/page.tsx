'use client';

import React, { useState } from 'react';
import { AcademicLevelStep } from '@/components/register/ui/academic-level-step'; 
import { YearStep } from '@/components/register/ui/year-step';
import { CareerStep } from '@/components/register/ui/career-step';
import { NicknameStep } from '@/components/register/ui/nickname-step';
import { WelcomeStep } from '@/components/register/ui/welcome-step';

interface RegisterData {
  academicLevel: string;
  year: number;
  career: string;
  nickname: string;
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registerData, setRegisterData] = useState<Partial<RegisterData>>({});
  
  // Este nombre vendría del usuario logueado
  const userName = "Adrian Auqui";

  const handleAcademicLevel = (level: string) => {
    setRegisterData(prev => ({ ...prev, academicLevel: level }));
    setCurrentStep(2);
  };

  const handleYear = (year: number) => {
    setRegisterData(prev => ({ ...prev, year }));
    setCurrentStep(3);
  };

  const handleCareer = (career: string) => {
    setRegisterData(prev => ({ ...prev, career }));
    setCurrentStep(4);
  };

  const handleNickname = (nickname: string) => {
    setRegisterData(prev => ({ ...prev, nickname }));
    setCurrentStep(5);
  };

  // Función genérica para retroceder
  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleFinish = async () => {
    try {
      // Aquí llamarías a tu API para completar el registro
      console.log('Registro completo:', registerData);
      
      // Navegar a la app principal
      // router.push('/(tabs)');
    } catch (error) {
      console.error('Error completando registro:', error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AcademicLevelStep onNext={handleAcademicLevel} userName={userName} />;
      case 2:
        return <YearStep onNext={handleYear} onBack={handleBack} userName={userName} />;
      case 3:
        return <CareerStep onNext={handleCareer} onBack={handleBack} userName={userName} />;
      case 4:
        return <NicknameStep onNext={handleNickname} onBack={handleBack} userName={userName} />;
      case 5:
        return <WelcomeStep onFinish={handleFinish} onBack={handleBack} nickname={registerData.nickname || ''} />;
      default:
        return <AcademicLevelStep onNext={handleAcademicLevel} userName={userName} />;
    }
  };

  return <>{renderStep()}</>;
}