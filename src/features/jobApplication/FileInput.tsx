import React, { useState } from "react";

interface InputFileProps {
  label: string;
  name: string;
  setFieldValue: (field: string, value: File | null) => void;
  error?: string;
  touched?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  requir?: boolean;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 Mo
const ALLOWED_TYPE = ["application/pdf"];

const FileInput: React.FC<InputFileProps> = ({
  label,
  name,
  setFieldValue,
  error,
  touched,
  inputRef,
  requir = true,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] || null;

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError("The file must not exceed 2 MB.");
        setFieldValue(name, null);
        return;
      }

      if (!ALLOWED_TYPE.includes(file.type)) {
        setFileError("Only PDF files are allowed.");
        setFieldValue(name, null);
        return;
      }

      setFileError(null); // Réinitialise l'erreur si le fichier est valide
      setFieldValue(name, file);
    }
  };
  return (
    <div>
      <label className="mb-2.5 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <input
        required={requir}
        ref={inputRef}
        name={name}
        type="file"
        accept="application/pdf"
        className="w-full cursor-pointer rounded border bg-white text-sm font-semibold text-gray-400 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-gray-500 file:hover:bg-gray-200"
        onChange={handleFileChange}
      />
      {fileError ? (
        <p className="mt-2 text-xs text-red-600">{fileError}</p>
      ) : touched && error ? (
        <p className="mt-2 text-xs text-red-600">{error}</p>
      ) : (
        <p className="mt-2 text-xs text-gray-400">
          Only PDFfiles (max. 2 MB) are allowed.
        </p>
      )}
    </div>
  );
};

export default FileInput;
