import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  const defaultProps = {
    page: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
    showEllipsis: true,
    pagesArray: [1, 2, 3],
  };

  it('renders correctly with given props', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByText(/Showing/i)).toBeInTheDocument();
    expect(screen.getByText(/out of 100/i)).toBeInTheDocument(); // totalPages * 10
    
    // Check pages array
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Check ellipsis and last pages
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    const prevBtn = buttons[0]; // Assuming first button is prev
    expect(prevBtn).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} page={10} pagesArray={[8, 9, 10]} showEllipsis={false} />);
    const buttons = screen.getAllByRole('button');
    const nextBtn = buttons[buttons.length - 1]; // Assuming last button is next
    expect(nextBtn).toBeDisabled();
  });

  it('calls onPageChange when a page number is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);
    
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
    
    fireEvent.click(screen.getByRole('button', { name: '10' }));
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  it('calls onPageChange when next button is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination {...defaultProps} page={2} onPageChange={onPageChange} />);
    
    const buttons = screen.getAllByRole('button');
    const nextBtn = buttons[buttons.length - 1];
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
