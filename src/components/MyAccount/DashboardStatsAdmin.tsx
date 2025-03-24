import { motion } from "framer-motion";
import { FaUsers, FaUserTie, FaBriefcase } from "react-icons/fa";

const stats = [
  {
    id: "candidates",
    label: "Candidates",
    icon: FaUsers,
    count: 1240,
    color: "bg-blue-500",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    icon: FaUserTie,
    count: 350,
    color: "bg-green-500",
  },
  {
    id: "jobs",
    label: "Job Announcements",
    icon: FaBriefcase,
    count: 230,
    color: "bg-purple-500",
  },
];

export default function DashboardStats() {
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
