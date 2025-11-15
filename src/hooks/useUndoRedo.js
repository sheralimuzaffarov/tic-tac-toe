import { useEffect } from 'react';

/**
 * Custom hook for undo/redo keyboard shortcuts
 */
export function useUndoRedo({ currentMove, historyLength, onUndo, onRedo }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        onUndo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        onRedo();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentMove, historyLength, onUndo, onRedo]);
}

