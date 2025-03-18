"use client";

import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { authAPI, useGetUserQuery } from "@/lib/api/authApi";
import { logout, setUser } from "./features/auth/authSlice";
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await store.dispatch(
          authAPI.endpoints.getUser.initiate("")
        );
        if ("data" in response) {
          store.dispatch(setUser(response.data)); // ✅ Mise à jour correcte du store
        } else {
          store.dispatch(logout()); // Déconnexion si le token est invalide
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
        store.dispatch(logout());
      }
    };

    fetchUser();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
