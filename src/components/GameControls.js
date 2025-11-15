/**
 * Game Controls component - Undo/Redo buttons
 */
export default function GameControls({ onUndo, onRedo, canUndo, canRedo }) {
  return (
    <div className="mt-6 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-4 shadow-md border border-gray-200">
      <div className="flex gap-3 mb-3">
        <button 
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 shadow-md ${
            canUndo 
              ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0' 
              : 'bg-gray-200 text-gray-600 cursor-not-allowed shadow-none opacity-60'
          }`}
          title="Undo last move (Ctrl+Z)"
        >
          ↶ Undo
        </button>
        <button 
          onClick={onRedo}
          disabled={!canRedo}
          className={`flex-1 px-4 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-200 shadow-md ${
            canRedo 
              ? 'bg-gradient-to-r from-slate-700 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0' 
              : 'bg-gray-200 text-gray-600 cursor-not-allowed shadow-none opacity-60'
          }`}
          title="Redo move (Ctrl+Y)"
        >
          ↷ Redo
        </button>
      </div>
    </div>
  );
}

