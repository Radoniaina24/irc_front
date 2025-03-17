"use client";
import {
  ToastNotification,
  typeNotification,
} from "@/components/Toast/ToastNotification";
import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarContextType {
  showSnackbar: (message: string, type?: typeNotification) => void;
}
const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);
interface SnackbarProviderProps {
  children: ReactNode;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: typeNotification; // error | success
  }>({
    message: "",
    open: false,
    type: "success",
  });

  const showSnackbar = (
    message: string,
    type: typeNotification = "success",
  ) => {
    setSnackbar({ open: true, message, type });
  };
  const handleClose = () => {
    setSnackbar({ open: false, message: "", type: "success" });
  };
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar.open && (
        <ToastNotification
          message={snackbar.message}
          type={snackbar.type}
          autoHideDuration={6000}
          onClose={handleClose}
        />
      )}
    </SnackbarContext.Provider>
  );
};
export function useSnackbar(): SnackbarContextType {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}
export default SnackbarProvider;
