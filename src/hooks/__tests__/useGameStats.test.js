import { renderHook, act } from '@testing-library/react';
import { useGameStats } from '../useGameStats';

// Mock storage utilities
const mockLoadStats = jest.fn();
const mockSaveStats = jest.fn();

jest.mock('../../utils/storage', () => ({
  loadStats: jest.fn(() => mockLoadStats()),
  saveStats: jest.fn((stats) => mockSaveStats(stats)),
}));

import { loadStats, saveStats } from '../../utils/storage';
import { INITIAL_STATS } from '../../utils/constants';

describe('useGameStats', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadStats.mockReturnValue({ xWins: 0, oWins: 0, draws: 0, totalGames: 0 });
  });

  it('should initialize with stats from localStorage', () => {
    const { result } = renderHook(() => useGameStats(null, Array(9).fill(null)));
    expect(result.current.stats).toEqual({ xWins: 0, oWins: 0, draws: 0, totalGames: 0 });
    expect(loadStats).toHaveBeenCalled();
  });

  it('should update stats when X wins', () => {
    const { result, rerender } = renderHook(
      ({ winner, squares }) => useGameStats(winner, squares),
      { initialProps: { winner: null, squares: Array(9).fill(null) } }
    );
    
    act(() => {
      rerender({ winner: 'X', squares: ['X', 'X', 'X', null, null, null, null, null, null] });
    });
    
    expect(saveStats).toHaveBeenCalled();
    expect(result.current.stats.xWins).toBe(1);
    expect(result.current.stats.totalGames).toBe(1);
  });

  it('should update stats when O wins', () => {
    const savedStats = { xWins: 1, oWins: 0, draws: 0, totalGames: 1 };
    mockLoadStats.mockReturnValue(savedStats);
    
    const { result, rerender } = renderHook(
      ({ winner, squares }) => useGameStats(winner, squares),
      { initialProps: { winner: null, squares: Array(9).fill(null) } }
    );
    
    act(() => {
      rerender({ winner: 'O', squares: ['O', 'O', 'O', null, null, null, null, null, null] });
    });
    
    expect(saveStats).toHaveBeenCalled();
  });

  it('should update stats when game is a draw', () => {
    const { result, rerender } = renderHook(
      ({ winner, squares }) => useGameStats(winner, squares),
      { initialProps: { winner: null, squares: Array(9).fill(null) } }
    );
    
    const drawSquares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    
    act(() => {
      rerender({ winner: null, squares: drawSquares });
    });
    
    expect(saveStats).toHaveBeenCalled();
  });

  it('should reset stats', () => {
    const { result } = renderHook(() => useGameStats(null, Array(9).fill(null)));
    
    act(() => {
      result.current.resetStats();
    });
    
    expect(result.current.stats).toEqual(INITIAL_STATS);
  });
});

