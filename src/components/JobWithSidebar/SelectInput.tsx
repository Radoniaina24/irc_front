import { useGetAllCategoryQuery } from "@/lib/api/categoryApi";
import React from "react";
import Select from "react-select";

interface SelectFieldProps {
  name: string;
  options: { value: string; label: string }[];
  formik?: any;
  isLoading?: boolean;
  placeholder?: string;
  label?: string;
}
export default function SelectInput({
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
    <div className="">
      {label && (
        <label htmlFor={name} className="text-md text-black block my-2">
          {label}
        </label>
      )}

      <Select
        options={options}
        isLoading={isLoading}
        placeholder={"Category"}
        value={formik?.values[name]}
        onChange={handleChange}
        onBlur={() => formik.setFieldTouched(name, true)}
        isClearable
        className="basic-single text-sm  text-black selectJob"
        classNamePrefix="select"
      />
    </div>
  );
}
