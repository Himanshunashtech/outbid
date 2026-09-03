import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../services/supabase';
import type { UserProfile } from '../types';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

// Async thunk to initialize & sync auth session from Supabase
export const initAuthSession = createAsyncThunk<UserProfile | null, void, { rejectValue: string }>(
  'auth/initSession',
  async (_, { rejectWithValue }) => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (!session?.user) return null;

      const authUser = session.user;

      // Try fetching profile from profiles table
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();

        if (profile) {
          return {
            id: profile.id,
            email: profile.email || authUser.email || '',
            name: profile.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Founder',
            avatarUrl: profile.avatar_url || authUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/identicon/svg?seed=${authUser.id}`,
            totalSpent: Number(profile.total_spent) || 0,
            activeClaimsCount: Number(profile.active_claims_count) || 0,
          } as UserProfile;
        }
      } catch {
        // Fallback to auth metadata
      }

      return {
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Founder',
        avatarUrl: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || `https://api.dicebear.com/7.x/identicon/svg?seed=${authUser.id}`,
        totalSpent: 0,
        activeClaimsCount: 0,
      } as UserProfile;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to initialize session');
    }
  }
);

// Async thunk for Google Login via Supabase OAuth
export const loginWithGoogleThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to login with Google');
    }
  }
);

// Async thunk for Sign Out
export const logoutThunk = createAsyncThunk<void, void>('auth/logout', async () => {
  await supabase.auth.signOut();
});

// Async thunk to update profile
export const updateProfileThunk = createAsyncThunk<UserProfile, Partial<UserProfile>, { rejectValue: string }>(
  'auth/updateProfile',
  async (updates: Partial<UserProfile>, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      if (!state.auth.user) throw new Error('Not authenticated');

      const updatedUser = { ...state.auth.user, ...updates };

      await supabase
        .from('profiles')
        .upsert({
          id: updatedUser.id,
          email: updatedUser.email,
          full_name: updatedUser.name,
          avatar_url: updatedUser.avatarUrl,
          total_spent: updatedUser.totalSpent,
          active_claims_count: updatedUser.activeClaimsCount,
          updated_at: new Date().toISOString(),
        });

      return updatedUser;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to update profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuthSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAuthSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(initAuthSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to initialize session';
      })
      .addCase(loginWithGoogleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogleThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginWithGoogleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to login with Google';
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
