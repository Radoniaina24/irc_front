import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  placeholder = "",
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-full mt-2 relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-900 text-sm w-full block focus:border-blue-500 ps-5 py-2"
        />
      </div>
    </div>
  );
};

export default InputField;
