import { motion } from "framer-motion";

const stats = [
  { num: '1000+', label: 'ESTUDIANTES' },
  { num: '50+', label: 'CARRERAS' },
  { num: '15+', label: 'UNIVERSIDADES' },
  { num: '99%', label: 'SATISFACCIÓN' }
];

export default function StatsSection() {
  return (
    <section className="py-20 px-4 bg-purple-500">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-5xl font-black mb-16">NÚMEROS QUE HABLAN</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }} 
              className="bg-white text-black p-8 border-4 border-black shadow-[6px_6px_0px_0px_#000]"
            >
              <div className="text-4xl font-black mb-2">{stat.num}</div>
              <div className="font-bold text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}