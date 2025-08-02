"use client";

interface WelcomeStepProps {
  nickname: string;
  userPhoto?: string;
}

export default function WelcomeStep({ 
  nickname, 
  userPhoto 
}: WelcomeStepProps) {
  return (
    <div className="bg-white">
      {/* Mobile */}
      <div className="md:hidden px-6 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">¡Bienvenido!</h1>
        
        {/* Profile Card */}
        <div className="bg-gradient-to-br from-purple-500 to-blue-600 border-2 border-black rounded-xl p-6 mb-8 text-white shadow-[4px_4px_0px_0px_#000]">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {userPhoto ? (
                <img 
                  src={userPhoto} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full border-2 border-white"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-white border-2 border-white flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">
                    {nickname?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {/* Online indicator */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            
            <h2 className="text-xl font-bold mb-4">@{nickname}</h2>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 text-sm">
              <div className="text-center bg-white/20 rounded-lg p-3 flex-1">
                <div className="font-bold">UTEC</div>
                <div className="opacity-80 text-xs">Universidad</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3 flex-1">
                <div className="font-bold">Pregrado</div>
                <div className="opacity-80 text-xs">Nivel</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3 flex-1">
                <div className="font-bold">Ciencias de la Computación</div>
                <div className="opacity-80 text-xs">Carrera</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">¡Bienvenido a Cachimbo!</h1>
          <p className="text-xl text-gray-600">Tu perfil está listo. ¡Es hora de conectar!</p>
        </div>

        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Left - Welcome Message */}
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded">
              <h3 className="font-bold text-green-800 mb-2">🎉 ¡Felicitaciones!</h3>
              <p className="text-green-700">Has completado tu registro exitosamente. Ahora puedes:</p>
              <ul className="mt-3 text-green-700 text-sm space-y-1">
                <li>• Conectar con estudiantes de tu carrera</li>
                <li>• Unirte a grupos de estudio</li>
                <li>• Compartir experiencias académicas</li>
                <li>• Acceder a recursos exclusivos</li>
              </ul>
            </div>
          </div>

          {/* Center - Profile Card */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-white max-w-sm w-full rounded-xl">
              <div className="flex flex-col items-center">
                <div className="relative mb-6">
                  {userPhoto ? (
                    <img 
                      src={userPhoto} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full border-4 border-white"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white border-4 border-white flex items-center justify-center">
                      <span className="text-3xl font-bold text-purple-600">
                        {nickname?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Online indicator */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">@{nickname}</h2>
                
                {/* Stats */}
                <div className="flex justify-center gap-8 text-sm w-full">
                  <div className="text-center bg-white/20 rounded-lg p-3 flex-1">
                    <div className="font-bold text-lg">UTEC</div>
                    <div className="opacity-80 text-xs">Universidad</div>
                  </div>
                  <div className="text-center bg-white/20 rounded-lg p-3 flex-1">
                    <div className="font-bold text-lg">Pregrado</div>
                    <div className="opacity-80 text-xs">Nivel</div>
                  </div>
                  <div className="text-center bg-white/20 rounded-lg p-3 flex-1">
                    <div className="font-bold text-lg">CS</div>
                    <div className="opacity-80 text-xs">Carrera</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Next Steps */}
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded">
              <h3 className="font-bold text-purple-800 mb-2">🚀 ¿Qué sigue?</h3>
              <p className="text-purple-700">Completa tu perfil y comienza tu experiencia universitaria.</p>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-16 grid grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl">
            <h3 className="font-bold mb-2">Comunidad Académica</h3>
            <p className="text-gray-600 text-sm">Conecta con estudiantes de tu universidad</p>
          </div>
          
          <div className="text-center p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl">
            <div className="text-3xl mb-3">📚</div>
            <h3 className="font-bold mb-2">Recursos de Estudio</h3>
            <p className="text-gray-600 text-sm">Accede a materiales y grupos de estudio</p>
          </div>
          
          <div className="text-center p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="font-bold mb-2">Networking</h3>
            <p className="text-gray-600 text-sm">Construye tu red profesional desde ahora</p>
          </div>
        </div>
      </div>
    </div>
  );
}