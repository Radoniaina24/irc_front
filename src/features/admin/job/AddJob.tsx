import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdAddBox } from "react-icons/md";
import { useToast } from "@/lib/context/ToastContext";
import { Loader2 } from "lucide-react";
import Modal from "./Modal";
import SelectCategory from "./SelectCategoryInput";
import {
  useAddCategoryMutation,
  useGetAllCategoryQuery,
} from "@/lib/api/categoryApi";
import InputField from "./InputField";
import SelectSector from "./SelectSectorInput";
import SelectInput from "./SelectInput";
import Checkbox from "./CheckBox";
import MultiValueInput from "./MultiValueInput";
import { useCategoriesOptions, useSectorsOptions } from "./options";
import ReactSelectInput from "./ReactSelectInput";
import RichTextEditor from "./Description";
import { useAddJobMutation } from "@/lib/api/jobApi";

const initialvalues = {
  sector: { value: "", label: "" },
  category: { value: "", label: "" },
  title: "",
  description: "", //TextArea + summer Note
  location: "",
  remote: false, //checkBOx
  contractType: "", //["CDI", "CDD", "Freelance", "Stage", "Alternance", "Intérim"]
  experienceRequired: "", //["Débutant", "1 ans", "2 ans", "3 ans", "4 ans", "5 ans"],
  studyLevels: "", //["Sans bac", "Bac", "Bac +2", "Bac +3", "Bac +4", "Bac +5"],
  skills: [], //[String], // Tableau de compétences requises
  deadline: "",
};
export default function AddJob() {
  const { options: categories, isLoading: isCategoriesLoading } =
    useCategoriesOptions();
  const { options: sectors, isLoading: isSectorsLoading } = useSectorsOptions();
  const [open, setOpen] = useState<boolean>(false);
  const { showToast } = useToast();
  const [addCategories] = useAddCategoryMutation();
  const [addJobPost] = useAddJobMutation();
  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    validationSchema: Yup.object({
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
      category: Yup.mixed()
        .test("category", "This field is required.", (value) => {
          // Vérifiez si la valeur est un objet ou une chaîne non vide
          if (typeof value === "object" && value !== null) {
            return true; // L'objet est valide
          } else if (typeof value === "string" && value.trim() !== "") {
            return true; // La chaîne non vide est valide
          }
          return false; // Si la valeur n'est ni un objet valide ni une chaîne non vide, la validation échoue
        })
        .required("This field is required."),
      description: Yup.mixed().required("This field is required."),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      // console.log(values);
      try {
        const response = await addJobPost({
          ...values,
          category: values.category.value,
          sector: values.sector.value,
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
  // console.log(formik.values.description);
  const optionsContractType = [
    { id: 1, value: "CDI", name: "CDI" },
    { id: 2, value: "CDD", name: "CDD" },
    { id: 3, value: "Freelance", name: "Freelance" },
    { id: 4, value: "Stage", name: "Stage" },
    { id: 5, value: "Alternance", name: "Alternance" },
    { id: 6, value: "Intérim", name: "Intérim" },
  ];
  const experienceLevels = [
    { id: 1, value: "Débutant", name: "Beginner" },
    { id: 2, value: "1 an", name: "1 year" },
    { id: 3, value: "2 ans", name: "2 years" },
    { id: 4, value: "3 ans", name: "3 years" },
    { id: 5, value: "4 ans", name: "4 years" },
    { id: 6, value: "5 ans", name: "5 years" },
  ];
  const studyLevels = [
    { id: 1, value: "Sans bac", name: "No bac" },
    { id: 2, value: "Bac", name: "Bac" },
    { id: 3, value: "Bac +2", name: "Bac +2" },
    { id: 4, value: "Bac +3", name: "Bac +3" },
    { id: 5, value: "Bac +4", name: "Bac +4" },
    { id: 6, value: "Bac +5", name: "Bac +5" },
  ];
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <MdAddBox size={30} className="text-blue-500" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className=" lg:max-w-4xl max-w-lg md:max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <h1 className="text-center text-lg font-bold">New job post</h1>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                label="Post"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                placeholder="eg: developpeur web"
                required
              />
              <InputField
                label="Workplace"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                placeholder="eg:Paris"
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <InputField
                type="date"
                label="Deadline"
                name="deadline"
                value={formik.values.deadline}
                onChange={formik.handleChange}
                required
              />
              <SelectInput
                label="Contract type"
                id="contractType"
                value={formik.values.contractType}
                onChange={formik.handleChange}
                options={optionsContractType}
                optionsLabel="Please select a contract type"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <SelectInput
                label="Experience Level"
                id="experienceRequired"
                value={formik.values.experienceRequired}
                onChange={formik.handleChange}
                options={experienceLevels}
                optionsLabel="Please select a experience"
              />
              <SelectInput
                label="Study Level"
                id="studyLevels"
                value={formik.values.studyLevels}
                onChange={formik.handleChange}
                options={studyLevels}
                optionsLabel="Please select a study levels"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <ReactSelectInput
                label="Category"
                name="category"
                options={categories}
                formik={formik}
                isLoading={isCategoriesLoading}
                placeholder="Choose a category"
              />
              <ReactSelectInput
                label="Sector"
                name="sector"
                options={sectors}
                formik={formik}
                isLoading={isSectorsLoading}
                placeholder="Choose a sector"
              />
            </div>

            <MultiValueInput
              label="Skills"
              name="skills"
              values={formik.values.skills}
              onChange={(newValues) =>
                formik.setFieldValue("skills", newValues)
              }
            />
            <label className="block text-sm mb-2">Description</label>
            <RichTextEditor
              value={formik.values.description}
              onChange={(content) =>
                formik.setFieldValue("description", content)
              }
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm">
                {formik.errors.description}
              </p>
            )}

            <Checkbox
              label="Work from home"
              name="remote"
              checked={formik.values.remote}
              onChange={formik.handleChange}
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
                <div className="flex items-center gap-3">
                  Add Job Post
                  <Loader2 className="h-5 w-5  animate-spin" />
                </div>
              ) : (
                "Add Job Post"
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
