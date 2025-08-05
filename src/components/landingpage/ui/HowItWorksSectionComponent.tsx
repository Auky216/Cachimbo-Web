import { motion } from "framer-motion";

const steps = [
  { 
    num: '1', 
    bg: 'bg-purple-500', 
    title: 'REGÍSTRATE', 
    desc: 'Login con Google, elige tu carrera, año y nickname. En 2 minutos estás dentro!' 
  },
  { 
    num: '2', 
    bg: 'bg-blue-500', 
    title: 'CONECTA', 
    desc: 'Encuentra estudiantes de tu nivel, carrera y universidad. Tu gente está aquí!' 
  },
  { 
    num: '3', 
    bg: 'bg-green-500', 
    title: 'CRECE', 
    desc: 'Comparte, aprende, colabora. Construye tu red profesional desde ahora.' 
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-5xl font-black text-center mb-16">SÚPER FÁCIL DE USAR</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }} 
                className="text-center"
              >
                <div className={`w-20 h-20 ${step.bg} border-4 border-black rounded-full flex items-center justify-center mx-auto mb-6 font-black text-white text-2xl`}>
                  {step.num}
                </div>
                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                <p className="font-bold">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}