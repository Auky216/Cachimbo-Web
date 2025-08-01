"use client";
import React, { useState } from "react";
import { BrutalLogo } from "@/components/login/ui/brutal-logo";
import { BrutalCard } from "@/components/login/ui/brutal-card";
import { GoogleLoginButton } from "@/components/login/ui/google-login-button";
import { LoadingOverlay } from "@/components/login/ui/loading-overlay";
import { redirectToGoogleLogin } from "@/lib/api/login.api";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    redirectToGoogleLogin(); // Redirige al backend para login con Google
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <BrutalCard className="text-center" padding="lg">
          <div className="mb-4 md:mb-6">
            <BrutalLogo size="xl" className="justify-center" showText={false} />
          </div>

          <div className="mb-8 md:mb-10">
            <h1 className="text-2xl md:text-3xl font-black mb-3">¡BIENVENIDO!</h1>
            <p className="font-bold text-gray-600 text-sm md:text-base">
              Conecta con tu comunidad universitaria
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <GoogleLoginButton onLogin={handleGoogleLogin} loading={loading} />
          </div>

          <div className="text-xs md:text-sm font-bold text-gray-500 leading-relaxed">
            Al continuar, aceptas nuestros{" "}
            <button className="text-purple-500 underline hover:text-purple-600 transition-colors">
              Términos de Servicio
            </button>{" "}
            y{" "}
            <button className="text-purple-500 underline hover:text-purple-600 transition-colors">
              Política de Privacidad
            </button>
          </div>
        </BrutalCard>

        <div className="text-center mt-6">
          <p className="text-sm md:text-base font-bold text-gray-600">
            ¿Primera vez aquí?{" "}
            <button className="text-purple-500 font-black hover:text-purple-600 transition-colors">
              ¡Regístrate gratis!
            </button>
          </p>
        </div>
      </div>

      {loading && <LoadingOverlay isVisible={loading} message="Conectando..." />}
    </div>
  );
}
