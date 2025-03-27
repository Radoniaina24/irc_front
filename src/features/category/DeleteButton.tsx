"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { Button } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";

import { useDeleteSectorMutation } from "@/lib/api/sectorApi";
import { useToast } from "@/lib/context/ToastContext";
import { useDeleteCategoryMutation } from "@/lib/api/categoryApi";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteCategory, data] = useDeleteCategoryMutation();
  const { showToast } = useToast();
  async function handleDelete(id: string) {
    try {
      const response = await deleteCategory(id).unwrap();
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
      <button onClick={() => setOpen(true)}>
        <MdDeleteForever size={20} className="text-red-500" />
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
              disabled={data.isLoading}
              size="sm"
              className="bg-red-500 text-white disabled:bg-gray-5"
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
            <Button
              disabled={data.isLoading}
              size="sm"
              className="bg-blue-500 text-white disabled:bg-gray-5"
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
