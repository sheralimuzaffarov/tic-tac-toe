import MoveHistoryFilter from './MoveHistoryFilter';

/**
 * Move History component - displays and filters move history
 */
export default function MoveHistory({ 
  moves, 
  onJumpTo, 
  filterPlayer, 
  onFilterPlayerChange, 
  searchQuery, 
  onSearchQueryChange, 
  isAscending, 
  onToggleOrder 
}) {
  const moveItems = moves.map(({ move, description, isCurrentMove }) => {
    return (
      <li 
        key={move} 
        className={`mb-2 p-2 rounded-lg transition-all duration-200 ${
          isCurrentMove 
            ? 'bg-gradient-to-r from-primary to-primary-hover text-white font-semibold shadow-md' 
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        {isCurrentMove ? (
          <span className="block px-4 py-2.5 text-white">You are at move #{move}</span>
        ) : (
          <button 
            onClick={() => onJumpTo(move)} 
            className="w-full px-4 py-2.5 text-sm text-left bg-white border-2 border-gray-200 rounded-lg cursor-pointer transition-all duration-200 text-gray-800 hover:bg-primary hover:text-white hover:border-primary hover:translate-x-1 hover:shadow-md"
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-md border border-slate-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
        <span>📜</span>
        <span>Move History</span>
      </h2>
      
      {/* Filter Component */}
      <MoveHistoryFilter
        filterPlayer={filterPlayer}
        onFilterPlayerChange={onFilterPlayerChange}
        searchQuery={searchQuery}
        onSearchQueryChange={onSearchQueryChange}
        isAscending={isAscending}
        onToggleOrder={onToggleOrder}
      />

      {/* Moves List */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
        {moveItems.length > 0 ? (
          <ol className="list-none p-0 max-h-[400px] overflow-y-auto space-y-2">
            {moveItems}
          </ol>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No moves match your filters</p>
            <button
              onClick={() => {
                onFilterPlayerChange(null);
                onSearchQueryChange('');
              }}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

