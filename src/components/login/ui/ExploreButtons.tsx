"use client";

interface ExploreButton {
  text: string;
  onClick?: () => void;
  colorClass?: string;
  hoverColorClass?: string;
  borderHoverClass?: string;
}

interface ExploreButtonsProps {
  buttons?: ExploreButton[];
  className?: string;
}

const defaultButtons: ExploreButton[] = [
  {
    text: "Ver comunidades",
    colorClass: "text-purple-600 hover:text-purple-800",
    hoverColorClass: "hover:bg-purple-50",
    borderHoverClass: "hover:border-purple-200"
  },
  {
    text: "Preguntas frecuentes",
    colorClass: "text-blue-600 hover:text-blue-800",
    hoverColorClass: "hover:bg-blue-50",
    borderHoverClass: "hover:border-blue-200"
  }
];

export default function ExploreButtons({ 
  buttons = defaultButtons,
  className = ""
}: ExploreButtonsProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-2 text-center ${className}`}>
      {buttons.map((button, index) => (
        <button 
          key={index}
          onClick={button.onClick}
          className={`
            flex-1 py-2 px-4 text-sm font-medium 
            border-2 border-transparent transition-all
            ${button.colorClass} 
            ${button.hoverColorClass} 
            ${button.borderHoverClass}
          `}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}