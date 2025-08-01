import { ReactNode } from "react";

interface LoginContainerProps {
  children: ReactNode;
  maxWidth?: string;
  padding?: string;
  backgroundColor?: string;
  className?: string;
}

export default function LoginContainer({ 
  children,
  maxWidth = "max-w-md",
  padding = "p-8 sm:p-10",
  backgroundColor = "bg-white",
  className = ""
}: LoginContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col items-center justify-center px-4 py-8">
      <div className={`w-full ${maxWidth} ${backgroundColor} ${padding} ${className}`}>
        {children}
      </div>
    </div>
  );
}