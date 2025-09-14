import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profileData: null, // initial profile data state
  },
  reducers: {
    setProfile: (state, action) => {
      state.profileData = action.payload;
    },
    clearProfile: (state) => {
      state.profileData = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export const selectProfile = (state) => state.profile.profileData;

export default profileSlice.reducer;