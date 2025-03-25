"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Experience,
  useFormPassContext,
} from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import TextArea from "./TextArea";
import { IoIosAddCircleOutline } from "react-icons/io";
export default function FormStep3() {
  const { setStep, setFormData, formData } = useFormPassContext();

  const formik = useFormik({
    initialValues: { experience: formData.experience as Experience[] },

    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep(3); // Passer à l'étape suivante
    },
  });

  const handleAddEducation = () => {
    formik.setFieldValue("experience", [
      ...formik.values.experience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    formik.setFieldValue(
      "experience",
      formik.values.experience.filter((_, i) => i !== index)
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
        {formik.values.experience.length === 0 && (
          <p className="text-center py-30 text-red-500">Add experience</p>
        )}
        {formik.values.experience.map((_, index) => (
          <div key={index} className="my-4 p-4 border rounded-md">
            <h1 className="text-black py-2">Experience {index + 1}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Company"
                type="text"
                name={`experience.${index}.company`}
                placeholder=""
                value={formik.values.experience[index].company}
                onChange={formik.handleChange}
                required
              />
              <InputField
                label="Position"
                type="text"
                name={`experience.${index}.position`}
                placeholder=""
                value={formik.values.experience[index].position}
                onChange={formik.handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                label="Start Date"
                type="date"
                name={`experience.${index}.startDate`}
                value={formik.values.experience[index].startDate}
                onChange={formik.handleChange}
                required
              />
              <InputField
                label="End Date"
                type="date"
                name={`experience.${index}.endDate`}
                value={formik.values.experience[index].endDate}
                onChange={formik.handleChange}
                required
              />
            </div>

            <TextArea
              id={`experience.${index}.description`}
              label="Description"
              value={formik.values.experience[index].description}
              onChange={formik.handleChange}
              placeholder="Description"
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
            onClick={() => setStep(1)}
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
