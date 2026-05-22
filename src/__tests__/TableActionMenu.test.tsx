import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import TableActionMenu from '../components/TableActionMenu';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('TableActionMenu', () => {
  it('renders correctly and handles view details click', () => {
    const onClose = vi.fn();
    render(
      <BrowserRouter>
        <TableActionMenu userId="123" onClose={onClose} />
      </BrowserRouter>
    );

    const viewDetailsBtn = screen.getByRole('button', { name: /View Details/i });
    expect(viewDetailsBtn).toBeInTheDocument();
    
    fireEvent.click(viewDetailsBtn);
    expect(mockedNavigate).toHaveBeenCalledWith('/users/123');
    expect(onClose).toHaveBeenCalled();
  });

  it('handles blacklist user click', () => {
    const onClose = vi.fn();
    render(
      <BrowserRouter>
        <TableActionMenu userId="123" onClose={onClose} />
      </BrowserRouter>
    );

    const blacklistBtn = screen.getByRole('button', { name: /Blacklist User/i });
    expect(blacklistBtn).toBeInTheDocument();
    
    fireEvent.click(blacklistBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it('handles activate user click', () => {
    const onClose = vi.fn();
    render(
      <BrowserRouter>
        <TableActionMenu userId="123" onClose={onClose} />
      </BrowserRouter>
    );

    const activateBtn = screen.getByRole('button', { name: /Activate User/i });
    expect(activateBtn).toBeInTheDocument();
    
    fireEvent.click(activateBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
