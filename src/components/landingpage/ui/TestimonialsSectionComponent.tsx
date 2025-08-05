import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, BookOpen, Rocket } from 'lucide-react';

const testimonials = [
  { 
    initial: 'M', 
    name: 'María González', 
    role: 'Ing. Industrial - PUCP', 
    text: 'Increíble! Encontré mi grupo de estudio perfecto. Las notas subieron un montón', 
    bg: 'bg-purple-500', 
    icon: BookOpen 
  },
  { 
    initial: 'C', 
    name: 'Carlos Mendoza', 
    role: 'Sistemas - UNI', 
    text: 'Super clean la plataforma. Conecté con seniors que me ayudaron con prácticas profesionales', 
    bg: 'bg-blue-500', 
    icon: Rocket 
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-yellow-100 ">
      <div className="container mx-auto">
        <h2 className="text-5xl font-black text-center mb-16">LO QUE DICEN LOS USERS</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }}>
              <Card className="border-4 border-black shadow-[6px_6px_0px_0px_#000] bg-white p-8">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${testimonial.bg} border-2 border-black rounded-full flex items-center justify-center font-black text-white mr-4`}>
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-black">{testimonial.name}</div>
                    <div className="font-bold text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="font-bold text-lg">{testimonial.text}</p>
                <div className="flex items-center mt-2">
                  <testimonial.icon className={`w-4 h-4 ${testimonial.bg.replace('bg-', 'text-')} mr-1`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}