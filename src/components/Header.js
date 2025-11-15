/**
 * Header component - Game title and New Game button
 */
export default function Header({ onNewGame }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 py-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 text-white shadow-lg">
      <h1 className="text-3xl md:text-4xl font-bold m-0 text-center md:text-left" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
        🎮 Tic Tac Toe
      </h1>
      <button 
        onClick={onNewGame} 
        className="px-6 py-3 text-base font-semibold text-white rounded-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-white/20 backdrop-blur-md border-2 border-white/30 hover:bg-white/30" 
        title="Start a new game"
      >
        🎯 New Game
      </button>
    </div>
  );
}

