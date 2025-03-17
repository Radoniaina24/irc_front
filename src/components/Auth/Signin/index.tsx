"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/Input/TextInput";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import { useLoginMutation } from "@/lib/api/authApi";
import { useRouter } from "next/navigation";
const initialvalues = {
  email: "",
  password: "",
};

const Signin = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const [login] = useLoginMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const log = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await login(log).unwrap();
        // showToast(response?.message, "success"); // message, type(error, success)
        resetForm();
        router.push("/my-account");
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
      <Breadcrumb title={"Signin"} pages={["Signin"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Sign In to Your Account
              </h2>
            </div>

            <div>
              <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                      Sign in to account...
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </>
                  ) : (
                    "Sign in to account"
                  )}
                </button>

                <a
                  href="#"
                  className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
                >
                  Forget your password?
                </a>
                <div></div>
                <p className="text-center mt-6">
                  Don&apos;t have an account? Sign Up Now
                  <Link
                    href="/signup-candidate"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    Candidate |
                  </Link>
                  <Link
                    href="/signup-recruiter"
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                  >
                    Recruiter
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

export default Signin;
