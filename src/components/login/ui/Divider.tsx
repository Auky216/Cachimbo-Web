interface DividerProps {
  text?: string;
  className?: string;
}

export default function Divider({ 
  text = "O EXPLORA",
  className = ""
}: DividerProps) {
  return (
    <div className={`flex items-center my-6 ${className}`}>
      <div className="flex-1 h-0.5 bg-gray-300"></div>
      <div className="px-4 text-xs text-gray-500 font-medium">
        {text}
      </div>
      <div className="flex-1 h-0.5 bg-gray-300"></div>
    </div>
  );
}