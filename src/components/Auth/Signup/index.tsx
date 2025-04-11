"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import TextInput from "@/components/Input/TextInput";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import { Candidate } from "@/types/Candidate";
import { useAddCandidateMutation } from "@/lib/api/candidateApi";
const initialvalues: Candidate = {
  lastName: "",
  firstName: "",
  email: "",
  password: "",
  re_type_password: "",
};
const SignupCandidate = () => {
  const { showToast } = useToast();
  const [addCandidate] = useAddCandidateMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      lastName: Yup.string().required("Last name is required"),
      firstName: Yup.string().required("First name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),

      re_type_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .min(6, "Confirm Password must be at least 6 characters long"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      if (values.password !== values.re_type_password) {
        showToast("Passwords don't match", "error");
        setSubmitting(false); // arrêter la soumission du formulaire
        return;
      }
      const newRecruiter = {
        lastName: values.lastName,
        firstName: values.firstName,
        email: values.email,
        password: values.password,
      };
      try {
        const response = await addCandidate(newRecruiter).unwrap();
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
  // console.log(formik.values);
  return (
    <>
      <Breadcrumb title={"Signup"} pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[800px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account <br />
                Candidate
              </h2>
            </div>

            <div className="mt-5.5">
              <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <TextInput
                    onChange={formik.handleChange}
                    label={"Last name"}
                    name={"lastName"}
                    placeholder="Enter your last name"
                    required={true}
                    error={formik.errors.lastName}
                    touched={formik.touched.lastName}
                    value={formik.values.lastName}
                  />
                  <TextInput
                    label={"First name"}
                    name={"firstName"}
                    placeholder="Enter your first name"
                    required={true}
                    onChange={formik.handleChange}
                    error={formik.errors.firstName}
                    touched={formik.touched.firstName}
                    value={formik.values.firstName}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                  <TextInput
                    type="email"
                    label={"Email Address"}
                    name={"email"}
                    placeholder="Enter your email address"
                    required={true}
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                    value={formik.values.email}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                </div>

                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className={`w-full flex justify-center font-medium bg-dark text-white  py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5${
                    formik.isSubmitting
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-dark"
                  }`}
                >
                  {formik.isSubmitting ? (
                    <>
                      Create Account
                      <Loader2 className="h-5 w-5 ms-2 animate-spin" />
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <p className="text-center mt-6">
                  Already have an account?
                  <Link
                    href="/signin"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    Sign in Now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupCandidate;
