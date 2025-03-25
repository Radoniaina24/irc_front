"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import TextInput from "@/components/Input/TextInput";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Recruiter } from "@/types/recruiter";
import { useToast } from "@/lib/context/ToastContext";
import { useAddRecruiterMutation } from "@/lib/api/recruiterApi";
import { Loader2 } from "lucide-react";
import { useFormPassContext } from "../context/FormCandidateContext";
import { useAddCandidateMutation } from "@/lib/api/candidateApi";
const initialvalues: Recruiter = {
  lastName: "",
  firstName: "",
  email: "",
  companyName: "",
  password: "",
  re_type_password: "",
};
const FormStep7 = () => {
  const { showToast } = useToast();
  const [addCandidate] = useAddCandidateMutation();
  const { setStep, setFormData, formData } = useFormPassContext();
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      re_type_password: Yup.string().required("Re-type Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setFormData((prev) => ({ ...prev, password: values.password }));
      setSubmitting(true);
      if (values.password !== values.re_type_password) {
        showToast("Passwords don't match", "error");
        setSubmitting(false); // arrêter la soumission du formulaire
        return;
      }

      try {
        const response = await addCandidate(formData).unwrap();
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

  return (
    <>
      <section className="overflow-hidden  ">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[800px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="mt-5.5">
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <TextInput
                  type="password"
                  label={"Password"}
                  name={"password"}
                  placeholder="Enter your password"
                  required={true}
                  onChange={formik.handleChange}
                  error={formik.errors.password}
                  touched={formik.touched.password}
                  value={formik.values.password}
                />
                <TextInput
                  type="password"
                  label={"Re-type Password"}
                  name={"re_type_password"}
                  placeholder="Re-type your password"
                  required={true}
                  onChange={formik.handleChange}
                  error={formik.errors.re_type_password}
                  touched={formik.touched.re_type_password}
                  value={formik.values.re_type_password}
                />

                <div className=" bg-white flex justify-between ">
                  <button
                    type="button"
                    className="rounded-full bg-gray-300 px-6 py-2 text-sm hover:bg-gray-400 hover:text-white"
                    onClick={() => setStep(5)}
                  >
                    Previous
                  </button>
                  <button
                    disabled={formik.isSubmitting}
                    type="submit"
                    className="rounded-full bg-dark hover:bg-blue px-6 py-2 text-sm text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {formik.isSubmitting ? <>Submit ...</> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormStep7;
