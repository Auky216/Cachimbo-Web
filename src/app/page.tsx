import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Smartphone, 
  Users, 
  GraduationCap, 
  Zap, 
  Star,
  Download,
  ArrowRight,
  BookOpen,
  Trophy,
  Heart
} from 'lucide-react';

import CachimboLogo from '@/assets/cachimbo-logo.png';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={CachimboLogo.src ?? CachimboLogo} alt="Cachimbo Logo" className="h-12" />
   
            </div>
            <Button 
              className="bg-purple-500 hover:bg-purple-600 text-white font-black border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
            >
              DESCARGAR APP
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="bg-yellow-400 text-black font-black border-4 border-black mb-8 text-lg px-6 py-2">
            🚀 NUEVA APP DISPONIBLE
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">
            CONECTA CON TU
            <span className="block text-purple-500">UNIVERSIDAD</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto mb-12 leading-relaxed">
            La red social definitiva para estudiantes universitarios. 
            Conoce gente de tu carrera, comparte experiencias y construye tu futuro.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-purple-500 hover:bg-purple-600 text-white font-black text-xl px-12 py-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
            >
              <Download className="mr-2 h-6 w-6" />
              DESCARGAR GRATIS
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="font-black text-xl px-12 py-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all bg-white"
            >
              VER DEMO
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white border-t-4 border-b-4 border-black">
        <div className="container mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            ¿POR QUÉ CACHIMBO?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-purple-100 p-8">
              <div className="w-16 h-16 bg-purple-500 border-4 border-black flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">CONECTA REAL</h3>
              <p className="font-bold text-lg">
                Encuentra estudiantes de tu carrera, año y universidad. 
                Networking auténtico, sin algoritmos raros.
              </p>
            </Card>

            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-blue-100 p-8">
              <div className="w-16 h-16 bg-blue-500 border-4 border-black flex items-center justify-center mb-6">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">ACADÉMICO</h3>
              <p className="font-bold text-lg">
                Comparte apuntes, forma grupos de estudio, 
                y ayúdate mutuamente a ser mejores estudiantes.
              </p>
            </Card>

            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_#000] bg-green-100 p-8">
              <div className="w-16 h-16 bg-green-500 border-4 border-black flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-4">SÚPER RÁPIDO</h3>
              <p className="font-bold text-lg">
                Interfaz brutal y directa. Sin distracciones, 
                solo lo que necesitas para conectar y crecer.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-purple-500">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-5xl font-black mb-16">NÚMEROS QUE HABLAN</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white text-black p-8 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
              <div className="text-4xl font-black mb-2">1000+</div>
              <div className="font-bold text-lg">ESTUDIANTES</div>
            </div>
            
            <div className="bg-white text-black p-8 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
              <div className="text-4xl font-black mb-2">50+</div>
              <div className="font-bold text-lg">CARRERAS</div>
            </div>
            
            <div className="bg-white text-black p-8 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
              <div className="text-4xl font-black mb-2">15+</div>
              <div className="font-bold text-lg">UNIVERSIDADES</div>
            </div>
            
            <div className="bg-white text-black p-8 border-4 border-black shadow-[6px_6px_0px_0px_#000]">
              <div className="text-4xl font-black mb-2">99%</div>
              <div className="font-bold text-lg">SATISFACCIÓN</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            SÚPER FÁCIL DE USAR
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6 font-black text-white text-2xl">
                  1
                </div>
                <h3 className="text-2xl font-black mb-4">REGÍSTRATE</h3>
                <p className="font-bold">
                  Login con Google, elige tu carrera, año y nickname. 
                  ¡En 2 minutos estás dentro!
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-500 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6 font-black text-white text-2xl">
                  2
                </div>
                <h3 className="text-2xl font-black mb-4">CONECTA</h3>
                <p className="font-bold">
                  Encuentra estudiantes de tu nivel, carrera y universidad. 
                  ¡Tu gente está aquí!
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6 font-black text-white text-2xl">
                  3
                </div>
                <h3 className="text-2xl font-black mb-4">CRECE</h3>
                <p className="font-bold">
                  Comparte, aprende, colabora. 
                  Construye tu red profesional desde ahora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-yellow-100 border-t-4 border-b-4 border-black">
        <div className="container mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            LO QUE DICEN LOS USERS
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-white p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 border-2 border-black rounded-full flex items-center justify-center font-black text-white mr-4">
                  M
                </div>
                <div>
                  <div className="font-black">María González</div>
                  <div className="font-bold text-sm text-gray-600">Ing. Industrial - PUCP</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-bold text-lg">
                "¡Increíble! Encontré mi grupo de estudio perfecto. 
                Las notas subieron un montón 📚"
              </p>
            </Card>

            <Card className="border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-white p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 border-2 border-black rounded-full flex items-center justify-center font-black text-white mr-4">
                  C
                </div>
                <div>
                  <div className="font-black">Carlos Mendoza</div>
                  <div className="font-bold text-sm text-gray-600">Sistemas - UNI</div>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="font-bold text-lg">
                "Super clean la app. Conecté con seniors que me ayudaron 
                con prácticas profesionales 🚀"
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-purple-500">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-5xl md:text-6xl font-black mb-8">
            ¿LISTO PARA CONECTAR?
          </h2>
          
          <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
            Únete a la comunidad estudiantil más activa del Perú. 
            Tu futuro profesional comienza aquí.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-500 hover:bg-gray-100 font-black text-xl px-12 py-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
            >
              <Smartphone className="mr-2 h-6 w-6" />
              DESCARGAR AHORA
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="font-black text-xl px-12 py-6 border-4 border-white text-white hover:bg-white hover:text-purple-500 shadow-[6px_6px_0px_0px_#fff] hover:shadow-[3px_3px_0px_0px_#fff] transition-all"
            >
              <Heart className="mr-2 h-6 w-6" />
              SÍGUENOS
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 border-t-4 border-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img src={CachimboLogo.src ?? CachimboLogo} alt="Cachimbo Logo" className="h-12" />
            </div>
            
            <div className="flex space-x-8">
              <a href="#" className="font-bold hover:text-purple-400 transition-colors">
                Términos
              </a>
              <a href="#" className="font-bold hover:text-purple-400 transition-colors">
                Privacidad
              </a>
              <a href="#" className="font-bold hover:text-purple-400 transition-colors">
                Soporte
              </a>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-600" />
          
          <div className="text-center">
            <p className="font-bold">
              © 2024 CACHIMBO. Hecho con ❤️ para estudiantes peruanos.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}