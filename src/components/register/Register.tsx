"use client";

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { getRegistrationData } from '@/lib/api/login.api';
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
    nickname: '',
  });
  const [userName, setUserName] = useState("Usuario");
  
  // Mover el hook al nivel superior
  const { setName, setLastName, setEmail, setUrlPhoto, urlPhoto } = useAuthStore();

  // Obtener datos de Google al cargar el componente
  useEffect(() => {
    const fetchGoogleData = async () => {
      try {
        const googleData = await getRegistrationData();
        console.log('Datos de Google:', googleData);
        if (googleData && !googleData.error) {
          setUserName(`${googleData.name} ${googleData.lastname}`);
          // Guardar en el store
          setName(googleData.name);
          setLastName(googleData.lastname);
          setEmail(googleData.email);
          setUrlPhoto(googleData.urlPhoto);
        }
      } catch (error) {
        console.error('Error al obtener datos de Google:', error);
      }
    };

    fetchGoogleData();
  }, [setName, setLastName, setEmail, setUrlPhoto]);

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
      // Aquí llamarías a tu API para completar el registro
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
            stage={data.stage}
            career={data.career}
            userPhoto={urlPhoto} // Usar la variable extraída arriba
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ProgressHeader
        step={step}
        totalSteps={totalSteps}
        onBack={() => setStep(step - 1)}
        showBackButton={step > 1}
      />
      
      <div className="flex-1 overflow-y-auto">
        {renderStep()}
      </div>

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