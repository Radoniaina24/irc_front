import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/Input/TextInput";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import { useLoginMutation } from "@/lib/api/authApi";
import { useAddSectorMutation } from "@/lib/api/sectorApi";
import { IoMdAdd } from "react-icons/io";
const initialvalues = {
  name: "",
};
export default function AddSector() {
  const { showToast } = useToast();
  const [addSector] = useAddSectorMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const response = await addSector(values).unwrap();
        showToast(response?.message, "success"); // message, type(error, success)
        resetForm();
      } catch (error: any) {
        if (error?.data?.message) {
          showToast(error?.data?.message, "error");
        } else {
          showToast("Check your network", "error");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  const hashError = formik.touched.name && formik.errors.name;
  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off" className="flex ">
      <label htmlFor="name" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <input
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full ps-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add new sector..."
          required
        />
      </div>
      <button
        disabled={formik.isSubmitting}
        type="submit"
        className={`p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none     ${
          formik.isSubmitting ? "cursor-not-allowed bg-gray-400" : "bg-dark"
        }`}
      >
        {formik.isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
          </>
        ) : (
          <IoMdAdd size={18} />
        )}
      </button>
    </form>
  );
}
