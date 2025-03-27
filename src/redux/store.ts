import { configureStore } from "@reduxjs/toolkit";
import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { recruiterAPI } from "@/lib/api/recruiterApi";
import { authAPI } from "@/lib/api/authApi";
import { authReducer } from "./features/auth/authSlice";
import { sectorAPI } from "@/lib/api/sectorApi";
import { categoryAPI } from "@/lib/api/categoryApi";
import { jobAPI } from "@/lib/api/jobApi";
import { candidateAPI } from "@/lib/api/candidateApi";
import { educationAPI } from "@/lib/api/educationApi";
import { experienceAPI } from "@/lib/api/experienceApi";
import { certificationAPI } from "@/lib/api/certificationApi";
import { portfolioAPI } from "@/lib/api/portfolioApi";
import { skilleAPI } from "@/lib/api/skillsApi";
import { languageAPI } from "@/lib/api/languageApi";

export const store = configureStore({
  reducer: {
    authReducer,
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
    [recruiterAPI.reducerPath]: recruiterAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [sectorAPI.reducerPath]: sectorAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [jobAPI.reducerPath]: jobAPI.reducer,
    [candidateAPI.reducerPath]: candidateAPI.reducer,
    [educationAPI.reducerPath]: educationAPI.reducer,
    [experienceAPI.reducerPath]: experienceAPI.reducer,
    [certificationAPI.reducerPath]: certificationAPI.reducer,
    [portfolioAPI.reducerPath]: portfolioAPI.reducer,
    [skilleAPI.reducerPath]: skilleAPI.reducer,
    [languageAPI.reducerPath]: languageAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      recruiterAPI.middleware,
      authAPI.middleware,
      sectorAPI.middleware,
      categoryAPI.middleware,
      jobAPI.middleware,
      candidateAPI.middleware,
      educationAPI.middleware,
      experienceAPI.middleware,
      certificationAPI.middleware,
      portfolioAPI.middleware,
      skilleAPI.middleware,
      languageAPI.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
