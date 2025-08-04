import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DynamicButtonProps {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  shadowColor?: string;
}

const Button1: React.FC<DynamicButtonProps> = ({
  icon,
  text,
  onClick,
  className,
  variant = 'default',
  size = 'default',
  disabled = false,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  borderColor = '#000000',
  shadowColor = '#000000'
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={cn(
        // Estilos base neobrutalism
        'relative border-2 font-semibold transition-all duration-150 ease-in-out',
        'active:translate-x-1 active:translate-y-1 active:shadow-none',
        'hover:translate-x-[-1px] hover:translate-y-[-1px]',
        'focus:outline-none focus:ring-0',
        // Responsive padding y tamaños
        'px-4 py-2 sm:px-6 sm:py-3',
        'text-sm sm:text-base',
        'min-h-[44px] sm:min-h-[48px]', // Mínimo para touch targets
        // Estados
        disabled && 'opacity-50 cursor-not-allowed active:transform-none hover:transform-none',
        className
      )}
      style={{
        backgroundColor: disabled ? '#d1d5db' : backgroundColor,
        color: disabled ? '#6b7280' : textColor,
        borderColor: disabled ? '#9ca3af' : borderColor,
        boxShadow: disabled ? 'none' : `4px 4px 0px ${shadowColor}`,
      }}
    >
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
        {icon && (
          <span className="flex-shrink-0 text-lg sm:text-xl">
            {icon}
          </span>
        )}
        <span className="font-medium truncate">
          {text}
        </span>
      </div>
    </Button>
  );
};

export default Button1;