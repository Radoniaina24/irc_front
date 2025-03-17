import { Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
export type typeNotification = "error" | "success";
export function ToastNotification({
  message,
  onClose,
  autoHideDuration = 6000,
  type,
}: {
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
  type: typeNotification;
}) {
  useEffect(() => {
    const id = setTimeout(() => {
      onClose();
    }, autoHideDuration);
    return () => clearTimeout(id);
  }, [autoHideDuration]);

  if (type === "error") {
    return (
      <Toast className=" z-99999 fixed right-4 top-4 w-80 bg-red-100 p-2 dark:bg-red-800 dark:text-white">
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">{message}</div>
        <Toast.Toggle
          onClick={onClose}
          className="  -mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 p-1.5 text-red-500 hover:bg-red-100 focus:ring-2 focus:ring-red-400 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-800 "
        />
      </Toast>
    );
  }
  return (
    <Toast className="z-99999 fixed right-4 top-4 w-80 bg-green-100 p-2 dark:bg-green-800 dark:text-white">
      <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <svg
          className="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <Toast.Toggle
        onClick={onClose}
        className="-mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 p-1.5 text-green-500 hover:bg-green-100 focus:ring-2 focus:ring-green-400 dark:bg-green-800 dark:text-green-400 dark:hover:bg-green-800"
      />
    </Toast>
  );
}
