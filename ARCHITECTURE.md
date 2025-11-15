# Project Architecture

This document describes the improved modular architecture of the Tic Tac Toe application.

## 📁 Folder Structure

```
src/
├── components/          # React components
│   ├── Board.js         # Game board component
│   ├── Square.js         # Individual square component
│   ├── Confetti.js      # Celebration animation
│   ├── Statistics.js    # Game statistics display
│   ├── MoveHistory.js   # Move history list
│   ├── MoveHistoryFilter.js  # Filter controls
│   ├── GameControls.js  # Undo/Redo controls
│   ├── Header.js        # App header
│   └── index.js         # Component exports
│
├── hooks/               # Custom React hooks
│   ├── useGameStats.js  # Statistics management hook
│   ├── useKeyboardNavigation.js  # Keyboard navigation hook
│   └── useUndoRedo.js   # Undo/Redo shortcuts hook
│
├── utils/               # Utility functions and constants
│   ├── constants.js     # Game constants (BOARD_SIZE, WINNING_LINES, etc.)
│   ├── gameLogic.js     # Game logic functions (calculateWinner, etc.)
│   ├── moveUtils.js     # Move processing and filtering utilities
│   └── storage.js      # LocalStorage utilities
│
├── App.js               # Main game component (orchestrator)
├── index.js             # React entry point
└── styles.css           # Tailwind CSS styles
```

## 🏗️ Architecture Principles

### 1. **Separation of Concerns**
   - **Components**: UI presentation only
   - **Hooks**: Reusable stateful logic
   - **Utils**: Pure functions and constants
   - **App.js**: Orchestration and state management

### 2. **Component Hierarchy**
   ```
   Game (App.js)
   ├── Header
   ├── Board
   │   └── Square (x9)
   ├── GameControls
   ├── Statistics
   └── MoveHistory
       └── MoveHistoryFilter
   ```

### 3. **Data Flow**
   - **Top-down**: Props flow from parent to child
   - **Bottom-up**: Events bubble up via callbacks
   - **State**: Managed at appropriate levels (Game component)

## 📦 Component Details

### Components (`/components`)

#### `Board.js`
- Renders the 3x3 game board
- Handles square interactions
- Manages keyboard navigation
- Displays game status

#### `Square.js`
- Individual board square
- Handles click, hover, and focus states
- Shows winning state
- Displays hover preview

#### `Statistics.js`
- Displays game statistics (wins, draws, total)
- Handles reset functionality
- Color-coded stat cards

#### `MoveHistory.js`
- Displays move history list
- Integrates filter component
- Handles move navigation

#### `MoveHistoryFilter.js`
- Player filter (All, X, O)
- Location search
- Sort order toggle

#### `GameControls.js`
- Undo/Redo buttons
- Disabled state handling

#### `Header.js`
- App title
- New Game button

#### `Confetti.js`
- Celebration animation
- Conditional rendering

## 🎣 Custom Hooks (`/hooks`)

### `useGameStats.js`
- Manages game statistics state
- Handles localStorage persistence
- Updates stats on game end
- Provides reset functionality

### `useKeyboardNavigation.js`
- Handles keyboard input for board navigation
- Number keys (1-9) for direct selection
- Arrow keys for navigation
- Enter/Space for confirmation

### `useUndoRedo.js`
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
- Integrates with game state

## 🛠️ Utilities (`/utils`)

### `constants.js`
- `BOARD_SIZE`: Board dimensions (3)
- `WINNING_LINES`: All possible winning combinations
- `INITIAL_STATS`: Default statistics object
- `STATS_STORAGE_KEY`: LocalStorage key

### `gameLogic.js`
- `calculateWinner()`: Determines game winner
- `getMoveLocation()`: Gets move coordinates
- `getMovePlayer()`: Gets player who made move
- `isDraw()`: Checks for draw condition

### `moveUtils.js`
- `processMoves()`: Converts history to structured format
- `filterMoves()`: Filters moves by player/location

### `storage.js`
- `loadStats()`: Loads stats from localStorage
- `saveStats()`: Saves stats to localStorage
- `resetStats()`: Clears stats from localStorage

## 🔄 State Management

### Game State (App.js)
- `history`: Array of all board states
- `currentMove`: Current position in history
- `focusedIndex`: Currently focused square
- `showConfetti`: Confetti animation state
- `filterPlayer`: Move filter by player
- `searchQuery`: Move search query
- `isAscending`: Sort order

### Statistics State (useGameStats hook)
- `stats`: Game statistics object
- Persisted in localStorage
- Auto-updates on game end

## 📝 Benefits of This Architecture

1. **Maintainability**: Each file has a single responsibility
2. **Reusability**: Components and hooks can be reused
3. **Testability**: Pure functions are easy to test
4. **Scalability**: Easy to add new features
5. **Readability**: Clear file organization
6. **Collaboration**: Multiple developers can work on different files

## 🚀 Adding New Features

### To add a new component:
1. Create file in `components/`
2. Export from `components/index.js`
3. Import and use in `App.js`

### To add a new utility:
1. Create file in `utils/`
2. Export functions
3. Import where needed

### To add a new hook:
1. Create file in `hooks/`
2. Follow React hooks conventions
3. Use in components

## 📚 Import Patterns

### Before (monolithic):
```javascript
// Everything in one file
```

### After (modular):
```javascript
// Clean, organized imports
import { calculateWinner } from './utils/gameLogic';
import { useGameStats } from './hooks/useGameStats';
import { Board, Statistics } from './components';
```

---

**The codebase is now well-organized, maintainable, and follows React best practices!** 🎉

