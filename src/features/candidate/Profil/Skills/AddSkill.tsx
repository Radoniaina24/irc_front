import React, { useState } from "react";
import { useFormik } from "formik";
import { useToast } from "@/lib/context/ToastContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Loader2 } from "lucide-react";
import * as Yup from "yup";
import Modal from "./Modal";
import { useAddSkillMutation } from "@/lib/api/skillsApi";
import MultiValueInput from "@/features/job/MultiValueInput";

interface Skille {
  skills: string[];
}
const initialvalues: Skille = {
  skills: [],
};
export default function AddSkill() {
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [addSkille] = useAddSkillMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: Yup.object({
      skills: Yup.array()
        .of(
          Yup.string()
            .trim()
            .min(2, "Each skill must have at least 2 characters")
            .max(20, "Each skill cannot exceed 20 characters")
        )
        .min(1, "Please add at least one skill")
        .max(5, "You can only add up to 5 skills"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      try {
        const response = await addSkille(values).unwrap();
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
  return (
    <div>
      <div>
        <IoIosAddCircleOutline
          onClick={() => setOpen(true)}
          size={25}
          className=" text-blue rounded-full cursor-pointer"
        />
      </div>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <form onSubmit={formik.handleSubmit} className="pt-5">
          <h1 className="text-center text-lg py-5 font-semibold">Skills</h1>
          <div className="">
            <MultiValueInput
              label={"Skills"}
              name={"skills"}
              values={formik.values.skills}
              onChange={(newValues) =>
                formik.setFieldValue("skills", newValues)
              }
              touched={formik.touched.skills}
              error={formik.errors.skills}
              icon={<IoIosAddCircleOutline size={20} />}
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
