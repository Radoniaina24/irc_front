"use client";
import { selectIsAuthenticated } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin"); // Redirection si non connecté
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null;
};
export default AuthGuard;
