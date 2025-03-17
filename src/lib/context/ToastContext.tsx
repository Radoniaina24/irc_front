import React, { createContext, useContext, ReactNode } from "react";
import { toast, Toaster, ToastOptions } from "react-hot-toast";

interface ToastContextType {
  showToast: (
    message: string,
    type?: "success" | "error" | "info",
    options?: ToastOptions
  ) => void;
}

// Création du contexte
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Provider du contexte
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
    options?: ToastOptions
  ) => {
    const toastOptions: ToastOptions = {
      duration: 3000,
      position: "bottom-center",
      style: { fontSize: "14px", padding: "10px 15px" },
      ...options,
    };

    switch (type) {
      case "success":
        toast.success(message, toastOptions);
        break;
      case "error":
        toast.error(message, toastOptions);
        break;
      default:
        toast(message, toastOptions);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toaster />
      {children}
    </ToastContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
