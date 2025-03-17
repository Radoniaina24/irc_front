import { authAPI } from "@/lib/api/authApi";
import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  role: string;
  // Ajoutez d'autres propriétés selon votre modèle utilisateur
}
interface AuthState {
  user: User | null;
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      Cookies.remove("refreshToken"); // Supprime le token lors de la déconnexion
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authAPI.endpoints.getUser.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.isAuthenticated = true;
        }
      )
      .addMatcher(authAPI.endpoints.getUser.matchRejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        Cookies.remove("refreshToken"); // Supprime le token si invalide
      });
  },
});
export const { setUser, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.authReducer.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.isAuthenticated;
export const authReducer = authSlice.reducer;

// Fonction pour récupérer l'utilisateur à partir du cookie et initialiser l'état Redux
// export const initializeAuth = () => async (dispatch: any) => {
//   const token = Cookies.get("refreshToken");
//   if (token) {
//     try {
//       const response = await dispatch(authAPI.endpoints.getUser.initiate(""));
//       if (response?.data) {
//         dispatch(setUser(response.data));
//       }
//     } catch (error) {
//       console.error("Échec de l'initialisation de l'authentification", error);
//       dispatch(logout());
//     }
//   }
// };
