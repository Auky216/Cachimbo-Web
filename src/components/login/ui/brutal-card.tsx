import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BrutalCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'purple' | 'white';
  padding?: 'sm' | 'md' | 'lg';
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
 children,
 className,
 variant = 'default',
 padding = 'md'
}) => {
 const variants = {
   default: "bg-white",
   purple: "bg-purple-100",
   white: "bg-white"
 };

 const paddings = {
   sm: "p-4",
   md: "p-6",
   lg: "p-8"
 };

 return (
   <div className={cn(variants[variant], paddings[padding], className)}>
     {children}
   </div>
 );
};