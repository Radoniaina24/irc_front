import React, { useState } from "react";
import { useFormik } from "formik";
import { useToast } from "@/lib/context/ToastContext";
import Modal from "./Modal";
import { IoIosAddCircleOutline } from "react-icons/io";
import InputField from "@/features/job/InputField";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import { useAddCertificationMutation } from "@/lib/api/certificationApi";
import { Language } from "../../context/FormCandidateContext";
import SelectInput from "@/features/job/SelectInput";
import { useAddLanguageMutation } from "@/lib/api/languageApi";
const initialvalues: Language = {
  language: "",
  proficiency: "Beginner",
};

export default function AddLanguage() {
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [AddLanguage] = useAddLanguageMutation();

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({}),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const response = await AddLanguage(values).unwrap();
        showToast("Add successfully", "success"); // message, type(error, success)
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
  const languageLevels = [
    { id: 1, value: "Beginner", name: "Beginner" },
    { id: 2, value: "Intermediate", name: "Intermediate" },
    { id: 3, value: "Advanced", name: "Advanced" },
    { id: 4, value: "Fluent", name: "Fluent" },
    { id: 5, value: "Native", name: "Native" },
  ];
  return (
    <div>
      <button className="p-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition duration-300">
        <IoIosAddCircleOutline
          onClick={() => setOpen(true)}
          className="w-4 h-4"
        />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="pt-5">
          <h1 className="text-center text-gray-500 text-lg py-5 font-semibold">
            Add certification
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center text-gray-500">
            <InputField
              label="Name"
              type="language"
              name={`language`}
              value={formik.values.language}
              placeholder="Ex:English"
              onChange={formik.handleChange}
              required
            />
            <SelectInput
              label="Level"
              id={`proficiency`}
              value={formik.values.proficiency}
              onChange={formik.handleChange}
              options={languageLevels}
              optionsLabel="Please select a level"
            />
          </div>
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
              "Add"
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
}
