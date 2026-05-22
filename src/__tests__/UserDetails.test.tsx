import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UserDetails from '../pages/UserDetails';
import { fetchUserById } from '../services/userService';

vi.mock('../services/userService', () => ({
  fetchUserById: vi.fn()
}));

const mockUser = {
  id: "1",
  organization: "Lendsqr",
  username: "john_doe",
  email: "john@example.com",
  phone: "1234567890",
  dateJoined: "2023-01-01T00:00:00.000Z",
  status: "Active",
  personalDetails: {
    firstName: "John",
    lastName: "Doe",
    bvn: "123",
    gender: "Male",
    maritalStatus: "Single",
    children: 0,
    typeOfResidence: "Apartment"
  },
  educationAndEmployment: {
    level: "BSc",
    employmentStatus: "Employed",
    sector: "IT",
    duration: "2 years",
    officeEmail: "john@work.com",
    monthlyIncome: ["1000", "2000"],
    loanRepayment: "500"
  },
  socials: {
    twitter: "@john",
    facebook: "john.doe",
    instagram: "@john.doe"
  },
  guarantor: {
    firstName: "Jane",
    lastName: "Doe",
    phone: "0987654321",
    email: "jane@example.com",
    relationship: "Sister"
  },
  bankDetails: {
    bank: "GTB",
    accountBalance: "10000",
    accountNumber: "1234567890"
  }
};

describe('UserDetails Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (fetchUserById as any).mockReturnValue(new Promise(() => {})); // pending promise
    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading user details...')).toBeInTheDocument();
  });

  it('renders user not found if user is null', async () => {
    (fetchUserById as any).mockResolvedValue(null);
    render(
      <MemoryRouter initialEntries={['/users/999']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument();
    });
  });

  it('renders user details correctly', async () => {
    (fetchUserById as any).mockResolvedValue(mockUser);
    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading user details...')).not.toBeInTheDocument();
    });

    // We can use generic text search to ensure properties are rendered
    expect(screen.getAllByText('John Doe').length).toBeGreaterThan(0); // Full Name (appears in personal details and profile card)
    expect(screen.getAllByText('john@example.com').length).toBeGreaterThan(0); // Email
    expect(screen.getByText('BSc')).toBeInTheDocument(); // Education level
    expect(screen.getByText('@john')).toBeInTheDocument(); // Twitter
    expect(screen.getByText('Sister')).toBeInTheDocument(); // Guarantor relationship
  });
});
