/**
 * Statistics component - displays game statistics
 */
export default function Statistics({ stats, onResetStats }) {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-md border border-slate-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Game Statistics</h3>
        <button 
          onClick={onResetStats} 
          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-300 rounded-md cursor-pointer transition-all duration-200 hover:bg-amber-500 hover:text-white hover:border-amber-500" 
          title="Reset statistics"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">X Wins</span>
          <span className="text-3xl font-bold text-blue-600">{stats.xWins}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">O Wins</span>
          <span className="text-3xl font-bold text-red-600">{stats.oWins}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">Draws</span>
          <span className="text-3xl font-bold text-amber-600">{stats.draws}</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-600 uppercase tracking-wider mb-2 font-semibold">Total</span>
          <span className="text-3xl font-bold text-slate-700">{stats.totalGames}</span>
        </div>
      </div>
    </div>
  );
}

