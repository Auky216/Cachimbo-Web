import React from 'react';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import CachimboLogo from '@/assets/cachimbo-logo.png';
interface BrutalLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const BrutalLogo: React.FC<BrutalLogoProps> = ({
 size = 'md',
 showText = true,
 className
}) => {
 const sizes = {
   sm: { logo: "w-16 h-16", text: "text-lg" },
   md: { logo: "w-20 h-20", text: "text-2xl" },
   lg: { logo: "w-28 h-28", text: "text-3xl" },
   xl: { logo: "w-40 h-40", text: "text-4xl" }
 };

 return (
   <div className={cn("flex flex-col items-center", className)}>
     {/* Logo Image */}
     <div className={cn("relative", sizes[size].logo)}>
       <Image
         src={CachimboLogo}
         alt="CACHIMBO Logo"
         fill
         className="object-contain"
         priority
       />
     </div>
   </div>
 );
};