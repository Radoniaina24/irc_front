"use client";
import React, { createContext, useContext, useState } from "react";

// Définition des types
export interface Address {
  street: string;
  city: string;
  country: string;
}
export interface Experience {
  _id?: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Certification {
  _id?: string;
  name: string;
  issuingOrganization: string;
  dateObtained: string;
}

export interface Language {
  _id?: string;
  language: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Fluent" | "Native";
}

export interface Portfolio {
  _id?: string;
  title: string;
  role: string;
  description: string;
  skills: string[];
  file: string;
  link: string;
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
  portfolio: Portfolio[];
  password: string;
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
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    languages: [],
    resume: null,
    portfolio: [],
    password: "",
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
