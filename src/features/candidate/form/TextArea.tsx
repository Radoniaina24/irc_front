import React from "react";

interface TextAreaProps {
  id: string;
  label: string;
  placeholder?: string;
  rows?: number;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder = "Write here...",
  rows = 4,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex flex-col mt-2 ${className}`}>
      <label htmlFor={id} className="mb-2 block text-sm  text-gray-500 ">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 px-5 text-sm text-gray-900 outline-none  focus:border-primary focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
