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
    <div className="min-h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="  w-full max-w-md p-8">
        <h1 className="text-center text-2xl font-bold text-slate-800 mb-6">
          🔒 Change your password
        </h1>

        <form
          onSubmit={formik.handleSubmit}
          autoComplete="off"
          className="space-y-5"
        >
          <InputField
            type="password"
            label="Old Password"
            name="oldPassword"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            placeholder="Enter your current password"
            required
          />

          <InputField
            type="password"
            label="New Password"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            placeholder="Choose a new password"
            required
          />

          <InputField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            placeholder="Re-enter new password"
            required
          />

          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`w-full flex items-center justify-center gap-2 font-semibold py-2.5 px-4 rounded-lg transition duration-200 ${
              formik.isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {formik.isSubmitting ? (
              <div className="flex gap-3 justify-center items-center">
                Changing
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
