"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Address, useFormPassContext } from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import InputPhone from "./InputPhone";
export default function FormStep1() {
  const { setStep, setFormData, step, formData } = useFormPassContext();
  const initialvalues = {
    lastName: formData.lastName as string,
    firstName: formData.firstName as string,
    email: formData.email as string,
    phone: formData.phone as string,
    address: formData.address as Address,
  };

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone number is required")
        .test("Invalid phone number", (value) =>
          value ? isValidPhoneNumber(value) : false
        ),
    }),
    onSubmit: (values) => {
      // console.log(values);
      // console.log("Form Submitted", values);
      setFormData((prev) => ({ ...prev, ...values }));
      setStep(1);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4"
      autoComplete="off"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputField
          label={"Last name"}
          type="text"
          name="lastName"
          placeholder={""}
          value={formik.values.lastName}
          onChange={formik.handleChange}
          required
        />
        <InputField
          label={"First name"}
          type="text"
          name="firstName"
          placeholder={""}
          value={formik.values.firstName}
          onChange={formik.handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputField
          label="Work email address"
          type="text"
          name="email"
          placeholder=""
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
        <InputField
          label="Address"
          type="text"
          name="address.street"
          placeholder=""
          value={formik.values.address.street}
          onChange={formik.handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputField
          label="City"
          type="text"
          name="address.city"
          placeholder=""
          value={formik.values.address.city}
          onChange={formik.handleChange}
          required
        />
        <InputField
          label="Country"
          type="text"
          name="address.country"
          placeholder=""
          value={formik.values.address.country}
          onChange={formik.handleChange}
          required
        />
      </div>
      <InputPhone
        name="phone"
        label={"Phone number"}
        value={formik.values.phone}
        onChange={formik.setFieldValue}
        error={formik.errors.phone}
        touched={formik.touched.phone}
        setFieldTouched={formik.setFieldTouched}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-full bg-blue  px-6 py-2 text-sm text-white "
        >
          {"Next"}
        </button>
      </div>
    </form>
  );
}
