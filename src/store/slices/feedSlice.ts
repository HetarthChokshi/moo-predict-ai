import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { FeedProfile } from '../../types';
import { APIService } from '../../services/api';

export interface FeedState {
  profiles: FeedProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  profiles: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchFeedProfiles = createAsyncThunk(
  'feed/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      return await APIService.getFeedProfiles();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch feed profiles');
    }
  }
);

export const createFeedProfile = createAsyncThunk(
  'feed/createProfile',
  async (profileData: Omit<FeedProfile, 'id'>, { rejectWithValue }) => {
    try {
      return await APIService.createFeedProfile(profileData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create feed profile');
    }
  }
);

export const updateFeedProfile = createAsyncThunk(
  'feed/updateProfile',
  async ({ id, data }: { id: string; data: Partial<FeedProfile> }, { rejectWithValue }) => {
    try {
      return await APIService.updateFeedProfile(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update feed profile');
    }
  }
);

export const deleteFeedProfile = createAsyncThunk(
  'feed/deleteProfile',
  async (id: string, { rejectWithValue }) => {
    try {
      await APIService.deleteFeedProfile(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete feed profile');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch feed profiles
      .addCase(fetchFeedProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchFeedProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create feed profile
      .addCase(createFeedProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      
      // Update feed profile
      .addCase(updateFeedProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      
      // Delete feed profile
      .addCase(deleteFeedProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter(profile => profile.id !== action.payload);
      });
  },
});

export const { clearError } = feedSlice.actions;
export default feedSlice.reducer;