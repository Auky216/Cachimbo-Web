import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, BookOpen, BarChart3, Calendar, Zap, Database } from 'lucide-react';

const features = [
  { 
    icon: Users, 
    bg: 'bg-purple-400', 
    title: 'RED UNIVERSITARIA', 
    desc: 'Conoce mejor tu comunidad estudiantil. Conecta con compañeros de tu carrera, año y universidad de forma auténtica.'
  },
  { 
    icon: BookOpen, 
    bg: 'bg-green-400', 
    title: 'MATERIAL EXCLUSIVO', 
    desc: 'Accede a material académico compartido por estudiantes. Apuntes, guías de estudio y recursos de calidad.'
  },
  { 
    icon: BarChart3, 
    bg: 'bg-yellow-300', 
    title: 'ESTADÍSTICAS PROFESORES', 
    desc: 'Consulta estadísticas y reseñas de profesores. Toma decisiones informadas sobre tus cursos.'
  },
  
];

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-5xl font-black text-center mb-16">¿POR QUÉ CACHIMBO?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }} 
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="border-4 border-black shadow-[4px_4px_0px_0px_#000] h-full rounded-3xl overflow-hidden p-0 max-w-xl mx-auto">
                  {/* Parte superior - Icono con fondo de color */}
                  <div className={`${item.bg} h-64 flex items-center justify-center`}>
                    <IconComponent className="w-16 h-16 text-white" />
                  </div>
                  
                  {/* Parte inferior - Contenido en fondo blanco */}
                  <div className="bg-white p-8">
                    <h3 className="text-xl font-black mb-4 text-black">{item.title}</h3>
                    <p className="font-medium text-sm text-gray-700 leading-relaxed">{item.desc}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}