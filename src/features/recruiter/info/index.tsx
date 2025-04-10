import React from "react";
import EditButton from "./EditButton";
import { useGetProfilQuery } from "@/lib/api/recruiterApi";
import Link from "next/link";

export default function InfoRecruteur() {
  const { data, isLoading, error } = useGetProfilQuery({});
  if (isLoading) {
    return <div className="text-center py-75">Loading ...</div>;
  }
  if (error)
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:px-6 lg:py-16 max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center max-w-screen-sm mx-auto">
            <p className="text-3xl text-gray-900 dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
              Something&apos;s missing.
            </p>
            <p className="text-gray-500 text-lg dark:text-gray-400 font-light mb-4">
              Error while loading profil.
            </p>
          </div>
        </div>
      </section>
    );
  const recruiter = data.recruiter;
  const normalizeUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };
  return (
    <div className=" min-h-[560px]  bg-gradient-to-r   from-blue-500 to-indigo-600 shadow-2xl rounded-xl p-8 border border-gray-300 text-white relative">
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
        <p className="text-gray-900">📧 {recruiter.user.email || "Email : "}</p>
      </div>

      <div className="mt-4 bg-white p-4 rounded-xl shadow-md text-gray-800">
        <p className="text-gray-900 font-medium">
          📍 {recruiter.address || "Address : "}
        </p>
        <p className="text-gray-900">
          {recruiter.city || "City : "}, {recruiter.country || "Country : "}
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

      <EditButton id={recruiter._id} recruiter={recruiter} />
    </div>
  );
}
