import { useGetAllCandidateQuery } from "@/lib/api/candidateApi";
import { useGetAllJobQuery } from "@/lib/api/jobApi";
import { useGetAllRecruiterQuery } from "@/lib/api/recruiterApi";
import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaBriefcase } from "react-icons/fa";

export default function DashboardStats() {
  // Recruteurs
  const {
    data: recruitersData,
    isLoading: isRecruitersLoading,
    error: recruitersError,
  } = useGetAllRecruiterQuery({});

  // Candidats
  const {
    data: candidatesData,
    isLoading: isCandidatesLoading,
    error: candidatesError,
  } = useGetAllCandidateQuery({});

  // Offres d'emploi
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    error: jobsError,
  } = useGetAllJobQuery({});
  if (isCandidatesLoading || isRecruitersLoading || isJobsLoading) {
    return (
      <main className="w-full xl:max-w-[820px] p-6 animate-pulse">
        <div className="flex flex-wrap justify-center gap-10">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-5 bg-gradient-to-r from-gray-200 to-gray-100 shadow-lg rounded-lg border border-gray-300 hover:shadow-xl transition-all duration-300 w-64"
            >
              <div className="p-4 rounded-full bg-gray-300 shadow-md w-14 h-14"></div>
              <div className="text-center mt-3">
                <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>
                <div className="flex justify-center">
                  <div className="h-5 w-16 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  recruitersData;
  const stats = [
    {
      id: "candidates",
      label: "Candidates",
      icon: FaUsers,
      count: candidatesData?.totalCandidates,
      color: "bg-blue-500",
    },
    {
      id: "recruiters",
      label: "Recruiters",
      icon: FaUserTie,
      count: recruitersData?.totalRecruiters,
      color: "bg-green-500",
    },
    {
      id: "jobs",
      label: "Job Announcements",
      icon: FaBriefcase,
      count: jobsData?.totalJobPosts,
      color: "bg-purple-500",
    },
  ];
  return (
    <main className=" w-full xl:max-w-[820px] p-6">
      <div className="flex flex-wrap justify-center gap-10">
        {stats.map(({ id, label, icon: Icon, count, color }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center p-5 bg-gradient-to-r from-gray-100 to-gray-50 shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 w-64"
          >
            <div className={`p-4 rounded-full text-white ${color} shadow-md`}>
              <Icon size={30} />
            </div>
            <div className="text-center mt-3">
              <h3 className="text-md font-semibold text-gray-700">{label}</h3>
              <p className="text-xl font-bold text-gray-900">{count}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
