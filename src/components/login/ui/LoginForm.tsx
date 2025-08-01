"use client";

import Button1 from "./Button1";
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  onGoogleLogin?: () => void;
  buttonText?: string;
  showTerms?: boolean;
  termsText?: string;
  privacyText?: string;
  className?: string;
}

export default function LoginForm({ 
  onGoogleLogin,
  buttonText = "Continuar con Google",
  showTerms = true,
  termsText = "Términos de Servicio",
  privacyText = "Política de Privacidad",
  className = ""
}: LoginFormProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <Button1 
        icon={<FcGoogle />} 
        text={buttonText}
        onClick={onGoogleLogin}
        className="w-full text-base sm:text-lg font-semibold py-4"
      />
      
      {/* Texto explicativo */}
      {showTerms && (
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Al continuar, aceptas nuestros{" "}
          <a href="#" className="text-purple-600 hover:underline font-medium">
            {termsText}
          </a>{" "}
          y{" "}
          <a href="#" className="text-purple-600 hover:underline font-medium">
            {privacyText}
          </a>
        </p>
      )}
    </div>
  );
}