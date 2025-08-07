import CachimboLogo from "@/assets/cachimbo-logo.png";

interface LogoHeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
  showDecorations?: boolean;
}

export default function LogoHeader({ 
  title = "CACHIMBO",
  subtitle = "Tu comunidad universitaria",
  description = "Conecta, comparte y crece con estudiantes de tu universidad",
  showDecorations = true
}: LogoHeaderProps) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <img 
            src={CachimboLogo.src} 
            alt="Cachimbo Logo" 
            className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-lg"
          />
          {/* Decoraciones alrededor del logo */}
          {showDecorations && (
            <>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 border-2 border-black transform rotate-12"></div>
              <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-pink-400 border-2 border-black transform -rotate-12"></div>
            </>
          )}
        </div>
        <div className="ml-4">
          <h1 className="text-3xl sm:text-4xl font-black text-black">
            {title}
          </h1>
        </div>
      </div>
      
      {/* Subtítulo descriptivo */}
      <p className="text-gray-700 text-sm sm:text-base font-medium mb-2">
        {subtitle}
      </p>
      <p className="text-gray-500 text-xs sm:text-sm">
        {description}
      </p>
    </div>
  );
}