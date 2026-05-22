import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Table from '../components/Table';
import type { User } from '../services/userService';

const mockUsers: User[] = [
  {
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
  }
];

describe('Table Component', () => {
  it('renders loading state correctly', () => {
    render(
      <BrowserRouter>
        <Table loading={true} users={[]} />
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders users correctly when not loading', () => {
    render(
      <BrowserRouter>
        <Table loading={false} users={mockUsers} />
      </BrowserRouter>
    );

    expect(screen.getByText('Lendsqr')).toBeInTheDocument();
    expect(screen.getByText('john_doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('toggles filter dropdown when filter icon is clicked', () => {
    render(
      <BrowserRouter>
        <Table loading={false} users={mockUsers} />
      </BrowserRouter>
    );

    const organizationHeaderFilter = screen.getByText('ORGANIZATION');
    fireEvent.click(organizationHeaderFilter);

    // The TableFilter component should now be rendered.
    // TableFilter contains a "Filter" button and "Organization" text.
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();

    // Clicking it again should close the filter
    fireEvent.click(organizationHeaderFilter);
    expect(screen.queryByRole('button', { name: 'Filter' })).not.toBeInTheDocument();
  });

  it('toggles action menu when action button is clicked', () => {
    render(
      <BrowserRouter>
        <Table loading={false} users={mockUsers} />
      </BrowserRouter>
    );

    // Click on the action button in the row
    // It's the button containing the MoreVertical icon. We can find it by its generic class or just the button.
    const actionBtn = screen.getAllByRole('button')[0]; 
    fireEvent.click(actionBtn);

    // Now the TableActionMenu should be rendered
    expect(screen.getByText('View Details')).toBeInTheDocument();

    // Clicking it again should close it
    fireEvent.click(actionBtn);
    expect(screen.queryByText('View Details')).not.toBeInTheDocument();
  });
});
