import { Separator } from "@/components/ui/separator";
import { Heart, FileText, Shield, HelpCircle, GraduationCap } from 'lucide-react';
import CachimboLogo from '@/assets/cachimbo-logo.png';
const footerLinks = [
  { name: 'Términos', icon: FileText },
  { name: 'Privacidad', icon: Shield },
  { name: 'Soporte', icon: HelpCircle }
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-8 md:mb-0">
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
                  <h1 className="text-lg md:text-xl font-black text-white">CACHIMBO</h1>
                </div>
              </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            {footerLinks.map(link => {
              const IconComponent = link.icon;
              return (
                <a 
                  key={link.name} 
                  href="#" 
                  className="font-bold hover:text-purple-400 transition-colors flex items-center justify-center md:justify-start"
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
        <Separator className="my-8 bg-gray-600" />
        <div className="text-center">
          <p className="font-bold flex items-center justify-center">
            © 2024 CACHIMBO. Hecho con 
            <Heart className="mx-2 h-4 w-4 text-red-500 fill-current" /> 
            para estudiantes peruanos.
          </p>
        </div>
      </div>
    </footer>
  );
}