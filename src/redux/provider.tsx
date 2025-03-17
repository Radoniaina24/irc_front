"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { authAPI } from "@/lib/api/authApi";
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(authAPI.endpoints.getUser.initiate("")); // ✅ Utilisation de `store.dispatch`
  }, []);
  return <Provider store={store}>{children}</Provider>;
}
