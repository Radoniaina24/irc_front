import { useGetAllCategoryQuery } from "@/lib/api/categoryApi";
import React from "react";
import Select from "react-select";

interface SelectFieldProps {
  name: string;
  options: { value: string; label: string }[];
  formik: any;
  isLoading?: boolean;
  placeholder?: string;
  label: string;
}
export default function ReactSelectInput({
  name,
  options,
  formik,
  isLoading,
  placeholder,
  label,
}: SelectFieldProps) {
  const handleChange = (selectedOption: any) => {
    formik.setFieldValue(name, selectedOption);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-sm block my-2">
        {label}
      </label>
      <Select
        options={options}
        isLoading={isLoading}
        placeholder={placeholder || "Sélectionner..."}
        value={formik.values[name]}
        onChange={handleChange}
        onBlur={() => formik.setFieldTouched(name, true)}
        isClearable
        className="basic-single text-sm text-black"
        classNamePrefix="select"
      />
      {formik.touched[name] && formik.errors[name] && (
        <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
}
