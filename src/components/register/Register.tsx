"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUserStore } from '@/store/user.store';
import { getRegistrationData, completeRegistration } from '@/lib/api/login.api';
import ProgressHeader from './ui/ProgressHeader';
import StageStep from './ui/StageStep';
import YearStep from './ui/YearStep';
import CareerStep from './ui/CareerStep';
import NicknameStep from './ui/NicknameStep';
import WelcomeStep from './ui/WelcomeStep';
import Button1 from './ui/Button1';

export default function FinalRegister() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ 
    stage: '', 
    year: 0, 
    career: '', 
    nickname: '',
  });
  const [userName, setUserName] = useState("Usuario");
  const [googleData, setGoogleData] = useState<any>(null);
  
  // Stores
  const { setAuthenticated, setName, setLastName, setEmail, setUrlPhoto, urlPhoto } = useAuthStore();
  const { setUser } = useUserStore();

  // Obtener datos de Google al cargar el componente
  useEffect(() => {
    const fetchGoogleData = async () => {
      try {
        const response = await getRegistrationData();
        console.log('Datos de Google:', response);
        
        if (response && !response.error) {
          setUserName(`${response.name} ${response.lastname}`);
          setGoogleData(response);
          // Guardar en el store
          setName(response.name);
          setLastName(response.lastname);
          setEmail(response.email);
          setUrlPhoto(response.urlPhoto);
        } else {
          // Si no hay datos de registro, redirigir al login
          console.error('No hay datos de registro disponibles');
          router.push('/');
        }
      } catch (error) {
        console.error('Error al obtener datos de Google:', error);
        router.push('/');
      }
    };

    fetchGoogleData();
  }, [setName, setLastName, setEmail, setUrlPhoto, router]);

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

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Finalizar registro
      await handleCompleteRegistration();
    }
  };

  const handleCompleteRegistration = async () => {
    if (!googleData) {
      console.error('No hay datos de Google disponibles');
      return;
    }

    setIsLoading(true);
    
    try {
      const registrationData = {
        email: googleData.email,
        name: googleData.name,
        lastname: googleData.lastname,
        urlPhoto: googleData.urlPhoto,
        nickname: data.nickname,
        stage: data.stage,
        startYear: data.year,
        career: data.career,
      };

      console.log('Enviando datos de registro:', registrationData);
      
      const response = await completeRegistration(registrationData);
      
      if (response.tokens) {
        // Guardar tokens en localStorage
        localStorage.setItem('access_token', response.tokens.access_token);
        localStorage.setItem('refresh_token', response.tokens.refresh_token);
        
        // Actualizar stores
        setAuthenticated(true);
        setUser({
          id: response.user.id,
          stage: data.stage,
          startYear: data.year,
          career: data.career,
          nickname: data.nickname,
          email: response.user.email,
          name: response.user.name,
          lastName: response.user.lastname,
          isActive: true,
          urlPhoto: googleData.urlPhoto || '',
        });

        console.log('Registro completado exitosamente');
        
        // Redirigir al dashboard
        router.push('/dashboard');
      } else {
        console.error('No se recibieron tokens en la respuesta');
      }
    } catch (error) {
      console.error('Error al completar el registro:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setIsLoading(false);
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
            userPhoto={urlPhoto}
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
            text={
              isLoading 
                ? "Procesando..." 
                : step === totalSteps 
                  ? "Finalizar Registro" 
                  : "Siguiente"
            }
            onClick={handleNext}
            disabled={!isValid() || isLoading}
            backgroundColor={isValid() && !isLoading ? '#8b5cf6' : '#d1d5db'}
            textColor={isValid() && !isLoading ? '#ffffff' : '#6b7280'}
            shadowColor={isValid() && !isLoading ? '#7c3aed' : '#9ca3af'}
            className="px-8"
          />
        </div>
      </div>
    </div>
  );
}