import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { useToast } from "@/lib/context/ToastContext";
import Modal from "./Modal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Portfolio } from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import { Loader2, Pencil } from "lucide-react";
import * as Yup from "yup";
import {
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
} from "@/lib/api/portfolioApi";
import TextArea from "../form/TextArea";
import MultiValueInput from "@/features/job/MultiValueInput";
import InputFile from "../form/InputFile";
// const initialvalues: Portfolio = {
//   file: "",
//   title: "",
//   role: "",
//   description: "",
//   skills: [],
//   link: "",
// };

export default function EditPortfolio({ portfolio }: { portfolio: Portfolio }) {
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [editPortfolio] = useUpdatePortfolioMutation();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const resetFileInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };
  const formik = useFormik({
    initialValues: portfolio,
    enableReinitialize: true,
    validationSchema: Yup.object({
      skills: Yup.array()
        .of(
          Yup.string()
            .trim()
            .min(2, "Each skill must have at least 2 characters")
            .max(20, "Each skill cannot exceed 20 characters")
        )
        .min(1, "Please add at least one skill")
        .max(5, "You can only add up to 5 skills"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]: any) => {
        if (value !== undefined && value !== "") {
          if (Array.isArray(value)) {
            // Ajout des éléments du tableau individuellement sous le même key
            value.forEach((item) => formData.append(`${key}[]`, item));
          } else {
            formData.append(key, value instanceof File ? value : String(value));
          }
        }
      });
      // console.log(values);
      try {
        const response = await editPortfolio({
          portfolio: formData,
          id: portfolio._id,
        }).unwrap();
        showToast("Edit successfully", "success"); // message, type(error, success)
        resetForm();
        resetFileInput();
        setOpen(false);
      } catch (error: any) {
        if (error?.data?.message) {
          showToast(error?.data?.message, "error");
          setOpen(false);
        } else {
          setOpen(false);
          showToast("Check your network", "error");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div>
      <div>
        <button
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
          onClick={() => setOpen(true)}
        >
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="pt-5">
          <h1 className="text-center text-lg py-5 font-semibold">
            Edit portfolio
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="Project title"
              type="text"
              name={`title`}
              placeholder="Enter a brief but descriptive title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
            <InputField
              label="Your role"
              type="text"
              name={`role`}
              placeholder="e.g: Front-end"
              value={formik.values.role}
              onChange={formik.handleChange}
              required
            />
          </div>
          <InputField
            label="web link to an article or website"
            type="text"
            name={`link`}
            placeholder="Article or website link"
            value={formik.values.link}
            onChange={formik.handleChange}
            required
          />
          <TextArea
            label="Project description"
            id={`description`}
            placeholder="Enter your description"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
          />
          <div className="mt-2">
            <MultiValueInput
              label={"Skills"}
              name={"skills"}
              values={formik.values.skills}
              onChange={(newValues) =>
                formik.setFieldValue("skills", newValues)
              }
              touched={formik.touched.skills}
              error={formik.errors.skills}
            />
          </div>
          <InputFile
            inputRef={inputFileRef}
            label={"File"}
            setFieldValue={formik.setFieldValue}
            name={`file`}
            touched={formik.touched.file}
            error={formik.errors.file}
            requir={false}
          />
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`w-full flex justify-center font-medium mt-5 bg-dark text-white  py-2 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5${
              formik.isSubmitting ? "cursor-not-allowed bg-gray-400" : "bg-dark"
            }`}
          >
            {formik.isSubmitting ? (
              <div className="flex items-center gap-3">
                Edit
                <Loader2 className="h-5 w-5  animate-spin" />
              </div>
            ) : (
              "Edit"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}
