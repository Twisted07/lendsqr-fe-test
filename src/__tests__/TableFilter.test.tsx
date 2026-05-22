import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import TableFilter from '../components/TableFilter';

describe('TableFilter', () => {
  it('renders all form fields correctly', () => {
    const onClose = vi.fn();
    render(<TableFilter onClose={onClose} />);

    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument();
  });

  it('calls onClose when reset is clicked', () => {
    const onClose = vi.fn();
    render(<TableFilter onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /Reset/i }));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when form is submitted (Filter clicked)', () => {
    const onClose = vi.fn();
    render(<TableFilter onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /Filter/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
