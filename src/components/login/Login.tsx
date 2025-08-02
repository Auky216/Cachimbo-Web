"use client";

import LoginContainer from "./ui/LoginContainer";
import LogoHeader from "./ui/LogoHeader";
import LoginForm from "./ui/LoginForm";
import Divider from "./ui/Divider";
import ExploreButtons from "./ui/ExploreButtons";
import {redirectToGoogleLogin} from "@/lib/api/login.api";


export default function Login() {
  const handleGoogleLogin = () => {
    console.log("Iniciando sesión con Google...");
    redirectToGoogleLogin();
    // Aquí iría tu lógica de autenticación
  };

  const handleViewCommunities = () => {
    console.log("Ver comunidades");
    // Navegar a página de comunidades
  };

  const handleFAQ = () => {
    console.log("Preguntas frecuentes");
    // Navegar a FAQ
  };

  const exploreButtons = [
    {
      text: "Ver comunidades",
      onClick: handleViewCommunities,
      colorClass: "text-purple-600 hover:text-purple-800",
      hoverColorClass: "hover:bg-purple-50",
      borderHoverClass: "hover:border-purple-200"
    },
    {
      text: "Preguntas frecuentes",
      onClick: handleFAQ,
      colorClass: "text-blue-600 hover:text-blue-800",
      hoverColorClass: "hover:bg-blue-50",
      borderHoverClass: "hover:border-blue-200"
    }
  ];

  return (
    <LoginContainer>
      <LogoHeader />
      
      <LoginForm 
        onGoogleLogin={handleGoogleLogin}
        buttonText="Continuar con Google"
      />
      
      <Divider text="O EXPLORA" />
      
      <ExploreButtons buttons={exploreButtons} />
    </LoginContainer>
  );
}