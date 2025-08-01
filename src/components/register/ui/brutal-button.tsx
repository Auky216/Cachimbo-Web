import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BrutalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const BrutalButton: React.FC<BrutalButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className
}) => {
  const baseStyles = "font-black border-4 border-black transition-all duration-200 flex items-center justify-center gap-3";
  
  const variants = {
    primary: "bg-purple-500 hover:bg-purple-600 text-white shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-[1px_1px_0px_0px_#000] active:translate-x-1 active:translate-y-1",
    secondary: "bg-white hover:bg-gray-100 text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-[1px_1px_0px_0px_#000] active:translate-x-1 active:translate-y-1",
    outline: "bg-transparent border-purple-500 text-purple-500 hover:bg-purple-50 shadow-[4px_4px_0px_0px_#8b5cf6] hover:shadow-[2px_2px_0px_0px_#8b5cf6]"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const disabledStyles = disabled 
    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-[2px_2px_0px_0px_#9ca3af] hover:shadow-[2px_2px_0px_0px_#9ca3af] hover:bg-gray-300 active:translate-x-0 active:translate-y-0" 
    : variants[variant];

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        disabledStyles,
        sizes[size],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </Button>
  );
};