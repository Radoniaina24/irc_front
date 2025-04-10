import React, { useState } from "react";
import dayjs from "dayjs";
import { IoEyeSharp } from "react-icons/io5";
import Modal from "./Modal";
import Link from "next/link";

export default function ViewButton({ recruiter }: { recruiter: any }) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  const [open, setOpen] = useState<boolean>(false);
  //   console.log(recruiter);
  const normalizeUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <IoEyeSharp size={20} className="text-blue-400" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div className=" px-2 w-full  overflow-y-auto max-h-[80vh]">
          <div className="  bg-gradient-to-r   from-blue-500 to-indigo-600 shadow-2xl rounded-xl p-8 border border-gray-300 text-white relative">
            <h2 className="text-3xl font-bold mb-3">
              {recruiter.companyName || "Company : "}
            </h2>
            <p className="text-lg font-semibold">
              {recruiter.function || "Function : "}
            </p>
            <p className="text-md text-gray-200 mb-4">
              {recruiter.industry || "Industry : "}
            </p>

            <div className="mt-4 bg-white p-4 rounded-xl shadow-md text-gray-800">
              <p className="text-gray-900 font-medium">
                📞 {recruiter.phone || "Phone : "}
              </p>
              <p className="text-gray-900">
                📧 {recruiter.user.email || "Email : "}
              </p>
            </div>

            <div className="mt-4 bg-white p-4 rounded-xl shadow-md text-gray-800">
              <p className="text-gray-900 font-medium">
                📍 {recruiter.address || "Address : "}
              </p>
              <p className="text-gray-900">
                {recruiter.city || "City : "},{" "}
                {recruiter.country || "Country : "}
              </p>
            </div>

            {recruiter.website && (
              <div className="mt-6 text-center">
                <Link
                  href={normalizeUrl(recruiter.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full shadow-md hover:bg-gray-200 transition"
                >
                  🌍 visit the website
                </Link>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
