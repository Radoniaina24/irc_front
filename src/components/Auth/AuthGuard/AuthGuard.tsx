"use client";
import { useGetUserQuery, useRefreshTokenQuery } from "@/lib/api/authApi";
import { useEffect } from "react";

import PreLoader from "@/components/Common/PreLoader";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  setUser,
} from "@/redux/features/auth/authSlice";
const AuthGuard = ({ children }) => {
  const { data, error, isLoading } = useGetUserQuery("");
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  useEffect(() => {
    if (data) {
      // Si le refresh token est valide, mettre à jour le store avec le nouveau access token
      // Vous pouvez stocker l'access token dans le Redux store ou dans localStorage
      dispatch(setUser(data.user));
    }
    if (error) {
      // Redirige les utilisateurs non authentifiés vers la page de connexion
      router.replace("/signin");
    }
  }, [data, dispatch, error, router]);

  if (isLoading) {
    return <PreLoader />;
  }
  if (!isAuth) return;
  return <>{children}</>;
};
export default AuthGuard;
