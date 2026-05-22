import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Stats from '../components/Stats';

describe('Stats', () => {
  it('renders all stat cards correctly', () => {
    const totalUsers = 500;
    render(<Stats totalUsers={totalUsers} />);

    // Check if the titles are present
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Users with Loans')).toBeInTheDocument();
    expect(screen.getByText('Users with Savings')).toBeInTheDocument();

    // Check if formatted values are present
    expect(screen.getByText('500')).toBeInTheDocument(); // totalUsers
    expect(screen.getByText('2,453')).toBeInTheDocument();
    expect(screen.getByText('12,453')).toBeInTheDocument();
    expect(screen.getByText('102,453')).toBeInTheDocument();
  });
});
