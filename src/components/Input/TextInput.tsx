import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "password";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: any;
  touched: any;
  value: string;
}
const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  placeholder = "",
  required = false,
  error,
  type = "text",
  onChange,
  touched,
  value,
}) => {
  const hashError = error && touched;
  return (
    <div className="mb-5">
      {/* Label */}
      <label htmlFor={name} className="block mb-2.5 font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input Field */}
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 
                    w-full py-3 px-5 outline-none duration-200 
                    focus:border-transparent focus:shadow-input 
                    focus:ring-2 focus:ring-blue-400/50 ${
                      hashError ? "border-red-500 focus:ring-red-500" : ""
                    }`}
      />

      {/* Message d'erreur */}
      {hashError && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
