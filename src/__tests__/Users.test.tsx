import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Users from '../pages/Users';
import { fetchUsers } from '../services/userService';

vi.mock('../services/userService', () => ({
  fetchUsers: vi.fn()
}));

const mockUsersData = {
  users: [
    {
      id: "1",
      organization: "Lendsqr",
      username: "john_doe",
      email: "john@example.com",
      phone: "1234567890",
      dateJoined: "2023-01-01T00:00:00.000Z",
      status: "Active",
      personalDetails: { firstName: 'John', lastName: 'Doe' },
      educationAndEmployment: { monthlyIncome: ['10', '20'], loanRepayment: '5' },
      socials: { twitter: '', facebook: '', instagram: '' },
      guarantor: { firstName: '', lastName: '', phone: '', email: '', relationship: '' },
      bankDetails: { bank: '', accountBalance: '', accountNumber: '' }
    }
  ],
  total: 20
};

describe('Users Page', () => {
  beforeEach(() => {
    (fetchUsers as any).mockResolvedValue(mockUsersData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders loading state initially then displays data', async () => {
    render(<BrowserRouter><Users /></BrowserRouter>);
    
    // Check loading indicator (in Table it shows 'Loading...')
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getAllByText('Users').length).toBeGreaterThan(0); // Title
    expect(screen.getByText('john_doe')).toBeInTheDocument(); // Table row
    expect(screen.getByText('20')).toBeInTheDocument(); // Stats (Users count is set to totalUsers which is 20)
  });

  it('handles pagination interaction', async () => {
    render(<BrowserRouter><Users /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Pagination buttons are present
    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    // After clicking page 2, fetchUsers should be called again with page 2
    await waitFor(() => {
      expect(fetchUsers).toHaveBeenCalledWith(2);
    }, { timeout: 2000 });
  });
});
