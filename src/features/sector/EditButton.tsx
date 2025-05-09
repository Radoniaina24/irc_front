"use client";
import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { useUpdateSectorMutation } from "@/lib/api/sectorApi";
import { useToast } from "@/lib/context/ToastContext";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditButton({ id, name }: { id: string; name: any }) {
  const [open, setOpen] = useState<boolean>(false);
  const [updateSector] = useUpdateSectorMutation();

  // console.log(data);
  const { showToast } = useToast();
  const initialValues = useMemo(() => ({ name }), [name]);
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const name = values;
      try {
        const response = await updateSector({ name, id }).unwrap();
        showToast(response?.message, "success"); // message, type(error, success)
        setOpen(false);
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
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <MdEditNote size={20} className="text-blue-500" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className="mt-10">
          {" "}
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            className="flex"
          >
            <label htmlFor="name" className="sr-only">
              Search
            </label>
            <div className="w-full relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 p-2 rounded-lg text-gray-900 text-sm w-full block dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white focus:border-blue-500 ps-10"
                placeholder="Edit sector..."
                required
              />
            </div>
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className={`p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none     ${
                formik.isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-dark"
              }`}
            >
              {formik.isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                <MdEditNote size={18} />
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
