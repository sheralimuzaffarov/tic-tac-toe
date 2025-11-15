import { loadStats, saveStats, resetStats } from '../storage';
import { INITIAL_STATS } from '../constants';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });
  localStorageMock.clear();
});

describe('storage', () => {
  describe('loadStats', () => {
    it('should return initial stats when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);
      const result = loadStats();
      expect(result).toEqual(INITIAL_STATS);
    });

    it('should load stats from localStorage', () => {
      const savedStats = { xWins: 5, oWins: 3, draws: 2, totalGames: 10 };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedStats));
      const result = loadStats();
      expect(result).toEqual(savedStats);
    });

    it('should return initial stats on parse error', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const result = loadStats();
      expect(result).toEqual(INITIAL_STATS);
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('saveStats', () => {
    it('should save stats to localStorage', () => {
      const stats = { xWins: 1, oWins: 2, draws: 3, totalGames: 6 };
      saveStats(stats);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'ticTacToeStats',
        JSON.stringify(stats)
      );
    });

    it('should handle save errors gracefully', () => {
      const stats = { xWins: 1, oWins: 2, draws: 3, totalGames: 6 };
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      expect(() => saveStats(stats)).not.toThrow();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('resetStats', () => {
    it('should remove stats from localStorage', () => {
      resetStats();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('ticTacToeStats');
    });

    it('should handle reset errors gracefully', () => {
      localStorageMock.removeItem.mockImplementation(() => {
        throw new Error('Storage error');
      });
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      expect(() => resetStats()).not.toThrow();
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});

