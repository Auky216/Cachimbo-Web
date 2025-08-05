import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Rocket, UserPlus } from 'lucide-react';
import Image1 from '@/assets/landingpage/Image1.png'

export default function HeroSection() {

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-yellow-400 text-black font-black border-4 border-black mb-8 text-lg px-6 py-2">
              <Rocket className="mr-2 h-5 w-5" />NUEVA PLATAFORMA DISPONIBLE
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none">
              CONECTA CON TU<span className="block text-purple-500">UNIVERSIDAD</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-bold mb-12 leading-relaxed">
              La red social definitiva para estudiantes universitarios. Conoce gente de tu carrera, comparte experiencias y construye tu futuro.
            </p>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="rounded-3xl p-8 ">
              <div className="w-full h-96 bg-gradient-to-br  rounded-2xl flex items-center justify-center">
                <img src={Image1.src} alt="Imagen de estudiantes universitarios" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}