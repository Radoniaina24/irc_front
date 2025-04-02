import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { CardContent } from "./UI";
import { Badge } from "../Ui/Badge";
import {
  Briefcase,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  GraduationCap,
  MapPin,
} from "lucide-react";
import ToHtml from "@/lib/utils/toHtml";
import dayjs from "dayjs";
import { Card } from "../Ui/card";

export default function JobId({ data, isLoading, error }) {
  // console.log(data);
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  if (isLoading) {
    return (
      <>
        {/* Breadcrumb Skeleton */}
        <BreadcrumbSkeleton />

        <section className="overflow-hidden relative pb-20 pt-5 bg-[#f3f4f6]">
          <div className="max-w-[1170px] rounded-lg shadow-md bg-white w-full mx-auto p-8">
            <div className="p-6">
              <CardContent>
                {/* Titre */}
                <div className="h-6 w-1/3 bg-gray-300 rounded-md animate-pulse mb-4"></div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-6 w-32 bg-gray-300 rounded-md animate-pulse"
                      ></div>
                    ))}
                </div>

                {/* Sections de texte */}
                {["Company activity", "Missions", "Candidate profile"].map(
                  (section, index) => (
                    <div key={index} className="mt-6">
                      <div className="h-5 w-40 bg-gray-300 rounded-md animate-pulse mb-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded-md animate-pulse mb-2"></div>
                      <div className="h-4 w-5/6 bg-gray-200 rounded-md animate-pulse"></div>
                    </div>
                  )
                )}

                {/* Skills */}
                <div className="h-6 w-30 bg-gray-200 rounded-md animate-pulse my-3"></div>
                <ul className="mt-3 space-y-2">
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-800 bg-gray-100 px-3 py-2 rounded-lg shadow-sm animate-pulse"
                      >
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <div className="h-4 w-32 bg-gray-300 rounded-md"></div>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </div>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      {" "}
      <Breadcrumb title={"Jobs"} pages={["job-posts", "/", data?.title]} />
      <section className="overflow-hidden  relative pb-20 pt-5 bg-[#f3f4f6]">
        <div className="max-w-[1170px] rounded-lg shadow-md bg-white w-full mx-auto p-8">
          <div className=" p-6">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900">
                {data?.title}
              </h2>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase size={16} /> {data?.contractType}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin size={16} /> {data?.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar size={16} /> Deadline : {formatDate(data?.deadline)}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <GraduationCap size={16} /> {data?.studyLevels}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock size={16} /> Experience : {data?.experienceRequired}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Building size={16} /> Sector : {data?.sector.name}
                </Badge>
              </div>
              <h2 className="my-3 uppercase font-bold text-blue-500">
                Company activity
              </h2>
              <ToHtml content={data?.description} />
              <h2 className="my-3 uppercase font-bold text-blue-500">
                Missions
              </h2>
              <ToHtml content={data?.missions} />
              <h2 className="my-3 uppercase font-bold text-blue-500">
                Candidate profile
              </h2>
              <ToHtml content={data?.candidate_profil} />
              <h3 className="text-lg font-semibold text-gray-800 mt-6">
                Required skills
              </h3>

              <ul className="mt-3 space-y-2">
                {data?.skills.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-800 bg-gray-100 px-3 py-2 rounded-lg shadow-sm transition-all duration-300 hover:bg-gray-200"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </div>
        </div>
      </section>
    </>
  );
}

const BreadcrumbSkeleton = () => {
  return (
    <div className="overflow-hidden shadow-breadcrumb pt-[209px] sm:pt-[155px] lg:pt-[132px] xl:pt-[165px]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 py-5 xl:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center items-center justify-between gap-3">
          {/* Skeleton pour le titre */}
          <div className="h-6 w-48 bg-gray-300 rounded-md animate-pulse"></div>

          {/* Skeleton pour les liens */}
          <ul className="flex items-center gap-2">
            <div className="h-5 w-16 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-5 w-20 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-5 w-24 bg-gray-300 rounded-md animate-pulse"></div>
          </ul>
        </div>
      </div>
    </div>
  );
};
