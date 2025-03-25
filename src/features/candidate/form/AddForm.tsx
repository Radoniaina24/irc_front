import React from "react";
import { useFormPassContext } from "../context/FormCandidateContext";
import FormStep1 from "./FormStep1";
import { motion } from "framer-motion";

export default function AddForm() {
  const steps = [
    "Personal Information",
    "Professional Experience",
    "CV and Skills",
    " Portfolio and Languages",
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
    </div>
  );
}
