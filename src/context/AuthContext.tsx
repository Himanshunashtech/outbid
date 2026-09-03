import React, { createContext, useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { initAuthSession, loginWithGoogleThunk, logoutThunk, updateProfileThunk, setUser } from '../store/authSlice';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  demoLogin: (email?: string, name?: string) => void;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Initial fetch of session from Supabase
    dispatch(initAuthSession());

    // Listen for realtime OAuth state changes
    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
          dispatch(initAuthSession());
        } else if (event === 'SIGNED_OUT') {
          dispatch(setUser(null));
        } else if (session?.user) {
          dispatch(initAuthSession());
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [dispatch]);

  const loginWithGoogle = async () => {
    await dispatch(loginWithGoogleThunk());
  };

  const demoLogin = (email = 'founder@outbid.lol', name = 'Demo Founder') => {
    const demoUser: UserProfile = {
      id: 'usr_demo_founder',
      email,
      name,
      avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(email)}`,
      totalSpent: 0,
      activeClaimsCount: 0,
    };
    dispatch(setUser(demoUser));
  };

  const logout = async () => {
    await dispatch(logoutThunk());
    dispatch(setUser(null));
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    await dispatch(updateProfileThunk(updates));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        demoLogin,
        logout,
        updateProfile,
        isConfigured: isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
