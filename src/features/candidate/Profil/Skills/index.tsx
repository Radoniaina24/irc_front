"use client";
import { PencilIcon } from "lucide-react";
import AddSkill from "./AddSkill";
import { useGetSkillQuery } from "@/lib/api/skillsApi";
import EditSkill from "./EditSkill";

export default function ProfileSkills({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const { data, isLoading, error } = useGetSkillQuery("");
  if (isLoading) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200 animate-pulse">
        {/* Titre avec Skeleton */}
        <div className="flex justify-between items-center mb-3">
          <div className="h-4 w-24 bg-gray-300 rounded-md" />
          <div className="h-6 w-6 bg-gray-300 rounded-full" />
        </div>

        {/* Skills Skeleton */}
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-6 w-16 bg-gray-300 rounded-full shadow-sm"
            />
          ))}
        </div>
      </div>
    );
  }
  const skills = data[0]?.skills;
  // console.log(data[0]);
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        {/* <button className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
          <PencilIcon className="w-4 h-4 text-gray-700" />
        </button> */}
        {skills ? (
          <EditSkill skill={skills} id={data && data[0]?._id} />
        ) : (
          <AddSkill />
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {skills &&
          skills.map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-2.5 py-1 text-xs font-medium rounded-full shadow-sm hover:bg-blue-200 transition"
            >
              {item}
            </span>
          ))}
      </div>
    </div>
  );
}
