import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import Modal from "./Modal";
import SelectCategory from "./SelectCategoryInput";
import { useUpdateCategoryMutation } from "@/lib/api/categoryApi";
import { MdEditNote } from "react-icons/md";
export default function EditCategory({
  id,
  name,
  sector,
}: {
  id: string;
  name: string;
  sector: string;
}) {
  const initialvalues = {
    name: name,
    sector: sector,
  };
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [updateCategories] = useUpdateCategoryMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      sector: Yup.mixed()
        .test("sector", "This field is required.", (value) => {
          // Vérifiez si la valeur est un objet ou une chaîne non vide
          if (typeof value === "object" && value !== null) {
            return true; // L'objet est valide
          } else if (typeof value === "string" && value.trim() !== "") {
            return true; // La chaîne non vide est valide
          }
          return false; // Si la valeur n'est ni un objet valide ni une chaîne non vide, la validation échoue
        })
        .required("This field is required."),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const response = await updateCategories({
          name: values.name,
          sector: values.sector,
          id: id,
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
  // console.log(formik.values);
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <MdEditNote size={20} className="text-blue-500" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="p-10 w-115">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <h1 className="text-center text-lg font-bold">Edit category</h1>

            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <div className="w-full mt-2 relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-900 text-sm w-full block focus:border-blue-500 ps-5 py-2"
                placeholder="category..."
                required
              />
            </div>

            <SelectCategory
              label="Sector"
              onChange={formik.handleChange}
              value={formik.values.sector}
              error={formik.errors.sector}
              touched={formik.touched.sector}
              id="sector"
            />
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
