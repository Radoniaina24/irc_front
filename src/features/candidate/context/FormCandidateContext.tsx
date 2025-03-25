"use client";
import React, { createContext, useContext, useState } from "react";

// Définition des types
export interface Address {
  street: string;
  city: string;
  country: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  name: string;
  issuingOrganization: string;
  dateObtained: string;
}

export interface Language {
  language: string;
  proficiency: "Débutant" | "Intermédiaire" | "Avancé" | "Courant" | "Natif";
}

interface FormValues {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  address: Address;
  resume: File | null;
  skills: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  languages: Language[];
}

const FormPassContext = createContext<any | null>(null);
function FormPassProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormValues>({
    lastName: "",
    firstName: "",
    email: "",
    phone: "",
    address: { street: "", city: "", country: "" },
    resume: null,
    skills: [""],
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ],
    certifications: [{ name: "", issuingOrganization: "", dateObtained: "" }],
    languages: [{ language: "", proficiency: "Débutant" }],
  });
  console.log(formData);
  return (
    <FormPassContext.Provider
      value={{
        step,
        setStep,
        formData,
        setFormData,
      }}
    >
      {children}
    </FormPassContext.Provider>
  );
}

function useFormPassContext() {
  const context = useContext(FormPassContext);
  if (context === undefined)
    throw new Error(
      "FormCandidateContext was used outside the LanguageProvider"
    );
  return context;
}
export { FormPassProvider, useFormPassContext };
