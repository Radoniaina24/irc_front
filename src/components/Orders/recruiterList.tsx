import React from "react";
import dayjs from "dayjs";
import ViewButton from "./ViewButton";
export default function RecruiterList(recruiter: any) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  const recrut = recruiter.recruiter;
  // console.log(recrut);
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th
          scope="row"
          className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
        >
          <div className="ps-3">
            <div className="text-base font-semibold">
              {recrut.user.lastName}
            </div>
            <div className="font-normal text-gray-500">
              {recrut.user.firstName}
            </div>
          </div>
        </th>
        <td className="px-6 py-4"> {recrut.user.email}</td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
            {recrut.user.role}
          </div>
        </td>
        <td className="px-6 py-4"> {formatDate(recrut.createdAt)}</td>
        <td className="px-6 py-4">
          <div className="flex gap-3">
            <ViewButton recruiter={recrut} />
          </div>
        </td>
      </tr>
    </>
  );
}
