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
import AddJobApplication from "@/features/jobApplication/AddJobApplication";
import AuthGuard from "../Auth/AuthGuard/AuthGuard";

export default function JobId({ data, isLoading, error }) {
  // console.log(data);
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  const SkeletonLoader = ({ count = 5 }) => {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="w-full h-5 bg-gray-300 rounded animate-pulse"
          ></div>
        ))}
      </div>
    );
  };
  if (isLoading) {
    return (
      <>
        {/* Breadcrumb Skeleton */}
        <BreadcrumbSkeleton />
        <section className="overflow-hidden relative pb-20 pt-5 bg-gray-100">
          <div className="relative max-w-3xl rounded-lg shadow-lg bg-white w-full mx-auto p-8">
            <CardContent>
              {/* Informations principales (Nom, Lieu, Deadline) */}
              <h1 className="font-semibold text-dark text-xl sm:text-2xl xl:text-custom-2">
                <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse"></div>
              </h1>
              <div className="flex flex-wrap items-center justify-between text-gray-700 mb-4">
                {/* Nom de l'entreprise */}
                <span className="text-xl font-semibold text-gray-800">
                  <div className="w-1/3 h-5 bg-gray-300 rounded animate-pulse"></div>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 mb-8">
                {/* Type de contrat */}
                <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1 px-3 py-1 rounded-md">
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </Badge>

                {/* Lieu */}
                <Badge className="bg-green-100 text-green-700 flex items-center gap-1 px-3 py-1 rounded-md">
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </Badge>

                {/* Deadline */}
                <Badge className="bg-red-100 text-red-700 flex items-center gap-1 px-3 py-1 rounded-md">
                  <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                </Badge>

                {/* Niveau d'étude */}
                <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1 px-3 py-1 rounded-md">
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </Badge>

                {/* Expérience requise */}
                <Badge className="bg-purple-100 text-purple-700 flex items-center gap-1 px-3 py-1 rounded-md">
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </Badge>

                {/* Secteur d'activité */}
                <Badge className="bg-gray-100 text-gray-700 flex items-center gap-1 px-3 py-1 rounded-md">
                  <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                </Badge>
              </div>

              {/* Activité de l'entreprise */}
              <h2 className="my-3 text-xl font-semibold text-blue-600">
                <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
              </h2>
              <SkeletonLoader count={3} />

              {/* Missions */}
              <h2 className="my-3 text-xl font-semibold text-blue-600">
                <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
              </h2>
              <SkeletonLoader count={5} />

              {/* Profil du candidat */}
              <h2 className="my-3 text-xl font-semibold text-blue-600">
                <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
              </h2>
              <SkeletonLoader count={6} />

              {/* Bouton "Postuler" en bas à droite */}
              <div className="absolute z-999999 bottom-5 right-5 gap-2">
                <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <Breadcrumb title={"Job"} pages={["job-posts", "/", data?.title]} />
      <section className="overflow-hidden relative pb-20 pt-5 bg-gray-100">
        <div className="relative max-w-3xl rounded-lg shadow-lg bg-white w-full mx-auto p-8">
          <CardContent>
            {/* Informations principales (Nom, Lieu, Deadline) */}
            <h1 className="font-semibold text-dark text-xl sm:text-2xl xl:text-custom-2">
              {data?.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between text-gray-700 mb-4">
              {/* Nom de l'entreprise */}
              <span className="text-xl font-semibold text-gray-800">
                {data?.recruiter?.companyName}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 mb-8">
              {/* Type de contrat */}
              <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1 px-3 py-1 rounded-md">
                <Briefcase size={16} /> {data?.contractType}
              </Badge>

              {/* Lieu */}
              <Badge className="bg-green-100 text-green-700 flex items-center gap-1 px-3 py-1 rounded-md">
                <MapPin size={16} /> {data?.location}
              </Badge>

              {/* Deadline */}
              <Badge className="bg-red-100 text-red-700 flex items-center gap-1 px-3 py-1 rounded-md">
                <Calendar size={16} /> Deadline : {formatDate(data?.deadline)}
              </Badge>

              {/* Niveau d'étude */}
              <Badge className="bg-orange-100 text-orange-700 flex items-center gap-1 px-3 py-1 rounded-md">
                <GraduationCap size={16} /> {data?.studyLevels}
              </Badge>

              {/* Expérience requise */}
              <Badge className="bg-purple-100 text-purple-700 flex items-center gap-1 px-3 py-1 rounded-md">
                <Clock size={16} /> Experience : {data?.experienceRequired}
              </Badge>

              {/* Secteur d'activité */}
              <Badge className="bg-gray-100 text-gray-700 flex items-center gap-1 px-3 py-1 rounded-md">
                <Building size={16} /> Sector : {data?.sector.name}
              </Badge>
            </div>

            {/* Activité de l'entreprise */}
            <h2 className="my-3 text-xl font-semibold text-blue-600">
              Company Activity
            </h2>
            <ToHtml content={data?.description} />

            {/* Missions */}
            <h2 className="my-3 text-xl font-semibold text-blue-600">
              Missions
            </h2>
            <ToHtml content={data?.missions} />

            {/* Profil du candidat */}
            <h2 className="my-3 text-xl font-semibold text-blue-600">
              Candidate profil
            </h2>
            <ToHtml content={data?.candidate_profil} />

            {/* Bouton "Postuler" en bas à droite */}

            <AddJobApplication id={data?._id} />
          </CardContent>
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
