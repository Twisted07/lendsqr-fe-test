import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
  });

  test('negative scenario: prevents submission without email', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const submitBtn = screen.getByRole('button', { name: /Log in/i });
    
    // Attempting to submit without filling required fields
    fireEvent.click(submitBtn);
    
    // Navigate should not be called
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  test('positive scenario: successful login navigates to dashboard/users', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitBtn = screen.getByRole('button', { name: /Log in/i });

    fireEvent.change(emailInput, { target: { value: 'test@lendsqr.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.submit(submitBtn);

    expect(mockedNavigate).toHaveBeenCalledWith('/users');
  });

  test('toggles password visibility', () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const toggleBtn = screen.getByText(/SHOW/i);

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');
    expect(screen.getByText(/HIDE/i)).toBeInTheDocument();
  });
});
