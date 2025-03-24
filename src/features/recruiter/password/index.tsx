"use client";
import React from "react";
import InputField from "../../job/InputField";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import { useChangePasswordMutation } from "@/lib/api/recruiterApi";
const initialvalues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};
export default function ChangePassword() {
  const { showToast } = useToast();
  const [changePass] = useChangePasswordMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      console.log(values);
      try {
        if (values.confirmPassword !== values.newPassword) {
          showToast("New password and confirm password don't match", "error");
          return;
        }
        const response = await changePass(values).unwrap();
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
    <div className="p-5">
      <h1 className="text-center font-bold text-lg mb-5">Change password</h1>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <InputField
          type="password"
          label="Old Password"
          name="oldPassword"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          placeholder=""
          required
        />
        <InputField
          type="password"
          label="New Password"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          placeholder=""
          required
        />
        <InputField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          placeholder=""
          required
        />
        <button
          disabled={formik.isSubmitting}
          type="submit"
          className={`w-full flex justify-center font-medium mt-5 bg-dark text-white  py-2 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5${
            formik.isSubmitting ? "cursor-not-allowed bg-gray-400" : "bg-dark"
          }`}
        >
          {formik.isSubmitting ? (
            <>
              Change password...
              <Loader2 className="h-5 w-5 animate-spin" />
            </>
          ) : (
            "Change password"
          )}
        </button>
      </form>
    </div>
  );
}
