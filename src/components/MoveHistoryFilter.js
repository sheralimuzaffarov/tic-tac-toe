/**
 * Move History Filter component - filters and sorts move history
 */
export default function MoveHistoryFilter({ 
  filterPlayer, 
  onFilterPlayerChange, 
  searchQuery, 
  onSearchQueryChange, 
  isAscending, 
  onToggleOrder 
}) {
  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 shadow-md border border-slate-200 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Filter Moves</h3>
        <button 
          onClick={onToggleOrder}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-primary rounded-md cursor-pointer transition-all duration-200 hover:bg-primary-hover shadow-sm"
          title="Toggle sort order"
        >
          {isAscending ? '⬇️ Desc' : '⬆️ Asc'}
        </button>
      </div>
      
      <div className="space-y-3">
        {/* Player Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Filter by Player</label>
          <div className="flex gap-2">
            {['All', 'X', 'O'].map((player) => (
              <button
                key={player}
                onClick={() => onFilterPlayerChange(player === 'All' ? null : player)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  filterPlayer === (player === 'All' ? null : player)
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {player}
              </button>
            ))}
          </div>
        </div>

        {/* Search Filter */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Search by Location</label>
          <input
            type="text"
            placeholder="e.g., (0,0) or 0,0"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

