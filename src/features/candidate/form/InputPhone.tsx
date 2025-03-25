import React, { useEffect, useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
isPossiblePhoneNumber;
function InputPhone({
  label,
  value,
  onChange,
  error,
  touched,
  name,
  setFieldTouched,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (field: string, value: string | undefined) => void;
  error: string | undefined;
  touched: boolean | undefined;
  setFieldTouched: (field: string, touched?: boolean) => void;
}) {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  function handleChange(phone: string | undefined) {
    onChange(name, phone);
    if (!phone) {
      setFieldTouched(name, true); // Marquer comme touché si vidé
    }
  }
  const hasError = error && touched;
  return (
    <div className="">
      <label
        htmlFor="phone"
        className={`mb-2 block text-sm font-medium  ${
          hasError ? " text-red-500" : " text-gray-700"
        }`}
      >
        {label}
      </label>
      <div
        className={`rounded  border border-gray-300 px-5 ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      >
        <PhoneInput
          onBlur={() => setFieldTouched(name, true)}
          value={value}
          onChange={handleChange}
          className={`text-dark   ${
            hasError ? "errorPhone" : ""
          } py-2 focus:border-none focus:outline-none`}
          placeholder="Include the international dialing code"
        />
      </div>

      {hasError ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium"></span> {error}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default InputPhone;
