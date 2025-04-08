import { useGetApplicationRecruiterQuery } from "@/lib/api/applicationApi";
import { useGetMyJobQuery } from "@/lib/api/jobApi";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserTie,
  FaBriefcase,
  FaUserGraduate,
} from "react-icons/fa";

export default function DashboardR() {
  const { data, isLoading, error } = useGetMyJobQuery({ limit: 1000 });
  const {
    data: recruiterApplication,
    isLoading: rectruiterLoading,
    error: recruiterError,
  } = useGetApplicationRecruiterQuery({ limit: 1000 });
  if (isLoading || rectruiterLoading) {
    return <div className="text-center py-75">Loading ...</div>;
  }
  if (error || recruiterError)
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:px-6 lg:py-16 max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center max-w-screen-sm mx-auto">
            <p className="text-3xl text-gray-900 dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
              Something&apos;s missing.
            </p>
            <p className="text-gray-500 text-lg dark:text-gray-400 font-light mb-4">
              Error while loading dashboard.
            </p>
          </div>
        </div>
      </section>
    );
  const job = data.jobPosts;
  const applications = recruiterApplication.jobApplication;
  console.log(applications);
  const stats = [
    {
      id: "jobs",
      label: "Job Announcements",
      icon: FaBriefcase,
      count: job.length,
      color: "bg-purple-500",
    },
    {
      id: "application",
      label: "Application",
      icon: FaUserGraduate,
      count: applications.length,
      color: "bg-blue-500",
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
