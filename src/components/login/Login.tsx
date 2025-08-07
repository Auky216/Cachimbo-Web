"use client";

import LoginContainer from "./ui/LoginContainer";
import LogoHeader from "./ui/LogoHeader";
import LoginForm from "./ui/LoginForm";
import {redirectToGoogleLogin} from "@/lib/api/login.api";


export default function Login() {
  const handleGoogleLogin = () => {
    console.log("Iniciando sesión con Google...");
    redirectToGoogleLogin();
  };

  return (
    <LoginContainer>
      <LogoHeader />
      
      <LoginForm 
        onGoogleLogin={handleGoogleLogin}
        buttonText="Continuar con Google"
      />
      
      
    </LoginContainer>
  );
}