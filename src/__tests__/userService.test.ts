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

  it('positive scenario: fetches users successfully without pagination', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    const result = await fetchUsers();
    expect(result.users.length).toBe(2);
    expect(result.users[0].id).toBe("1");
    expect(result.total).toBe(2);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('positive scenario: fetches users successfully with pagination and caches', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    const result = await fetchUsers(1);
    expect(result.users.length).toBe(2);
    
    // Check caching
    const cached = localStorage.getItem('lendsqr_users_1');
    expect(cached).toBeDefined();
    expect(JSON.parse(cached!)).toEqual({ users: mockUsers, total: 2 });
  });

  it('positive scenario: fetches from localStorage if already cached', async () => {
    localStorage.setItem('lendsqr_users_1', JSON.stringify({ users: mockUsers, total: 2 }));
    
    const result = await fetchUsers(1);
    expect(result.users.length).toBe(2);
    expect(globalThis.fetch).not.toHaveBeenCalled(); // Shouldn't fetch via network
  });

  it('negative scenario: handles fetch error gracefully', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: false,
    });

    const result = await fetchUsers();
    expect(result).toEqual({ users: [], total: 0 });
  });

  it('positive scenario: fetchUserById finds user and caches specifically', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });
    
    const user = await fetchUserById("1");
    expect(user).toBeTruthy();
    expect(user?.email).toBe('john@example.com');
    
    // Should cache specifically for user details page requirement
    const specificCache = localStorage.getItem('lendsqr_selected_user_1');
    expect(specificCache).toBeTruthy();
    expect(JSON.parse(specificCache!).id).toBe("1");
  });

  it('negative scenario: fetchUserById returns null for non-existent user', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });
    
    const user = await fetchUserById("999");
    expect(user).toBeNull();
  });
});
