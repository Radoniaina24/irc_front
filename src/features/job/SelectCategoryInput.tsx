"use client";
import React from "react";
import { useGetAllSectorQuery } from "@/lib/api/sectorApi";

interface SelectCategoryProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
  id: string;
  error?: any;
  touched?: any;
}
const SelectCategory: React.FC<SelectCategoryProps> = ({
  label,
  onChange,
  value,
  id,
  error,
  touched,
}) => {
  const { data, isLoading } = useGetAllSectorQuery({ limit: 1000 });
  const Categories = data?.sectors || [];
  // console.log(data);
  // Rendu conditionnel du contenu principal
  const renderContent = () => {
    if (isLoading) {
      return (
        <p className="text-gray-500 text-sm dark:text-gray-400">loading...</p>
      );
    }

    if (Categories.length === 0) {
      return (
        <div className="bg-gray-50 border border-gray-300 p-4 rounded-md dark:bg-gray-800">
          <p className="text-gray-700 dark:text-gray-300">
            🚨 <strong>No Sector available</strong>. Please create one to
            continue.
          </p>
          <button
            className="bg-blue-500 rounded mt-2 px-4 py-2"
            onClick={() => (window.location.href = "/classe")}
          >
            ➕ Add sector
          </button>
        </div>
      );
    }

    return (
      <select
        id={id}
        value={value?.name || value || ""}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-900 text-sm w-full block focus:border-blue-500 ps-5 py-2"
      >
        <option value="" disabled className="text-sm">
          Please select a sector.
        </option>
        {Categories.map((item: any) => (
          <option key={item?._id} value={item?._id} className="text-sm">
            {item.name}
          </option>
        ))}
      </select>
    );
  };
  return (
    <div className="mb-1">
      <label htmlFor={id} className="text-sm block my-2">
        {label}
      </label>
      <div className="bg-transparent dark:bg-form-input relative z-20">
        {renderContent()}
        {error && touched && (
          <p className="text-red-600 text-sm dark:text-red-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};
export default SelectCategory;
