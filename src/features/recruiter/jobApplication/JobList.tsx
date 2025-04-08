import React from "react";
import dayjs from "dayjs";
import EditButton from "./EditButton";
// import DeleteButton from "./DeleteButton";
// import EditButton from "./EditButton";
// import ViewJobPost from "./ViewJobPost";
enum PermissionStatus {
  Pending = "pending",
  Reviewed = "reviewed",
  Accepted = "accepted",
  Rejected = "rejected",
}

export default function JobList(jobs: any) {
  const job = jobs?.job;
  // console.log(job);
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };

  // 2. Badge color map
  const permissionBadgeColors: Record<PermissionStatus, string> = {
    [PermissionStatus.Pending]: "bg-yellow-500 text-white",
    [PermissionStatus.Reviewed]: "bg-blue-500 text-white",
    [PermissionStatus.Accepted]: "bg-green-500 text-white",
    [PermissionStatus.Rejected]: "bg-red-500 text-white",
  };

  // 3. Fonction proprement typée
  const getPermissionBadgeColor = (permission: PermissionStatus): string => {
    return permissionBadgeColors[permission] || "bg-gray-500 text-white";
  };
  return (
    <>
      <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="">
            <div className="text-base font-semibold">
              {job?.candidate?.user?.lastName}
            </div>
            <div className="font-normal text-gray-500">
              {job?.candidate?.user?.firstName}
            </div>
          </div>
        </th>

        <td className="px-6 py-4"> {job?.jobPost?.title}</td>
        <td className="px-6 py-4"> {formatDate(job?.createdAt)}</td>
        <td className="px-6 py-4"> {formatDate(job?.jobPost?.deadline)}</td>
        <td className="px-6 py-4">
          {" "}
          <span
            className={`px-3 py-1 rounded-full text-xs ${getPermissionBadgeColor(
              job.status
            )}`}
          >
            {job.status}
          </span>
        </td>
        <td className=" px-6 py-4">
          <div className="flex gap-3">
            <EditButton id={job._id} job={job} />
            {/* <DeleteButton id={job._id} />
            <ViewJobPost job={job} /> */}
          </div>
        </td>
      </tr>
    </>
  );
}
