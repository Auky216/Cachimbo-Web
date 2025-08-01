import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { BrutalButton } from "./brutal-button";
import { BrutalInput } from "./brutal-input";
import { ProgressBar } from "./progress-bar";
import { BackButton } from "./back-button";

interface CareerStepProps {
  onNext: (career: string) => void;
  onBack: () => void;
  userName: string;
}

export const CareerStep: React.FC<CareerStepProps> = ({
  onNext,
  onBack,
  userName,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const careers = [
    "Ciencias de la Computación",
    "Ingeniería Industrial",
    "Ingeniería Ambiental",
    "Ingeniería Civil",
    "Ingeniería de Sistemas",
    "Medicina",
    "Derecho",
    "Administración",
    "Contabilidad",
    "Psicología",
    "Arquitectura",
    "Economía",
  ];

  const filteredCareers = useMemo(() => {
    if (!searchQuery) return careers;
    return careers.filter((career) =>
      career.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleNext = () => {
    if (selectedCareer) {
      onNext(selectedCareer);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      <ProgressBar currentStep={3} totalSteps={5} />

      {/* Back Button */}
      <BackButton onBack={onBack} />

      <div className="flex-1 flex items-start justify-center p-6 pt-16 md:pt-24">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-black mb-2">
              ¡Hola {userName}! 👋
            </h1>
            <p className="text-gray-600 font-bold">
              ¿Que carrera estas estudiando?
            </p>
          </div>

          <div className="mb-6">
            <BrutalInput
              placeholder="Buscar Carrera"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-500" />}
            />
          </div>

          <div className="space-y-3 mb-8 max-h-64 overflow-y-auto">
            {filteredCareers.map((career) => (
              <button
                key={career}
                onClick={() => setSelectedCareer(career)}
                className={`w-full p-4 rounded-2xl border-4 border-black font-bold text-left flex items-center gap-3 transition-all ${
                  selectedCareer === career
                    ? "bg-purple-500 text-white shadow-[4px_4px_0px_0px_#000]"
                    : "bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000]"
                }`}
              >
                <span className="text-xl">🎯</span>
                {career}
              </button>
            ))}
          </div>

          <BrutalButton
            onClick={handleNext}
            disabled={!selectedCareer}
            variant={selectedCareer ? "primary" : "secondary"}
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
