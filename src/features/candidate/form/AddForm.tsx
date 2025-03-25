import React from "react";
import { useFormPassContext } from "../context/FormCandidateContext";
import FormStep1 from "./FormStep1";
import { motion } from "framer-motion";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import FormStep5 from "./FormStep5";
import FormStep6 from "./FormStep6";
import FormStep7 from "./FormStep7";

export default function AddForm() {
  const steps = [
    "Personal Information",
    "Educations ",
    "Professional Experience",
    "Certification and Skills",
    "Languages",
    "CV and Portfolio",
    "Password and Confirmation",
  ];
  const { step } = useFormPassContext();
  return (
    <div className=" mx-auto max-w-c-1016 rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6">
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-3 rounded-full bg-blue"
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / 7) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="my-5 text-center text-xl font-bold  text-primary">
          {steps[step]}
        </p>
      </div>
      {step === 0 && <FormStep1 />}
      {step === 1 && <FormStep2 />}
      {step === 2 && <FormStep3 />}
      {step === 3 && <FormStep4 />}
      {step === 4 && <FormStep5 />}
      {step === 5 && <FormStep6 />}
      {step === 6 && <FormStep7 />}
    </div>
  );
}
