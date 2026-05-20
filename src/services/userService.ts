export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phone: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  personalDetails: {
    firstName: string;
    lastName: string;
    bvn: string;
    gender: string;
    maritalStatus: string;
    children: number;
    typeOfResidence: string;
  };
  educationAndEmployment: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    relationship: string;
  };
  bankDetails: {
    bank: string;
    accountBalance: string;
    accountNumber: string;
  };
}

export const fetchUsers = async (page?: number): Promise<{ users: User[], total: number }> => {
  // First, check if we have users cached in local storage
  const cachedUsers = localStorage.getItem('lendsqr_users_' + page);
  if (cachedUsers) {
    return JSON.parse(cachedUsers);
  }

  // If not, fetch from the mock JSON file and cache it
  try {
    // clear the cache to get rid of stale data
    localStorage.clear()

    const response = await fetch('/users.json');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users: User[] = await response.json();

    // chunk the data based on the page.
    if (page) {
      const pageSize = 10;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const totalUsers = users.length;
      const paginatedUsers = users.slice(startIndex, endIndex);

      localStorage.setItem('lendsqr_users_' + page, JSON.stringify({users: paginatedUsers, total: totalUsers}));
      return { users: paginatedUsers, total: totalUsers };
    }

    // If no pagination is required, return all data but don't cache
    return { users, total: users.length };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [], total: 0 };
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {  
  // Check cache for record
  const cachedSelected = localStorage.getItem('lendsqr_selected_user_' + id);
  if (cachedSelected) {
    const parsed = JSON.parse(cachedSelected);
    if (parsed.id === id) return parsed;
  }

  // If not in cache, fetch from API
  const {users} = await fetchUsers();
  const user = users.find(u => u.id === id);

  if (user) {
    localStorage.setItem('lendsqr_selected_user_' + id, JSON.stringify(user));
    return user;
  }


  return null;
};
