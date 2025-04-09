import React, { useState } from "react";
import { useFormik } from "formik";
import { MdEditNote } from "react-icons/md";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";

import { useUpdateJobByAdminMutation } from "@/lib/api/jobApi";
import Modal from "./Modal";
import SelectInput from "@/features/admin/job/SelectInput";
import { useUpdateApplicationMutation } from "@/lib/api/applicationApi";

export default function EditButton({ id, job }: { id: string; job: any }) {
  const initialvalues = {
    permissions: job.status,
  };
  //   console.log(id);
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [updateJobPost] = useUpdateApplicationMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      // console.log(values);
      try {
        const response = await updateJobPost({
          obj: { status: values.permissions },
          id: id,
        }).unwrap();
        showToast(response?.message, "success"); // message, type(error, success)
        resetForm();
        setOpen(false);
      } catch (error: any) {
        if (error?.data?.message) {
          showToast(error?.data?.message, "error");
          setOpen(false);
          resetForm();
        } else {
          setOpen(false);
          showToast("Check your network", "error");
          resetForm();
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  //   ["pending", "reviewed", "accepted", "rejected"],
  const permission = [
    { id: 1, value: "pending", name: "pending" },
    { id: 2, value: "reviewed", name: "reviewed" },
    { id: 3, value: "accepted", name: "accepted" },
    { id: 4, value: "rejected", name: "rejected" },
  ];
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <MdEditNote size={20} className="text-blue-500" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className=" p-6  w-full lg:max-w-4xl max-w-lg md:max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <SelectInput
              label="Published"
              id="permissions"
              value={formik.values.permissions}
              onChange={formik.handleChange}
              options={permission}
              optionsLabel=""
            />
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className={`w-full flex justify-center font-medium mt-5 bg-dark text-white  py-2 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5${
                formik.isSubmitting
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-dark"
              }`}
            >
              {formik.isSubmitting ? (
                <>
                  Edit...
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                "Edit "
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
