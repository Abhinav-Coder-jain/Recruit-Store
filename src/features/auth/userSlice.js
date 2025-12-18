import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action: Start loading (e.g., during login)
    authStart: (state) => {
      state.loading = true;
      state.error = null;
      console.log('User Slice: Auth process started...');
    },
    // Action: Login successful
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      console.log('User Slice: Auth successful. User set:', action.payload);
    },
    // Action: Login failed
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error('User Slice: Auth failed. Error:', action.payload);
    },
    // Action: Logout
    logoutUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      console.log('User Slice: User logged out.');
    },
    // Action: Update Wallet Balance
    updateWallet: (state, action) => {
      if (state.user) {
        console.log(`User Slice: Updating wallet. Old: ${state.user.walletBalance}, New: ${action.payload}`);
        state.user.walletBalance = action.payload;
      }
    },

    // Action: Toggle Subscription
    setSubscriptionStatus: (state, action) => {
      if (state.user) {
        console.log(`User Slice: Subscription status changed to ${action.payload}`);
        state.user.isSubscribed = action.payload;
      }
    },
    syncUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  },
});

export const { 
  authStart, 
  authSuccess, 
  authFailure, 
  logoutUser, 
  updateWallet, 
  setSubscriptionStatus,
  syncUserProfile
} = userSlice.actions;

export default userSlice.reducer;