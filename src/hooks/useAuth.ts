// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define a type for your MongoDB User document
interface User {
  id: string;
  email: string;
  name?: string;
}

export function useAuth() {
  const [current, setCurrent] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getCurrentUser = async () => {
    try {
      const res = await fetch('/api/auth/me'); // Your endpoint to check session
      if (res.ok) {
        const user = await res.json();
        setCurrent(user);
      } else {
        setCurrent(null);
      }
    } catch (error) {
      setCurrent(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (res.ok) {
      await login(email, password);
    } else {
      throw new Error('Registration failed');
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      await getCurrentUser();
      router.push('/');
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = async (): Promise<void> => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrent(null);
    router.push('/login');
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return {
    current,
    loading,
    login,
    logout,
    register,
  };
}