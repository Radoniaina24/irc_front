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
  return (
    <>
      <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
        <td className="px-6 py-4"> {job.title}</td>
        <td className="px-6 py-4"> {formatDate(job.deadline)}</td>
        <td className="px-6 py-4"> {job.category.name}</td>
        <td className="px-6 py-4"> {job.permissions}</td>
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
