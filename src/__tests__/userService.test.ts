import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fetchUsers, fetchUserById } from '../services/userService';

const mockUsers = [
  { id: "1", personalDetails: { firstName: 'John', lastName: 'Doe' }, email: 'john@example.com' },
  { id: "2", personalDetails: { firstName: 'Jane', lastName: 'Doe' }, email: 'jane@example.com' },
];

describe('UserService', () => {
  beforeEach(() => {
    localStorage.clear();
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('positive scenario: fetches users successfully and caches in localStorage', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    const users = await fetchUsers();
    expect(users.length).toBe(2);
    expect(users[0].id).toBe("1");
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);

    // Check caching
    const cached = localStorage.getItem('lendsqr_users');
    expect(cached).toBeDefined();
    expect(JSON.parse(cached!)).toEqual(mockUsers);
  });

  it('positive scenario: fetches from localStorage if already cached', async () => {
    localStorage.setItem('lendsqr_users', JSON.stringify(mockUsers));
    
    const users = await fetchUsers();
    expect(users.length).toBe(2);
    expect(globalThis.fetch).not.toHaveBeenCalled(); // Shouldn't fetch via network
  });

  it('negative scenario: handles fetch error gracefully', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
    });

    const users = await fetchUsers();
    expect(users).toEqual([]);
    expect(localStorage.getItem('lendsqr_users')).toBeNull();
  });

  it('positive scenario: fetchUserById finds user and caches specifically', async () => {
    localStorage.setItem('lendsqr_users', JSON.stringify(mockUsers));
    
    const user = await fetchUserById("1");
    expect(user).toBeTruthy();
    expect(user?.email).toBe('john@example.com');
    
    // Should cache specifically for user details page requirement
    const specificCache = localStorage.getItem('lendsqr_selected_user');
    expect(specificCache).toBeTruthy();
    expect(JSON.parse(specificCache!).id).toBe("1");
  });

  it('negative scenario: fetchUserById returns null for non-existent user', async () => {
    localStorage.setItem('lendsqr_users', JSON.stringify(mockUsers));
    
    const user = await fetchUserById("999");
    expect(user).toBeNull();
  });
});
