"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Experience,
  Language,
  useFormPassContext,
} from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import TextArea from "./TextArea";
import { IoIosAddCircleOutline } from "react-icons/io";
import SelectInput from "@/features/job/SelectInput";
export default function FormStep5() {
  const { setStep, setFormData, formData } = useFormPassContext();

  const formik = useFormik({
    initialValues: { languages: formData.languages as Language[] },

    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep(5); // Passer à l'étape suivante
    },
  });

  const handleAddEducation = () => {
    formik.setFieldValue("languages", [
      ...formik.values.languages,
      {
        language: "",
        proficiency: "Débutant",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    formik.setFieldValue(
      "languages",
      formik.values.languages.filter((_, i) => i !== index)
    );
  };
  const languageLevels = [
    { id: 1, value: "Beginner", name: "Beginner" },
    { id: 2, value: "Intermediate", name: "Intermediate" },
    { id: 3, value: "Advanced", name: "Advanced" },
    { id: 4, value: "Fluent", name: "Fluent" },
    { id: 5, value: "Native", name: "Native" },
  ];
  return (
    <div className="max-h-[60vh] overflow-y-auto p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="sticky z-999999 top-0 bg-transparent p-4 flex justify-end ">
          <IoIosAddCircleOutline
            size={30}
            className="text-white bg-blue rounded-full cursor-pointer"
            onClick={handleAddEducation}
          />
        </div>
        {formik.values.languages.length === 0 && (
          <p className="text-center py-30 text-red-500">Add languages</p>
        )}
        {formik.values.languages.map((_, index) => (
          <div key={index} className="my-4 p-4 border rounded-md">
            <h1 className="text-black py-2">Language {index + 1}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center ">
              <InputField
                label="Name"
                type="language"
                name={`languages.${index}.language`}
                value={formik.values.languages[index].language}
                onChange={formik.handleChange}
                required
              />
              <SelectInput
                label="Level"
                id={`languages.${index}.proficiency`}
                value={formik.values.languages[index].proficiency}
                onChange={formik.handleChange}
                options={languageLevels}
                optionsLabel="Please select a level"
              />
            </div>
            <button
              type="button"
              className="mt-3 bg-red-500 text-white px-6 py-2 text-sm rounded-full"
              onClick={() => handleRemoveEducation(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <div className="sticky bottom-0 bg-white p-4 flex justify-between border-t">
          <button
            type="button"
            className="rounded-full bg-gray-300 px-6 py-2 text-sm hover:bg-gray-400 hover:text-white"
            onClick={() => setStep(3)}
          >
            Previous
          </button>
          <button
            disabled={formik.values.languages.length === 0}
            type="submit"
            className="rounded-full bg-blue  px-6 py-2 text-sm text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {"Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
