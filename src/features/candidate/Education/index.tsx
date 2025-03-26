import { useGetEducationQuery } from "@/lib/api/educationApi";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddEducation from "./AddEducation";
import EducationCard from "./Item";
export default function Education() {
  const { data, error, isLoading } = useGetEducationQuery("");
  if (isLoading) {
    return <div className="text-center py-75">Loading ...</div>;
  }
  if (error)
    return (
      <section className="bg-white ">
        <div className="lg:px-6 lg:py-16 max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center max-w-screen-sm mx-auto">
            <p className="text-3xl text-gray-900 dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
              Something&apos;s missing.
            </p>
            <p className="text-gray-500 text-lg dark:text-gray-400 font-light mb-4">
              Error while loading the list Education.
            </p>
          </div>
        </div>
      </section>
    );
  //   console.log(data);
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Education</h1>
        <AddEducation />
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          {data.map((item, index) => (
            <EducationCard education={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
