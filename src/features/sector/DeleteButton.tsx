"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { Button } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";

import { useDeleteSectorMutation } from "@/lib/api/sectorApi";
import { useToast } from "@/lib/context/ToastContext";

export default function DeleteButton({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteSector] = useDeleteSectorMutation();
  const { showToast } = useToast();
  async function handleDelete(id: string) {
    try {
      const response = await deleteSector(id).unwrap();
      showToast(response?.message, "success");
      setOpen(false);
    } catch (error) {
      if (error?.data?.message) {
        showToast(error?.data?.message, "error");
      } else {
        showToast("Check your network", "error");
      }
    }
  }
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <MdDeleteForever size={20} className="text-red-500" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-115 text-center">
          <div className="mx-auto my-4 w-100">
            <h3 className="font-black/20 text-lg text-gray-800">
              Confirm deletion.
            </h3>
            <p className="mt-2 font-medium text-gray-500">
              Are you sure you want to delete?
            </p>
          </div>
          <div className="mt-5 flex justify-center gap-5">
            <Button
              size="xs"
              className="bg-red-500 text-white"
              onClick={() => handleDelete(id)}
            >
              Delete
            </Button>
            <Button
              size="xs"
              className=" bg-blue-500 text-white"
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
