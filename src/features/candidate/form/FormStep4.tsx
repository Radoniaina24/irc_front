"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Certification,
  Experience,
  useFormPassContext,
} from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";

import MultiValueInput from "@/features/job/MultiValueInput";
import { IoIosAddCircleOutline } from "react-icons/io";
export default function FormStep3() {
  const { setStep, setFormData, formData } = useFormPassContext();

  const formik = useFormik({
    initialValues: {
      certifications: formData.certifications as Certification[],
      skills: formData.skills as string[],
    },
    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep(4); // Passer à l'étape suivante
    },
  });
  const handleAddEducation = () => {
    formik.setFieldValue("certifications", [
      ...formik.values.certifications,
      {
        name: "",
        issuingOrganization: "",
        dateObtained: "",
      },
    ]);
  };
  const handleRemoveEducation = (index: number) => {
    formik.setFieldValue(
      "certifications",
      formik.values.certifications.filter((_, i) => i !== index)
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
        <MultiValueInput
          label={"Skills"}
          name={"skills"}
          values={formik.values.skills}
          onChange={(newValues) => formik.setFieldValue("skills", newValues)}
        />
        {formik.values.certifications.length === 0 && (
          <p className="text-center py-30 text-red-500">Add certifications</p>
        )}

        {formik.values.certifications.map((_, index) => (
          <div key={index} className="my-4 p-4 border rounded-md">
            <h1 className="text-black py-2">Certification {index + 1}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Name"
                type="text"
                name={`certifications.${index}.name`}
                placeholder=""
                value={formik.values.certifications[index].name}
                onChange={formik.handleChange}
                required
              />
              <InputField
                label="Issuing Organization"
                type="text"
                name={`certifications.${index}.issuingOrganization`}
                placeholder=""
                value={formik.values.certifications[index].issuingOrganization}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1gap-3">
              <InputField
                label="Date Obtained"
                type="date"
                name={`certifications.${index}.dateObtained`}
                value={formik.values.certifications[index].dateObtained}
                onChange={formik.handleChange}
                required
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
            onClick={() => setStep(2)}
          >
            Previous
          </button>
          <button
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
