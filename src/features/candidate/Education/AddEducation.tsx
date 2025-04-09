import React, { useState } from "react";
import { useFormik } from "formik";
import { useToast } from "@/lib/context/ToastContext";
import Modal from "./Modal";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Education } from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { useAddEducationMutation } from "@/lib/api/educationApi";
const initialvalues: Education = {
  institution: "",
  degree: "",
  startDate: "",
  fieldOfStudy: "",
  endDate: "",
};

export default function AddEducation() {
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [addEducation] = useAddEducationMutation();

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      endDate: Yup.date()
        .required("La date de fin est obligatoire")
        .test(
          "is-greater",
          "The end date must be later than the start date",
          function (value) {
            return new Date(this.parent.startDate) <= new Date(value);
          }
        ),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const response = await addEducation(values).unwrap();
        showToast("Add successfully", "success"); // message, type(error, success)
        resetForm();
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
        <IoIosAddCircleOutline
          onClick={() => setOpen(true)}
          size={30}
          className=" text-blue rounded-full cursor-pointer"
        />
      </div>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="pt-5">
          <h1 className="text-center text-lg py-5 font-semibold">
            Add education
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="School"
              type="text"
              name={`institution`}
              placeholder="Ex: University of mauritius"
              value={formik.values.institution}
              onChange={formik.handleChange}
              required
            />
            <InputField
              label="Degree"
              type="text"
              name={`degree`}
              placeholder="Ex: Master "
              value={formik.values.degree}
              onChange={formik.handleChange}
              required
            />
          </div>

          <InputField
            label="Area of Study "
            type="text"
            name={`fieldOfStudy`}
            placeholder="Ex: Computer Science"
            value={formik.values.fieldOfStudy}
            onChange={formik.handleChange}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="Start Date"
              type="date"
              name={`startDate`}
              value={formik.values.startDate}
              onChange={formik.handleChange}
              required
            />
            <InputField
              label="End Date"
              type="date"
              name={`endDate`}
              value={formik.values.endDate}
              onChange={formik.handleChange}
              error={formik.errors.endDate}
              touched={formik.touched.endDate}
              required
            />
          </div>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`w-full flex justify-center font-medium mt-5 bg-dark text-white  py-2 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5${
              formik.isSubmitting ? "cursor-not-allowed bg-gray-400" : "bg-dark"
            }`}
          >
            {formik.isSubmitting ? (
              <div className="flex items-center gap-3">
                Add
                <Loader2 className="h-5 w-5  animate-spin" />
              </div>
            ) : (
              "Add"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}
