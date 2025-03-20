"use client";
import React from "react";

interface Option {
  id: string | number;
  value: string | number;
  name: string;
}

interface SelectInputProps {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number | null;
  id: string;
  error?: string;
  touched?: boolean;
  options: Option[];
  optionsLabel: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  onChange,
  value,
  id,
  options,
  optionsLabel,
}) => {
  return (
    <div className="mb-1">
      <label htmlFor={id} className="text-sm block my-2">
        {label}
      </label>
      <select
        id={id}
        value={value || ""}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-900 text-sm w-full block focus:border-blue-500 ps-5 py-2"
      >
        <option value="" disabled className="text-sm">
          {optionsLabel}
        </option>
        {options.map((item) => (
          <option key={item.id} value={item.value} className="text-sm">
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
