"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FixedButton2Props {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
  selected?: boolean;
  selectedColor?: string;
  className?: string;
}

export default function FixedButton2({ 
  icon, 
  text, 
  onClick, 
  selected = false, 
  selectedColor = '#8b5cf6',
  className
}: FixedButton2Props) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        // Estilos base neobrutalism igual a Button1
        'relative border-2 font-semibold transition-all duration-150 ease-in-out w-full',
        'active:translate-x-1 active:translate-y-1 active:shadow-none',
        'hover:translate-x-[-1px] hover:translate-y-[-1px]',
        'focus:outline-none focus:ring-0',
        // Responsive padding y tamaños
        'px-4 py-2 sm:px-6 sm:py-3',
        'text-sm sm:text-base',
        'min-h-[44px] sm:min-h-[48px]',
        // Bordes redondeados como en la imagen
        'rounded-xl',
        className
      )}
      style={{
        backgroundColor: selected ? selectedColor : '#ffffff',
        color: selected ? '#ffffff' : '#000000',
        borderColor: '#000000', // Siempre negro
        boxShadow: '4px 4px 0px #000000', // Siempre sombra negra
      }}
    >
      <div className="flex items-center justify-start gap-2 sm:gap-3 w-full">
        {icon && (
          <span className="flex-shrink-0 text-lg sm:text-xl">
            {icon}
          </span>
        )}
        <span className="font-medium">
          {text}
        </span>
      </div>
    </Button>
  );
}