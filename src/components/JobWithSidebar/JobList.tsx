import { useState } from "react";
import { Briefcase, MapPin, Calendar, Building } from "lucide-react";
import { Badge, Button, Card, CardContent } from "./UI";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const JobList = ({
  loading,
  job,
  error,
}: {
  loading: boolean;
  job: any;
  error: any;
}) => {
  dayjs.locale("en");
  // console.log(loading);
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };

  const router = useRouter();

  const handleRedirect = (jobId: string) => {
    router.push(`/job-posts/${jobId}`); // Redirige vers la page du job spécifique
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="relative shadow-lg rounded-2xl p-4 border border-gray-200 animate-pulse bg-gray-200"
          >
            <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-tr-lg rounded-bl-lg"></div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
              </div>
              <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-3"></div>
              {/* <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div> */}
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
              </div>
              <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-3"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-3"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  const jobs = job?.jobPosts;
  if (!jobs?.length) {
    return (
      <div className="xl:max-w-[870px]">
        <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-70 mb-6 text-center">
          Not found
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="xl:max-w-[870px]">
        <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-70 mb-6 text-center">
          <p className="text-3xl text-gray-900 dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
            Something&apos;s missing.
          </p>
          <p className="text-gray-500 text-lg dark:text-gray-400 font-light mb-4">
            Error while loading the job announcement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      {jobs.map((item) => (
        <Card
          key={item._id}
          className="relative shadow-lg rounded-2xl p-4 border border-gray-200 group overflow-hidden"
          onClick={() => handleRedirect(item._id)}
        >
          {item.remote && (
            <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-tr-lg rounded-bl-lg">
              Remote
            </div>
          )}
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              {/* <div className="flex items-center gap-2">
                {item.remote && (
                  <Badge className="bg-green-500 text-white text-xs">
                    Remote
                  </Badge>
                )}
              </div> */}
            </div>
            {item.recruiter.companyName && (
              <div className="flex items-center text-gray-600 text-sm ">
                <Building className="w-4 h-4 mr-1" />
                {item.recruiter.companyName}
              </div>
            )}

            {/* <ToHtml content={`${item.description.substring(0, 100)}`} /> */}

            <div className="flex flex-wrap gap-2 mb-3 my-3">
              <Badge className="bg-blue-500 text-white">
                {item.contractType}
              </Badge>
              <Badge className="bg-purple-500 text-white">
                {item.experienceRequired}
              </Badge>
              <Badge className="bg-yellow-500 text-white">
                {item.studyLevels}
              </Badge>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              {item.location}
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Briefcase className="w-4 h-4 mr-1" />
              {item.sector.name}
            </div>
            <div className="flex items-center text-gray-700 text-sm font-medium bg-gray-100 px-3 py-1 rounded-lg w-fit shadow-sm transition-all duration-300 hover:bg-gray-200">
              <Calendar className="w-5 h-5 text-indigo-500 mr-2" />
              <span>Deadline : {formatDate(item.deadline)}</span>
            </div>
            {/* <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300  translate-y-4 ">
              Details
            </Button> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobList;
