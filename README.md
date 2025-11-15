# 🎮 Tic Tac Toe Game

A modern, feature-rich Tic Tac Toe game built with React and Tailwind CSS. This project demonstrates advanced React concepts, state management, and a beautiful, responsive UI.

## ✨ Features

### Core Gameplay
- **Classic Tic Tac Toe** - Play the traditional 3x3 grid game
- **Win Detection** - Automatically detects winners and highlights winning squares
- **Draw Detection** - Recognizes when the game ends in a draw
- **Move History** - Complete history of all moves with location tracking

### Enhanced User Experience
- **Visual Feedback** - Hover previews show which player's mark will appear
- **Winning Animation** - Confetti celebration animation on game win
- **Keyboard Navigation** - Full keyboard support for accessibility
  - Number keys (1-9) to select squares
  - Arrow keys for navigation
  - Enter/Space to confirm selection
- **Undo/Redo** - Navigate through game history
  - Keyboard shortcuts: `Ctrl+Z` (Undo), `Ctrl+Y` (Redo)
- **Reset Game** - Start a new game anytime

### Move History & Filtering
- **Move History** - View all moves with row/column coordinates
- **Filter by Player** - Filter moves by X, O, or view all
- **Search by Location** - Search moves by board coordinates (e.g., "0,0" or "(0,0)")
- **Sort Order** - Toggle between ascending and descending order
- **Current Move Indicator** - Highlights the current position in history

### Statistics Tracking
- **Game Statistics** - Track wins for X, O, draws, and total games
- **Persistent Storage** - Statistics saved in localStorage
- **Reset Stats** - Option to reset statistics

### Modern UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Beautiful Animations** - Smooth transitions and hover effects
- **Color-Coded Status** - Visual indicators for game state
- **Professional Design** - Modern gradient backgrounds and card-based layout
- **Accessibility** - ARIA labels and keyboard navigation support

## 🛠️ Technologies Used

- **React 19.2** - Modern React with hooks
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Create React App** - Build tooling and development server

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd prepare-to-interview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🚀 Running the Project

### Development Mode
```bash
npm start
```
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Production Build
```bash
npm run build
```
Builds the app for production to the `build` folder.

### Run Tests
```bash
npm test
```
Launches the test runner in interactive watch mode.

## 🎯 How to Play

### Mouse/Touch Controls
- Click on any empty square to place your mark
- Hover over squares to see a preview of your mark
- Use the "New Game" button to start fresh
- Click on move history items to jump to that position

### Keyboard Controls
- **Number Keys (1-9)**: Select and place mark on corresponding square
  - 1 = top-left, 2 = top-center, 3 = top-right
  - 4 = middle-left, 5 = center, 6 = middle-right
  - 7 = bottom-left, 8 = bottom-center, 9 = bottom-right
- **Arrow Keys**: Navigate between squares
- **Enter/Space**: Place mark on focused square
- **Ctrl+Z**: Undo last move
- **Ctrl+Y**: Redo move

## 📁 Project Structure

```
prepare-to-interview/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Main game component
│   ├── index.js        # React entry point
│   └── styles.css      # Tailwind CSS styles
├── .vscode/
│   ├── settings.json   # VS Code settings
│   ├── extensions.json # Recommended extensions
│   └── css_custom_data.json # CSS IntelliSense config
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Key Components

- **Game** - Main component managing game state and history
- **Board** - Renders the game board and handles square interactions
- **Square** - Individual square component with hover and focus states
- **Statistics** - Displays game statistics with localStorage persistence
- **MoveHistoryFilter** - Filter and search controls for move history
- **Confetti** - Celebration animation component

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration:
- Custom colors (primary, success, warning)
- Custom animations (confetti-fall, pulse-scale, bounce-scale, highlight)
- Responsive breakpoints

### VS Code Settings
The project includes VS Code configuration for:
- Tailwind CSS IntelliSense
- CSS syntax highlighting
- Ignoring unknown at-rules warnings

## 📱 Responsive Design

The game is fully responsive and optimized for:
- **Desktop** (1024px+) - Full layout with sidebar
- **Tablet** (768px - 1023px) - Stacked layout
- **Mobile** (< 768px) - Compact, touch-friendly interface

## 🎯 Features in Detail

### Move History Filtering
- Filter moves by player (All, X, O)
- Search by board coordinates
- Toggle sort order (ascending/descending)
- Clear filters button when no matches found

### Statistics
- Tracks X wins, O wins, draws, and total games
- Persists across browser sessions using localStorage
- Color-coded stat cards for easy visualization
- Reset functionality

### Visual Enhancements
- Gradient backgrounds
- Smooth animations and transitions
- Hover effects on interactive elements
- Focus indicators for keyboard navigation
- Winning square highlighting

## 🐛 Known Issues

None at the moment! If you find any issues, please report them.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available for learning purposes.

## 🙏 Acknowledgments

- Built as a practice project for React development
- Inspired by the classic Tic Tac Toe game
- Uses modern web technologies for best practices

---

**Enjoy playing! 🎮**

