import { configureStore } from "@reduxjs/toolkit";
import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { recruiterAPI } from "@/lib/api/recruiterApi";
import { authAPI } from "@/lib/api/authApi";
import { authReducer } from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    authReducer,
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    productDetailsReducer,
    [recruiterAPI.reducerPath]: recruiterAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      recruiterAPI.middleware,
      authAPI.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
