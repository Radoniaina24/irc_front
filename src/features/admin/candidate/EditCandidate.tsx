import React, { useState } from "react";
import { useFormik } from "formik";
import { MdEditNote } from "react-icons/md";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import Modal from "./Modal";
import SelectInput from "./SelectInput";
import { useUpdateCandidateMutation } from "@/lib/api/candidateApi";

export default function Editcandidate({
  candidate,
  id,
}: {
  candidate: any;
  id: string;
}) {
  //   console.log(candidate);
  const initialvalues = {
    permissions: candidate?.permissions,
  };
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [updateCandidate] = useUpdateCandidateMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      // console.log(values);
      const permissions = values.permissions;
      try {
        const response = await updateCandidate({
          obj: { permissions: values.permissions },
          id: candidate._id,
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

  const permission = [
    { id: 1, value: "Pending", name: "Pending" },
    { id: 2, value: "Allowed", name: "Allowed" },
    { id: 3, value: "Denied", name: "Denied" },
  ];
  //   console.log(formik.values.permissions);
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <MdEditNote size={20} className="text-blue-500" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className=" p-6  w-full lg:max-w-4xl max-w-lg md:max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <SelectInput
              label="Authorization"
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
