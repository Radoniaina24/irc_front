import React, { useState } from "react";
import Pagination from "@/components/Orders/Pagination";

import Search from "@/components/Orders/Search";
import AddJob from "./AddJob";
import { useGetAllJobQuery, useGetMyJobQuery } from "@/lib/api/jobApi";
import JobList from "./JobList";
import { PaginationSkeleton } from "@/components/JobWithSidebar/UI";

const JobAdmin = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [permissions, setPermissions] = useState<string>("");
  const { data, isLoading, error } = useGetAllJobQuery({
    search,
    limit,
    page,
    permissions,
  });

  if (isLoading) {
    return <div className="text-center py-75">Loading ...</div>;
  }
  if (error)
    return (
      <section className="bg-white ">
        <div className="lg:px-6 lg:py-16 max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center max-w-screen-sm mx-auto">
            <p className="text-3xl text-gray-900 dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
              Something&apos;s missing.
            </p>
            <p className="text-gray-500 text-lg dark:text-gray-400 font-light mb-4">
              Error while loading the job announcement.
            </p>
          </div>
        </div>
      </section>
    );
  const jobs = data.jobPosts;
  return (
    <div className="px-5 py-5">
      <div className=" overflow-x-auto overflow-y-auto relative ">
        <div className="flex flex-wrap flex-col-reverse gap-3 justify-between items-center  md:flex-col-reverse lg:flex-row px-4 py-5">
          <div>
            <select
              id="countries"
              value={permissions}
              onChange={(e) => setPermissions(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>All</option>
              <option value="Pending">Pending</option>
              <option value="Allowed">Allowed</option>
              <option value="Denied">Denied</option>
            </select>
          </div>
          <div className="flex items-center justify-center space-x-3 border border-gray-300 bg-white shadow-sm rounded-xl px-4 py-2 text-gray-800 text-sm font-medium">
            <h2 className="text-base font-semibold text-gray-700">
              Job Announcement
            </h2>
            <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {data?.totalJobPosts ?? 0}
            </span>
          </div>
          <Search onQuery={setSearch} query={search} />
        </div>

        <div className="h-100 lg:h-[650px] overflow-y-auto">
          <table className="text-gray-500 text-left text-sm w-full dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-50 text-gray-700 text-xs dark:bg-gray-700 dark:text-gray-400 sticky top-0 uppercase z-10">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Recruiter
                </th>
                <th scope="col" className="px-6 py-3">
                  Post
                </th>
                <th scope="col" className="px-6 py-3">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3">
                  Sector
                </th>

                <th scope="col" className="px-6 py-3">
                  Published
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.length > 0 ? (
                jobs.map((item) => <JobList category={item} key={item._id} />)
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-4">
                    No job post found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isLoading ? (
        <PaginationSkeleton />
      ) : error ? (
        ""
      ) : data?.totalPages >= 2 ? (
        <div className="flex justify-center mt-15">
          <Pagination
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            onPageChange={setPage}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default JobAdmin;
