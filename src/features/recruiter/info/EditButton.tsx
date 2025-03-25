import React, { useState } from "react";
import { useFormik } from "formik";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import InputField from "@/features/job/InputField";
import Modal from "./Modal";
import { useUpdateRecruiterMutation } from "@/lib/api/recruiterApi";
import { cpSync } from "node:fs";

export default function EditButton({
  id,
  recruiter,
}: {
  id: string;
  recruiter: any;
}) {
  // console.log(recruiter);
  const initialvalues = {
    firstName: recruiter?.user.firstName || "",
    lastName: recruiter?.user.lastName || "",
    phone: recruiter?.phone || "",
    func: recruiter?.function || "",
    companyName: recruiter?.companyName || "",
    industry: recruiter?.industry || "",
    address: recruiter?.address || "",
    city: recruiter?.city || "",
    country: recruiter?.country || "",
    website: recruiter?.website || "",
  };
  const [open, setOpen] = useState<boolean>(false);
  const [updateRecruiter] = useUpdateRecruiterMutation();
  const { showToast } = useToast();
  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const response = await updateRecruiter({
          recruiter: values,
        }).unwrap();
        showToast(response?.message, "success"); // message, type(error, success)
        resetForm();
        setOpen(false);
      } catch (error: any) {
        if (error?.data?.message) {
          showToast(error?.data?.message, "error");
          setOpen(false);
        } else {
          setOpen(false);
          showToast("Check your network", "error");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className="absolute bottom-6 right-6 bg-gray-800 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-700 transition"
      >
        ✏️ Edit
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full   mx-auto overflow-y-auto max-h-[80vh]">
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            className="text-black"
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                label="Company Name"
                name="companyName"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
              <InputField
                label="Function"
                name="func"
                value={formik.values.func}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
            </div>
            {/* <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                label="First name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
              <InputField
                label="Last name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
            </div> */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                label="Industry"
                name="industry"
                value={formik.values.industry}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
              <InputField
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
              <InputField
                label="Country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                label="Website"
                name="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                placeholder=""
              />
              <InputField
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder=""
                required
              />
            </div>
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
                "Edit"
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
