import React from "react";
import AddExperience from "./AddExperience";
import { useGetExperienceQuery } from "@/lib/api/experienceApi";
import ExperienceCard from "./Item";
export default function Experience() {
  const { data, error, isLoading } = useGetExperienceQuery("");
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
              Error while loading the list Experience.
            </p>
          </div>
        </div>
      </section>
    );
  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Experience</h1>
        <AddExperience />
      </div>
      <div className="mt-10 max-h-[50vh] overflow-y-auto overflow-x-hidden ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          {data.map((item, index) => (
            <ExperienceCard experience={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
