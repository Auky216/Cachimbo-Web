import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { UserPlus, Heart } from 'lucide-react';

export default function CTASection() {
  const handleJoin = () => window.location.href = '/register';

  return (
    <section className="py-20 px-4 bg-purple-500">
      <motion.div 
        className="container mx-auto text-center text-white" 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }}
      >
        <h2 className="text-5xl md:text-6xl font-black mb-8">¿LISTO PARA CONECTAR?</h2>
        <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
          Únete a la comunidad estudiantil más activa del Perú. Tu futuro profesional comienza aquí.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            onClick={handleJoin} 
            size="lg" 
            className="bg-white text-purple-500 hover:bg-gray-100 font-black text-xl px-12 py-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
          >
            <UserPlus className="mr-2 h-6 w-6" />UNIRSE AHORA
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-white text-purple-500 hover:bg-gray-100 font-black text-xl px-12 py-6 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#000] transition-all"
          >
            <Heart className="mr-2 h-6 w-6" />SÍGUENOS
          </Button>
        </div>
      </motion.div>
    </section>
  );
}