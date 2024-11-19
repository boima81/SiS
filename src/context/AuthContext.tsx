import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  role: 'student' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call with test credentials
    if (email === 'student@test.com' && password === 'student123') {
      const userData = {
        email,
        role: 'student',
        name: 'John Student'
      } as User;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } else if (email === 'admin@test.com' && password === 'admin123') {
      const userData = {
        email,
        role: 'admin',
        name: 'Admin User'
      } as User;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}