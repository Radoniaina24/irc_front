import Skeleton from "@/components/Ui/Skeleton";
import { useGetProfilQuery } from "@/lib/api/candidateApi";
import { MailIcon, PhoneIcon } from "lucide-react";
import React from "react";

export default function Info({ user }: { user: any }) {
  const { data, isLoading, error } = useGetProfilQuery("");
  const getRoleBadge = (role: string) => {
    const roleStyles: Record<string, string> = {
      admin: "bg-red-100 text-red-700",
      recruiter: "bg-blue-100 text-blue-700",
      candidate: "bg-green-100 text-green-700",
    };
    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
          roleStyles[role] || "bg-gray-100 text-gray-700"
        }`}
      >
        {role}
      </span>
    );
  };
  if (isLoading) {
    return (
      <div className="flex items-center space-x-6 mb-6">
        {/* Image de profil */}
        <div className="w-20 h-20 border border-gray-400 rounded-full bg-gray-200 animate-pulse shadow-md" />

        {/* Informations utilisateur */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-5 w-16 rounded-md" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }
  const candidate = data.candidate;
  // console.log(candidate);
  return (
    <div className="flex items-center space-x-6 mb-6">
      <img
        src={user.photo}
        alt="Profile"
        className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md"
      />
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {candidate.user.lastName} {candidate.user.firstName}
          </h2>
          {getRoleBadge(candidate.user.role)}
        </div>
        <div className="flex items-center text-gray-500 mt-1 space-x-2">
          {<MailIcon className="w-4 h-4" />}
          <p>{candidate.user.email}</p>
        </div>
        {candidate.phone && (
          <div className="flex items-center text-gray-500 mt-1 space-x-2">
            {<PhoneIcon className="w-4 h-4" />}
            <p>{candidate.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
