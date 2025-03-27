import React from "react";
import { IoIosClose } from "react-icons/io";
interface MultiValueInputProps {
  label: string;
  name: string;
  values: string[];
  onChange: (values: string[]) => void;
  touched?: any;
  error?: any;
  icon?: any;
}
const MultiValueInput: React.FC<MultiValueInputProps> = ({
  label,
  name,
  values,
  onChange,
  touched,
  error,
  icon,
}) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleAddValue = () => {
    if (inputValue.trim() && !values.includes(inputValue.trim())) {
      onChange([...values, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveValue = (value: string) => {
    onChange(values.filter((v) => v !== value));
  };

  return (
    <div className="mb-2">
      <label htmlFor={name} className="text-sm block mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          required={values.length ? false : true}
          type="text"
          id={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 p-2 rounded text-gray-900 text-sm w-full focus:border-blue-500"
          placeholder="Enter value..."
        />

        <button
          type="button"
          onClick={handleAddValue}
          className="bg-blue-500 rounded text-sm text-white hover:bg-blue-600 px-3 py-2"
        >
          {icon ? icon : "Add"}
        </button>
      </div>
      {touched && error ? (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      ) : (
        ""
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {values.map((value, index) => (
          <span
            key={index}
            className="flex bg-gray-200 rounded text-gray-800 text-sm gap-1 items-center px-3 py-1"
          >
            {value}
            <button
              type="button"
              onClick={() => handleRemoveValue(value)}
              className="text-red-500 hover:text-red-700"
            >
              <IoIosClose size={18} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
export default MultiValueInput;
