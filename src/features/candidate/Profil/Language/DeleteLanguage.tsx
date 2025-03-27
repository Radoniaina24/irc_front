"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { Button } from "flowbite-react";
import { useToast } from "@/lib/context/ToastContext";
import { TrashIcon } from "lucide-react";
import { useDeleteLanguageMutation } from "@/lib/api/languageApi";

export default function DeleteLanguage({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteLanguage] = useDeleteLanguageMutation();
  const { showToast } = useToast();
  async function handleDelete(id: string) {
    try {
      const response = await deleteLanguage(id).unwrap();
      showToast(response?.message, "success");
      setOpen(false);
    } catch (error) {
      if (error?.data?.message) {
        showToast(error?.data?.message, "error");
        setOpen(false);
      } else {
        showToast("Check your network", "error");
        setOpen(false);
      }
    }
  }
  return (
    <div>
      <button
        className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-300"
        onClick={() => setOpen(true)}
      >
        <TrashIcon className="w-4 h-4" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className="">
          <div className=" my-4 text-center">
            <h3 className="text-gray-800 text-lg font-black/20">
              Confirm deletion.
            </h3>
            <p className="text-gray-500 font-medium mt-2">
              Are you sure you want to delete?
            </p>
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <Button
              size="sm"
              className="bg-red-500 text-white"
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
            <Button
              size="sm"
              className="bg-blue-500 text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
