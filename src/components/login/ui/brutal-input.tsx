import React from 'react';
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BrutalInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const BrutalInput: React.FC<BrutalInputProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  className,
  disabled = false
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          {icon}
        </div>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          "border-4 border-black font-bold text-lg py-6 shadow-[4px_4px_0px_0px_#000] focus:shadow-[2px_2px_0px_0px_#000] focus:translate-x-1 focus:translate-y-1 transition-all duration-200",
          icon ? "pl-12" : "pl-4",
          disabled && "bg-gray-100 text-gray-500 cursor-not-allowed",
          className
        )}
      />
    </div>
  );
};
