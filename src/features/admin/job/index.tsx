import React, { useState } from "react";
import Pagination from "@/components/Orders/Pagination";

import Search from "@/components/Orders/Search";
import AddJob from "./AddJob";
import { useGetAllJobQuery, useGetMyJobQuery } from "@/lib/api/jobApi";
import JobList from "./JobList";

const JobAdmin = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetAllJobQuery({
    search,
    limit,
    page,
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
      <div className="shadow-md overflow-x-auto overflow-y-auto relative sm:rounded-lg">
        <div className="flex flex-wrap justify-end items-center px-4 py-5">
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
                  Category
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

      <Pagination
        totalPages={data.totalPages}
        currentPage={data.currentPage}
        onPageChange={setPage}
      />
    </div>
  );
};
export default JobAdmin;
