import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useState } from 'react';
import CachimboLogo from '@/assets/cachimbo-logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogin = () => window.location.href = '/login';
  const handleJoin = () => window.location.href = '/register';

  return (
    <>
      {/* MOBILE ONLY - Diseño completamente diferente */}
      <div className="block sm:hidden">
        <div className="px-2 py-2">
          <header className="bg-white rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] overflow-hidden">
            <div className="px-3 py-2">
              <div className="flex items-center justify-between">
                
                {/* Logo Mobile - Más compacto */}
                <div className="flex items-center space-x-2">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={CachimboLogo.src} 
                      alt="Logo" 
                      className="w-6 h-6"
                    />
                    <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-yellow-400 border border-black transform rotate-12"></div>
                    <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-pink-400 border border-black transform -rotate-12"></div>
                  </div>
                  <h1 className="text-base font-black text-black">CACHIMBO</h1>
                </div>

                {/* Botones Mobile - Reorganizados */}
                <div className="flex items-center space-x-1">
                  <Button 
                    onClick={handleLogin} 
                    variant="outline" 
                    size="sm"
                    className="font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all bg-white text-xs px-2 py-1"
                  >
                    <LogIn className="h-3 w-3 mr-1" />
                    LOGIN
                  </Button>
                  <Button 
                    onClick={handleJoin} 
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all px-2 py-1 text-xs"
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    UNIRSE
                  </Button>
                  <Button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    variant="outline"
                    size="sm"
                    className="border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all bg-white p-1"
                  >
                    {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <a href="#" className="text-black hover:text-purple-600 font-bold text-sm py-2 rounded hover:bg-gray-50 transition-colors">SERVICIOS</a>
                    <a href="#" className="text-black hover:text-purple-600 font-bold text-sm py-2 rounded hover:bg-gray-50 transition-colors">ACERCA DE</a>
                    <a href="#" className="text-black hover:text-purple-600 font-bold text-sm py-2 rounded hover:bg-gray-50 transition-colors">CASOS</a>
                    <a href="#" className="text-black hover:text-purple-600 font-bold text-sm py-2 rounded hover:bg-gray-50 transition-colors">BLOG</a>
                    <a href="#" className="text-black hover:text-purple-600 font-bold text-sm py-2 rounded hover:bg-gray-50 transition-colors col-span-2">RECURSOS</a>
                  </div>
                </div>
              )}
            </div>
          </header>
        </div>
      </div>

      {/* TABLET & DESKTOP - Diseño original */}
      <div className="hidden sm:block p-4">
        <header className="bg-white rounded-3xl border-4 border-black shadow-[4px_4x_0px_0px_#000]">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              
              {/* Logo Desktop */}
              <div className="flex items-center">
                <div className="relative">
                  <img 
                    src={CachimboLogo.src} 
                    alt="Cachimbo Logo" 
                    className="w-8 h-8 md:w-10 md:h-10 drop-shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-black transform rotate-12"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 border-2 border-black transform -rotate-12"></div>
                </div>
                <div className="ml-3">
                  <h1 className="text-lg md:text-xl font-black text-black">CACHIMBO</h1>
                </div>
              </div>

              {/* Navigation Desktop */}
              <nav className="hidden lg:flex items-center space-x-8">
                <a href="#" className="text-black hover:text-purple-600 font-bold text-sm transition-colors">SERVICIOS</a>
                <a href="#" className="text-black hover:text-purple-600 font-bold text-sm transition-colors">ACERCA DE</a>
                <a href="#" className="text-black hover:text-purple-600 font-bold text-sm transition-colors">CASOS</a>
                <a href="#" className="text-black hover:text-purple-600 font-bold text-sm transition-colors">BLOG</a>
                <a href="#" className="text-black hover:text-purple-600 font-bold text-sm transition-colors">RECURSOS</a>
              </nav>

              {/* Buttons Desktop */}
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={handleLogin} 
                  variant="outline" 
                  className="font-black border-3 border-black shadow-[3px_3px_0px_0px_#000] hover:shadow-[1px_1px_0px_0px_#000] transition-all bg-white text-sm"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  INICIAR SESIÓN
                </Button>
                <Button 
                  onClick={handleJoin} 
                  className="bg-purple-500 hover:bg-purple-600 text-white font-black border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all px-6 py-2 text-sm"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  UNIRSE
                </Button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}