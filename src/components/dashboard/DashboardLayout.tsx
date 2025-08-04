"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Grid3X3, 
  FileText, 
  Users, 
  Settings,
  ChevronRight
} from 'lucide-react';

import BookIcon from '@/assets/dashboard/book.png';
import CachimboLogo from '@/assets/cachimbo-logo.png';
interface MobileOnlyLayoutProps {
  children: React.ReactNode;
}

const MobileOnlyLayout: React.FC<MobileOnlyLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { id: 'home', icon: Home, label: 'Inicio', route: '/dashboard' },
    { id: 'course', icon: Grid3X3, label: 'Cursos', route: '/dashboard/course' },
    { id: 'materials', icon: FileText, label: 'Materiales', route: '/dashboard/library' },
    { id: 'organizations', icon: Users, label: 'Organizaciones', route: '/dashboard/organizations' },
    { id: 'settings', icon: Settings, label: 'Perfil', route: '/dashboard/perfil' },
  ];

    const courses = [
        { id: 1, name: 'Programación Iasas', icon: BookIcon },
    { id: 2, name: 'Programación II', icon: BookIcon },
    { id: 3, name: 'Cálculo de una Variable', icon: BookIcon },
  ];

  const handleNavClick = (route: string) => {
    console.log(`Navegando a: ${route}`);
    router.push(route);
  };

  const handleCourseClick = (courseId: number) => {
    console.log(`Abriendo curso: ${courseId}`);
    router.push(`/dashboard/courses/${courseId}`);
  };

  // Función para determinar si la ruta está activa
  const isActiveRoute = (route: string) => {
    if (route === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(route);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 p-4 pb-20">
        {/* Header */}
        




      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <img 
            src={CachimboLogo.src} 
            alt="Cachimbo Logo" 
            className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg"
          />
        
        </div>
        <div className="ml-3">
          <h1 className="text-lg sm:text-2xl font-black text-black">
            CACHIMBO
          </h1>
        </div>
      </div>








        {/* Courses Section - Solo mostrar en la página principal */}
        {pathname === '/dashboard' && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-4">Cursos</h2>
            
            <div className="space-y-3">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="w-full flex items-center p-3 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                      <img src={course.icon.src} alt={course.name} className="w-6 h-6 object-contain" />
              


                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-black text-sm">{course.name}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Ver Todos Link */}
            <div className="mt-4 text-right">
              <button 
                onClick={() => router.push('/dashboard/courses')}
                className="text-sm text-gray-600 hover:text-black font-medium"
              >
                Ver Todos
              </button>
            </div>
          </div>
        )}

        {/* Welcome Cards - Solo mostrar en la página principal */}
        {pathname === '/dashboard' && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Bienvenidos Card */}
            <div className="bg-red-500 rounded-lg border-2 border-black shadow-[3px_3px_0_0_#000000] p-4 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="text-sm font-bold mb-1">BIENVENIDOS</h3>
                <h4 className="text-sm font-bold mb-2">CACHIMBOS</h4>
                <div className="bg-white text-black px-2 py-1 rounded border border-black inline-block font-bold text-xs">
                  2025-2
                </div>
              </div>
              <div className="absolute top-2 right-2 text-4xl opacity-20">
                🤖
              </div>
              <div className="absolute bottom-1 right-1 text-lg">
                ➕
              </div>
            </div>

            {/* Programa de Intercambio Card */}
            <div className="bg-orange-500 rounded-lg border-2 border-black shadow-[3px_3px_0_0_#000000] p-4 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-2xl mb-2">🌍</div>
                <h3 className="text-xs font-bold mb-1">PROGRAMA DE</h3>
                <h4 className="text-xs font-bold mb-1">INTERCAMBIO</h4>
                <h4 className="text-xs font-bold mb-2">ESTUDIANTIL</h4>
                <div className="bg-white text-black px-2 py-1 rounded border border-black inline-block font-bold text-xs">
                  2026-1
                </div>
              </div>
              <div className="absolute top-2 right-2 text-4xl opacity-20">
                🌍
              </div>
            </div>
          </div>
        )}

        {/* Children content area (if needed) */}
        <div className="mb-6">
          {children}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2   z-40 max-w-md mx-auto">
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.route);
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.route)}
                className={`
                  flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1
                  transition-all duration-150 ease-in-out
                  ${isActive 
                    ? 'text-purple-500' 
                    : 'text-gray-400 hover:text-gray-600 active:text-purple-400'
                  }
                `}
              >
                <Icon 
                  className={`w-5 h-5 mb-1 ${isActive ? 'fill-current' : ''}`}
                  fill={isActive ? 'currentColor' : 'none'}
                />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileOnlyLayout;