import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SidebarFooter from '../components/SidebarFooter';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('SidebarFooter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('isAuthenticated', 'true');
  });

  test('logout clears session and navigates to login', () => {
    const removeItemSpy = vi.spyOn(localStorage, 'removeItem');

    render(
      <BrowserRouter>
        <SidebarFooter />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Logout/i }));

    expect(removeItemSpy).toHaveBeenCalledWith('isAuthenticated');
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
    expect(mockedNavigate).toHaveBeenCalledWith('/login');

    removeItemSpy.mockRestore();
  });
});
