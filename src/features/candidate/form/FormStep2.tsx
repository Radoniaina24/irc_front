"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Education, useFormPassContext } from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import { IoIosAddCircleOutline } from "react-icons/io";
export default function FormStep2() {
  const { setStep, setFormData, formData } = useFormPassContext();

  const formik = useFormik({
    initialValues: { education: formData.education as Education[] },
    validationSchema: Yup.object({
      education: Yup.array().min(1, "You must add at least one training"),
    }),
    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep(2); // Passer à l'étape suivante
    },
  });

  const handleAddEducation = () => {
    formik.setFieldValue("education", [
      ...formik.values.education,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    formik.setFieldValue(
      "education",
      formik.values.education.filter((_, i) => i !== index)
    );
  };

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
        {formik.values.education.length === 0 && (
          <p className="text-center py-30 text-red-500">
            You must add at least one training
          </p>
        )}
        {formik.values.education.map((_, index) => (
          <div key={index} className="my-4 p-4 border rounded-md">
            <h1 className="text-black py-2">Education {index + 1}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Institution"
                type="text"
                name={`education.${index}.institution`}
                placeholder="E-media Madagascar"
                value={formik.values.education[index].institution}
                onChange={formik.handleChange}
                required
              />
              <InputField
                label="Degree"
                type="text"
                name={`education.${index}.degree`}
                placeholder="Ex: Master en Informatique"
                value={formik.values.education[index].degree}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Start Date"
                type="date"
                name={`education.${index}.startDate`}
                value={formik.values.education[index].startDate}
                onChange={formik.handleChange}
                required
              />
              <InputField
                label="End Date"
                type="date"
                name={`education.${index}.endDate`}
                value={formik.values.education[index].endDate}
                onChange={formik.handleChange}
                required
              />
            </div>
            <InputField
              label="Field Of Study"
              type="text"
              name={`education.${index}.fieldOfStudy`}
              placeholder="Ex: Développement Web"
              value={formik.values.education[index].fieldOfStudy}
              onChange={formik.handleChange}
              required
            />
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
            onClick={() => setStep(0)}
          >
            Previous
          </button>
          <button
            type="submit"
            disabled={formik.values.education.length === 0}
            className="rounded-full bg-blue  px-6 py-2 text-sm text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {"Next"}
          </button>
        </div>
      </form>
    </div>
  );
}
