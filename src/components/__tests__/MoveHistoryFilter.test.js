import { render, screen, fireEvent } from '@testing-library/react';
import MoveHistoryFilter from '../MoveHistoryFilter';

describe('MoveHistoryFilter', () => {
  const mockOnFilterPlayerChange = jest.fn();
  const mockOnSearchQueryChange = jest.fn();
  const mockOnToggleOrder = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter controls', () => {
    render(
      <MoveHistoryFilter
        filterPlayer={null}
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={true}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    expect(screen.getByText('Filter Moves')).toBeInTheDocument();
    expect(screen.getByText('Filter by Player')).toBeInTheDocument();
    expect(screen.getByText('Search by Location')).toBeInTheDocument();
  });

  it('should render player filter buttons', () => {
    render(
      <MoveHistoryFilter
        filterPlayer={null}
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={true}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
  });

  it('should call onFilterPlayerChange when player button is clicked', () => {
    render(
      <MoveHistoryFilter
        filterPlayer={null}
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={true}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    const xButton = screen.getByText('X');
    fireEvent.click(xButton);
    
    expect(mockOnFilterPlayerChange).toHaveBeenCalledWith('X');
  });

  it('should call onFilterPlayerChange with null when All is clicked', () => {
    render(
      <MoveHistoryFilter
        filterPlayer="X"
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={true}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    const allButton = screen.getByText('All');
    fireEvent.click(allButton);
    
    expect(mockOnFilterPlayerChange).toHaveBeenCalledWith(null);
  });

  it('should update search query on input change', () => {
    render(
      <MoveHistoryFilter
        filterPlayer={null}
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={true}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    const input = screen.getByPlaceholderText(/e.g., \(0,0\)/i);
    fireEvent.change(input, { target: { value: '0,0' } });
    
    expect(mockOnSearchQueryChange).toHaveBeenCalledWith('0,0');
  });

  it('should call onToggleOrder when sort button is clicked', () => {
    render(
      <MoveHistoryFilter
        filterPlayer={null}
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={true}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    const sortButton = screen.getByTitle('Toggle sort order');
    fireEvent.click(sortButton);
    
    expect(mockOnToggleOrder).toHaveBeenCalledTimes(1);
  });

  it('should show correct sort button text for ascending', () => {
    render(
      <MoveHistoryFilter
        filterPlayer={null}
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={true}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    expect(screen.getByText('⬇️ Desc')).toBeInTheDocument();
  });

  it('should show correct sort button text for descending', () => {
    render(
      <MoveHistoryFilter
        filterPlayer={null}
        onFilterPlayerChange={mockOnFilterPlayerChange}
        searchQuery=""
        onSearchQueryChange={mockOnSearchQueryChange}
        isAscending={false}
        onToggleOrder={mockOnToggleOrder}
      />
    );
    
    expect(screen.getByText('⬆️ Asc')).toBeInTheDocument();
  });
});

