import { authAPI } from "@/lib/api/authApi";
import { RootState } from "../../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { recruiterAPI } from "@/lib/api/recruiterApi";
import { jobAPI } from "@/lib/api/jobApi";
import { certificationAPI } from "@/lib/api/certificationApi";
import { experienceAPI } from "@/lib/api/experienceApi";
import { educationAPI } from "@/lib/api/educationApi";
import { languageAPI } from "@/lib/api/languageApi";
import { skilleAPI } from "@/lib/api/skillsApi";
import { portfolioAPI } from "@/lib/api/portfolioApi";

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
  role: string;
}
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  role: "",
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
      recruiterAPI.util.resetApiState();
      jobAPI.util.resetApiState(); // Réinitialiser RTK Query
      authAPI.util.resetApiState(); // Réinitialiser RTK Query
      certificationAPI.util.resetApiState();
      experienceAPI.util.resetApiState();
      educationAPI.util.resetApiState();
      languageAPI.util.resetApiState();
      skilleAPI.util.resetApiState();
      portfolioAPI.util.resetApiState();
    },
  },
  extraReducers: (builder) => {
    builder
      // Quand l'utilisateur se connecte, on met à jour le state
      .addMatcher(authAPI.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      // Quand l'utilisateur se déconnecte, on vide le state
      .addMatcher(authAPI.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});
export const { setUser, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.authReducer.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.authReducer.isAuthenticated;
export const authReducer = authSlice.reducer;
