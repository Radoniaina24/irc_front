import React from "react";
import dayjs from "dayjs";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ViewJobPost from "./ViewJobPost";
export default function JobList(category: any) {
  const job = category.category;
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  const getPermissionBadgeColor = (permissions) => {
    switch (permissions) {
      case "Pending":
        return "bg-yellow-500 text-white"; // Jaune pour "Pending"
      case "Allowed":
        return "bg-green-500 text-white"; // Vert pour "Allowed"
      case "Denied":
        return "bg-red-500 text-white"; // Rouge pour "Denied"
      default:
        return "bg-gray-500 text-white"; // Gris par défaut
    }
  };
  return (
    <>
      <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
        <td className="px-6 py-4"> {job.title}</td>
        <td className="px-6 py-4"> {formatDate(job.deadline)}</td>
        <td className="px-6 py-4"> {job.sector.name}</td>
        <td className="px-6 py-4">
          <span
            className={`px-3 py-1 rounded-full text-xs ${getPermissionBadgeColor(
              job.permissions
            )}`}
          >
            {job.permissions}
          </span>
        </td>
        <td className=" px-6 py-4">
          <div className="flex gap-3">
            <EditButton id={job._id} job={job} />
            <DeleteButton id={job._id} />
            <ViewJobPost job={job} />
          </div>
        </td>
      </tr>
    </>
  );
}
