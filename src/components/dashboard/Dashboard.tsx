"use client";

import React from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  Settings,
  FileText,
  User,
  Grid3X3,
  ChevronRight
} from 'lucide-react';

interface ResponsiveDashboardLayoutProps {
  children: React.ReactNode;
}

const ResponsiveDashboardLayout: React.FC<ResponsiveDashboardLayoutProps> = ({ children }) => {
  const navigationItems = [
    { id: 'home', icon: Home, label: 'Inicio', active: true },
    { id: 'courses', icon: BookOpen, label: 'Cursos' },
    { id: 'materials', icon: FileText, label: 'Materiales' },
    { id: 'organizations', icon: Users, label: 'Organizaciones' },
    { id: 'settings', icon: Settings, label: 'Perfil' },
  ];

  const mobileNavigationItems = [
    { id: 'home', icon: Home, label: 'Inicio', active: true },
    { id: 'courses', icon: Grid3X3, label: 'Cursos' },
    { id: 'materials', icon: FileText, label: 'Materiales' },
    { id: 'organizations', icon: Users, label: 'Organizaciones' },
    { id: 'settings', icon: Settings, label: 'Perfil' },
  ];

  const courses = [
    { id: 1, name: 'Programación I', icon: '📁' },
    { id: 2, name: 'Programación II', icon: '📁' },
    { id: 3, name: 'Cálculo de una Variable', icon: '📁' },
  ];

  const handleNavClick = (itemId: string) => {
    console.log(`Navegando a: ${itemId}`);
    
    const routes: { [key: string]: string } = {
      'home': '/dashboard',
      'courses': '/dashboard/courses',
      'materials': '/dashboard/materials',
      'organizations': '/dashboard/organizations',
      'settings': '/dashboard/perfil',
    };

    const route = routes[itemId];
    if (route) {
      window.location.href = route;
    }
  };

  const handleCourseClick = (courseId: number) => {
    console.log(`Abriendo curso: ${courseId}`);
  };

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="flex flex-col w-64 fixed inset-y-0 z-50">
          <div className="flex flex-col flex-grow bg-white border-r-2 border-black shadow-[4px_0_0_0_#000000]">
            {/* Logo */}
            <div className="flex items-center justify-center h-16 px-4 border-b-2 border-black">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded border-2 border-black flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold text-black">CACHIMBO</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full flex items-center px-4 py-3 text-left rounded-lg border-2 border-black
                      transition-all duration-150 ease-in-out font-medium
                      hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0_0_#000000]
                      active:translate-x-1 active:translate-y-1 active:shadow-none
                      ${item.active 
                        ? 'bg-purple-500 text-white shadow-[3px_3px_0_0_#7c3aed]' 
                        : 'bg-white text-black shadow-[3px_3px_0_0_#000000] hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="p-4 border-t-2 border-black">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-black flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">Adrian Auqui</p>
                  <p className="text-xs text-gray-600 truncate">@adrian_dev</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="flex-1 pl-64">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
        {/* Main Content */}
        <div className="flex-1 p-4 pb-20">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-black mb-4">
              ¡Hola Adrian Auqui ! 👋
            </h1>
          </div>

          {/* Welcome Cards */}
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

          {/* Courses Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-black mb-4">Cursos</h2>
            
            <div className="space-y-3">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="w-full flex items-center p-3 bg-white border-2 border-black rounded-lg shadow-[3px_3px_0_0_#000000] hover:shadow-[5px_5px_0_0_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded border-2 border-black flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-lg">{course.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-black text-sm">{course.name}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Ver Todos Link */}
            <div className="mt-4 text-right">
              <button className="text-sm text-gray-600 hover:text-black font-medium">
                Ver Todos
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black shadow-[0_-2px_0_0_#000000] z-40 max-w-md mx-auto">
          <div className="flex justify-around py-2">
            {mobileNavigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`
                    flex flex-col items-center justify-center py-2 px-1 min-w-0 flex-1
                    transition-all duration-150 ease-in-out
                    ${item.active 
                      ? 'text-purple-500' 
                      : 'text-gray-400 hover:text-gray-600 active:text-purple-400'
                    }
                  `}
                >
                  <Icon 
                    className={`w-5 h-5 mb-1 ${item.active ? 'fill-current' : ''}`}
                    fill={item.active ? 'currentColor' : 'none'}
                  />
                  <span className="text-xs font-medium truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveDashboardLayout;