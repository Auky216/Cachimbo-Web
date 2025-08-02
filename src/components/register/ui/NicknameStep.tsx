"use client";

interface NicknameStepProps {
  nickname: string;
  onNicknameChange: (nickname: string) => void;
  userName?: string;
}

export default function NicknameStep({ 
  nickname, 
  onNicknameChange, 
  userName = "Adrian Auqui" 
}: NicknameStepProps) {
  return (
    <div className="bg-white">
      {/* Mobile */}
      <div className="md:hidden px-6 py-6">
        <h1 className="text-2xl font-bold mb-2">¡Hola {userName}! 👋</h1>
        <p className="text-gray-600 mb-8">Elige tu apodo</p>
        
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium">@</span>
          <input
            placeholder="Escribe tu nickname"
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value.slice(0, 20))}
            className="w-full pl-8 pr-4 py-3 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]"
          />
        </div>
        
        <p className="text-sm text-gray-500 mb-4">{20 - nickname.length} caracteres restantes</p>
        
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <p className="text-blue-700 text-sm">
            El nickname es el nombre de usuario que todos verán en la aplicación.
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-12 items-center min-h-[60vh]">
          <div>
            <h1 className="text-4xl font-bold mb-4">¡Hola {userName}! 👋</h1>
            <p className="text-xl text-gray-600 mb-6">Elige tu apodo</p>
            <div className="space-y-4">
              <p className="text-gray-500">El nickname es el nombre de usuario que todos verán en la aplicación.</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <h4 className="font-semibold text-yellow-800 mb-2">Consejos:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Debe ser único e identificable</li>
                  <li>• Máximo 20 caracteres</li>
                  <li>• Solo letras, números y guiones bajos</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-2 border-black shadow-[4px_4px_0px_0px_#000] p-8 rounded-xl">
            <h3 className="text-lg font-semibold mb-6">Tu nickname:</h3>
            
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-medium text-xl">@</span>
                <input
                  placeholder="Escribe tu nickname"
                  value={nickname}
                  onChange={(e) => onNicknameChange(e.target.value.slice(0, 20))}
                  className="w-full pl-10 pr-4 py-4 border-2 border-black rounded-xl text-lg shadow-[2px_2px_0px_0px_#000]"
                />
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{nickname && `@${nickname}`}</span>
                <span className="text-gray-500">{20 - nickname.length} caracteres restantes</span>
              </div>

              {nickname && (
                <div className="bg-purple-50 border border-purple-200 rounded p-4">
                  <p className="text-purple-700 text-sm font-medium mb-2">Vista previa:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {nickname.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">@{nickname}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}