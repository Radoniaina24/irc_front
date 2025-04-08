import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import Modal from "./Modal";

import CoverLetterInput from "./CoverLetterInput";
import FileInput from "./FileInput";
import { useAddApplicationMutation } from "@/lib/api/applicationApi";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const initialvalues = {
  coverLetter: "",
  file: "",
};
export default function AddJobApplication({
  id,
  permission,
}: {
  id: string;
  permission: any;
}) {
  // console.log(permission?.permissions);
  const [open, setOpen] = useState<boolean>(false);
  const [applyJob] = useAddApplicationMutation();
  const { showToast } = useToast();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const resetFileInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      coverLetter: Yup.string()
        .required(
          "This field is required. Please provide a detailed cover letter that reflects your experience, skills, and motivation for the position. A well-written cover letter is essential for evaluating your application and its relevance to the position."
        )
        .min(
          300,
          "The cover letter must be at least 300 characters long. Please elaborate on your experience and professional goals."
        ),

      file: Yup.string().required("This file  is required"),
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
      try {
        // console.log(id);
        const response = await applyJob({ data: formData, id: id }).unwrap();
        showToast(response?.message, "success"); // message, type(error, success)
        resetForm();
        setOpen(false);
        resetFileInput();
      } catch (error: any) {
        if (error?.data?.message) {
          showToast(error?.data?.message, "error");
          setOpen(false);
          resetForm();
          resetFileInput();
        } else {
          setOpen(false);
          showToast("Check your network", "error");
          resetForm();
          resetFileInput();
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  // console.log(id);
  const router = useRouter();
  const user: any = useSelector(selectUser);
  function check() {
    const role = user?.user?.role || user?.role;
    // console.log(role);
    if (role === "candidate") {
      if (permission?.permissions !== "Allowed") {
        return showToast(
          "You are not approved by IRC. Please complete your profile",
          "error"
        ); // message, type(error, success)
      } else {
        return setOpen(true);
      }
    }
    return router.push("/signup-candidate");
  }

  return (
    <div>
      <div className="absolute bottom-5 right-5 gap-2">
        <button
          className="bg-blue-600 text-white font-semibold px-4 py-2 text-sm rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          onClick={() => check()}
        >
          Apply
        </button>
      </div>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <div className="my-5">
            {/* Lettre de motivation */}
            <label className="block text-sm my-3 text-black">
              Cover letter
            </label>
            <CoverLetterInput
              value={formik.values.coverLetter}
              onChange={(content) =>
                formik.setFieldValue("coverLetter", content)
              }
            />
            {formik.touched.coverLetter && formik.errors.coverLetter && (
              <p className="text-red-500 text-sm mt-3">
                {formik.errors.coverLetter}
              </p>
            )}
          </div>
          {/* CV */}
          <FileInput
            inputRef={inputFileRef}
            label={"CV"}
            setFieldValue={formik.setFieldValue}
            name={`file`}
            touched={formik.touched.file}
            error={formik.errors.file}
            requir={true}
          />
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`w-full flex justify-center font-medium mt-5 bg-dark text-white  py-2 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5${
              formik.isSubmitting ? "cursor-not-allowed bg-gray-400" : "bg-dark"
            }`}
          >
            {formik.isSubmitting ? (
              <div className="flex items-center gap-3 cursor-not-allowed ">
                Apply
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              "Apply"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}
