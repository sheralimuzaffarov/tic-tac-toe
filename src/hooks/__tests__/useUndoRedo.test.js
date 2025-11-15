import { renderHook } from '@testing-library/react';
import { useUndoRedo } from '../useUndoRedo';

describe('useUndoRedo', () => {
  let mockOnUndo;
  let mockOnRedo;

  beforeEach(() => {
    mockOnUndo = jest.fn();
    mockOnRedo = jest.fn();
    jest.clearAllMocks();
  });

  it('should call onUndo when Ctrl+Z is pressed', () => {
    renderHook(() => useUndoRedo({
      currentMove: 1,
      historyLength: 3,
      onUndo: mockOnUndo,
      onRedo: mockOnRedo
    }));

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnUndo).toHaveBeenCalledTimes(1);
  });

  it('should call onRedo when Ctrl+Y is pressed', () => {
    renderHook(() => useUndoRedo({
      currentMove: 1,
      historyLength: 3,
      onUndo: mockOnUndo,
      onRedo: mockOnRedo
    }));

    const event = new KeyboardEvent('keydown', {
      key: 'y',
      ctrlKey: true,
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnRedo).toHaveBeenCalledTimes(1);
  });

  it('should call onRedo when Ctrl+Shift+Z is pressed', () => {
    renderHook(() => useUndoRedo({
      currentMove: 1,
      historyLength: 3,
      onUndo: mockOnUndo,
      onRedo: mockOnRedo
    }));

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
      shiftKey: true,
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnRedo).toHaveBeenCalledTimes(1);
  });

  it('should not call handlers for non-undo/redo keys', () => {
    renderHook(() => useUndoRedo({
      currentMove: 1,
      historyLength: 3,
      onUndo: mockOnUndo,
      onRedo: mockOnRedo
    }));

    const event = new KeyboardEvent('keydown', {
      key: 'a',
      ctrlKey: true,
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    expect(mockOnUndo).not.toHaveBeenCalled();
    expect(mockOnRedo).not.toHaveBeenCalled();
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useUndoRedo({
      currentMove: 1,
      historyLength: 3,
      onUndo: mockOnUndo,
      onRedo: mockOnRedo
    }));

    unmount();

    const event = new KeyboardEvent('keydown', {
      key: 'z',
      ctrlKey: true,
      bubbles: true
    });
    
    window.dispatchEvent(event);
    
    // Should not be called after unmount
    expect(mockOnUndo).not.toHaveBeenCalled();
  });
});

