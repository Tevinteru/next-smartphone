import { create } from 'zustand';

interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateUser: (id: number, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  fetchUsers: async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    set({ users: data });
  },
  addUser: async (user) => {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const newUser = await res.json();
    set((state) => ({ users: [...state.users, newUser] }));
  },
  updateUser: async (id, data) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to update user: ${res.statusText}`);
      }
  
      const updatedUser = await res.json();
      if (updatedUser) {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? updatedUser : u)),
        }));
      } else {
        throw new Error('No data returned from server');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  },
  
  deleteUser: async (id) => {
    await fetch('/api/admin/users', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    }));
  },
}));
