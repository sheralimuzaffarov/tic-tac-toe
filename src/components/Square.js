/**
 * Individual square component for the Tic Tac Toe board
 */
export default function Square({ 
  value, 
  onSquareClick, 
  isWinning, 
  isFocused, 
  hoverPreview, 
  onMouseEnter, 
  onMouseLeave 
}) {
  const displayValue = hoverPreview || value;
  const showHover = hoverPreview && !value;
  
  const baseClasses = "bg-white border-2 rounded-lg text-5xl font-bold h-24 w-24 p-0 text-center cursor-pointer transition-all duration-200 flex items-center justify-center relative";
  const stateClasses = `
    ${isWinning ? 'bg-yellow-100 border-green-500 border-[3px] animate-highlight' : 'border-gray-300'}
    ${value ? 'cursor-default' : ''}
    ${isFocused ? 'outline-4 outline-primary outline-offset-2 z-10' : ''}
    ${showHover ? 'text-primary opacity-50 font-normal' : 'text-gray-800'}
    ${!value && !isWinning ? 'hover:bg-gray-100 hover:border-primary hover:-translate-y-0.5 hover:shadow-md' : ''}
  `.trim();
  
  return (
    <button 
      className={`${baseClasses} ${stateClasses}`}
      onClick={onSquareClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={value ? `Square ${value}` : 'Empty square'}
      disabled={!!value}
    >
      {displayValue}
    </button>
  );
}

