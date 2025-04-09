import React, { useState } from "react";
import Modal from "./Modal";
import { AiOutlineFolderView } from "react-icons/ai";

import dayjs from "dayjs";

import { Badge } from "@/components/Ui/Badge";
import { Card, CardContent } from "@/components/Ui/card";
import ToHtml from "@/lib/utils/toHtml";

export default function ViewButton({ job }: { job: any }) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  const [open, setOpen] = useState<boolean>(false);
  //   console.log(job);
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <AiOutlineFolderView size={20} className="text-green-500" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)} width="2000px">
        <div className=" px-2 w-full lg:max-w-4xl max-w-lg md:max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
          <h2 className="text-center font-bold py-3 text-lg text-black">
            Cover letter
          </h2>
          <ToHtml content={job?.coverLetter} />
          {/* Lien vers le fichier CV */}
          <div className="flex items-center justify-center py-5 gap-2">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            <a
              href={job.file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 text-sm hover:text-red-800 font-medium transition duration-300"
            >
              View CV
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
