import { render, screen, fireEvent } from '@testing-library/react';
import GameControls from '../GameControls';

describe('GameControls', () => {
  const mockOnUndo = jest.fn();
  const mockOnRedo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render undo and redo buttons', () => {
    render(
      <GameControls 
        onUndo={mockOnUndo}
        onRedo={mockOnRedo}
        canUndo={true}
        canRedo={true}
      />
    );
    
    expect(screen.getByText('↶ Undo')).toBeInTheDocument();
    expect(screen.getByText('↷ Redo')).toBeInTheDocument();
  });

  it('should call onUndo when undo button is clicked', () => {
    render(
      <GameControls 
        onUndo={mockOnUndo}
        onRedo={mockOnRedo}
        canUndo={true}
        canRedo={true}
      />
    );
    
    const undoButton = screen.getByText('↶ Undo');
    fireEvent.click(undoButton);
    
    expect(mockOnUndo).toHaveBeenCalledTimes(1);
  });

  it('should call onRedo when redo button is clicked', () => {
    render(
      <GameControls 
        onUndo={mockOnUndo}
        onRedo={mockOnRedo}
        canUndo={true}
        canRedo={true}
      />
    );
    
    const redoButton = screen.getByText('↷ Redo');
    fireEvent.click(redoButton);
    
    expect(mockOnRedo).toHaveBeenCalledTimes(1);
  });

  it('should disable undo button when canUndo is false', () => {
    render(
      <GameControls 
        onUndo={mockOnUndo}
        onRedo={mockOnRedo}
        canUndo={false}
        canRedo={true}
      />
    );
    
    const undoButton = screen.getByText('↶ Undo');
    expect(undoButton).toBeDisabled();
  });

  it('should disable redo button when canRedo is false', () => {
    render(
      <GameControls 
        onUndo={mockOnUndo}
        onRedo={mockOnRedo}
        canUndo={true}
        canRedo={false}
      />
    );
    
    const redoButton = screen.getByText('↷ Redo');
    expect(redoButton).toBeDisabled();
  });

  it('should not call handlers when buttons are disabled', () => {
    render(
      <GameControls 
        onUndo={mockOnUndo}
        onRedo={mockOnRedo}
        canUndo={false}
        canRedo={false}
      />
    );
    
    const undoButton = screen.getByText('↶ Undo');
    const redoButton = screen.getByText('↷ Redo');
    
    fireEvent.click(undoButton);
    fireEvent.click(redoButton);
    
    expect(mockOnUndo).not.toHaveBeenCalled();
    expect(mockOnRedo).not.toHaveBeenCalled();
  });
});

