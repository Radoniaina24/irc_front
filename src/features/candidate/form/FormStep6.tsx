"use client";

import React, { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Portfolio, useFormPassContext } from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import { IoIosAddCircleOutline } from "react-icons/io";
import InputFile from "./InputFile";
import InputFilePdf from "./InputFilePdf";

export default function FormStep6() {
  const { setStep, setFormData, formData } = useFormPassContext();
  const formik = useFormik({
    initialValues: {
      resume: formData.resume as string,
      portfolio: formData.portfolio as Portfolio[],
    },
    validationSchema: Yup.object({
      resume: Yup.string().required("This CV is required"),
    }),

    onSubmit: (values) => {
      setFormData((prev) => ({ ...prev, ...values }));
      setStep(6); // Passer à l'étape suivante
    },
  });

  const handleAddEducation = () => {
    formik.setFieldValue("portfolio", [
      ...formik.values.portfolio,
      {
        language: "",
        proficiency: "Débutant",
      },
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    formik.setFieldValue(
      "portfolio",
      formik.values.portfolio.filter((_, i) => i !== index)
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
        {formik.values.portfolio.length === 0 && (
          <p className="text-center py-30 text-red-500">Add portfolio</p>
        )}
        <InputFilePdf
          label={"Curriculum Vitae"}
          setFieldValue={formik.setFieldValue}
          name="resume"
          error={formik.errors.resume}
          touched={formik.touched.resume}
        />
        {formik.values.portfolio.map((_, index) => (
          <div key={index} className="my-4 p-4 border rounded-md">
            <h1 className="text-black py-2">Portfolio {index + 1}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
            <div className="grid grid-cols-1 ">
              {/* <InputField
                label="Lien"
                type="texte"
                name={`portfolio.${index}.url`}
                value={formik.values.portfolio[index].url}
                onChange={formik.handleChange}
              />
              <InputFile
                label={"File"}
                setFieldValue={formik.setFieldValue}
                name={`portfolio.${index}.file`}
                required
              /> */}
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
            onClick={() => setStep(4)}
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
