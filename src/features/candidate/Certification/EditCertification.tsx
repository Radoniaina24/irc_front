import React, { useState } from "react";
import { useFormik } from "formik";
import { useToast } from "@/lib/context/ToastContext";
import Modal from "./Modal";
import { Certification } from "../context/FormCandidateContext";
import InputField from "@/features/job/InputField";
import { Loader2, Pencil } from "lucide-react";
import * as Yup from "yup";
import { useUpdateCertificationMutation } from "@/lib/api/certificationApi";
import dayjs from "dayjs";
import TextArea from "../form/TextArea";
export default function EditCertification({
  certification,
}: {
  certification: Certification;
}) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("YYYY-MM-DD");
  };
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [editCertification] = useUpdateCertificationMutation();
  const formik = useFormik({
    initialValues: {
      ...certification,
      dateObtained: formatDate(certification.dateObtained),
    },
    validationSchema: Yup.object({}),
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        await editCertification({
          certification: values,
          id: certification._id,
        }).unwrap();
        showToast("Edit successfully", "success"); // message, type(error, success)
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
    <div>
      <div>
        <button
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
          onClick={() => setOpen(true)}
        >
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="pt-5">
          <h1 className="text-center text-lg py-5 font-semibold">
            Edit certification
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="Certificate"
              type="text"
              name={`name`}
              placeholder="Certificate name"
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
            <InputField
              label="Issuing Organization"
              type="text"
              name={`issuingOrganization`}
              placeholder="Ex: Scrum Alliance"
              value={formik.values.issuingOrganization}
              onChange={formik.handleChange}
              required
            />
          </div>

          <InputField
            label="Date Obtained"
            type="date"
            name={`dateObtained`}
            value={formik.values.dateObtained}
            onChange={formik.handleChange}
            error={formik.errors.dateObtained}
            touched={formik.touched.dateObtained}
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
                <Loader2 className="h-5 w-5 animate-spin" />
              </>
            ) : (
              "Edit"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}
