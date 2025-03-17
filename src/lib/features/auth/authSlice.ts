import { authAPI } from "@/lib/api/authApi";
import { RootState } from "./../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authAPI.endpoints.getUser.matchFulfilled, // ✅ Ajout du Matcher correctement
        (state, { payload }) => {
          state.user = payload;
          state.isAuthenticated = true;
        },
      )
      .addMatcher(
        authAPI.endpoints.getUser.matchRejected, // ❌ Token expiré ou invalide
        (state, action) => {
          if (action.error) {
            state.user = null;
            state.isAuthenticated = false;
          }
        },
      );
  },
});

export const { setUser, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const authReducer = authSlice.reducer;
