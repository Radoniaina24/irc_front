"use client";
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext<any | null>(null);
function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en");
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined)
    throw new Error("LanguageContext was used outside the LanguageProvider");
  return context;
}
export { LanguageProvider, useLanguageContext };
