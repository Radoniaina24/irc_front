import React, { useState } from "react";
import { useFormik } from "formik";
import { useToast } from "@/lib/context/ToastContext";
import Modal from "./Modal";
import { Education } from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import { Loader2, Pencil } from "lucide-react";
import * as Yup from "yup";
import { useUpdateEducationMutation } from "@/lib/api/educationApi";
import dayjs from "dayjs";

export default function EditEducation({ education }: { education: Education }) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("YYYY-MM-DD");
  };
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [editEducation] = useUpdateEducationMutation();
  const formik = useFormik({
    initialValues: {
      ...education,
      startDate: formatDate(education.startDate),
      endDate: formatDate(education.endDate),
    },
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
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        await editEducation({ education: values, id: education._id }).unwrap();
        showToast("Edit successfully", "success"); // message, type(error, success)
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
            Edit education
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
