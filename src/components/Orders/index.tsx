import React, { useState } from "react";
import { useGetAllRecruiterQuery } from "@/lib/api/recruiterApi";
import RecruiterList from "./recruiterList";
import Search from "./Search";
import Pagination from "./Pagination";
import { PaginationSkeleton } from "../JobWithSidebar/UI";

const Recruiter = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetAllRecruiterQuery({
    search,
    limit,
    page,
  });
  // console.log(data);
  if (isLoading) {
    return <div className="text-center py-75">Loading ...</div>;
  }
  if (error)
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="lg:px-6 lg:py-16 max-w-screen-xl mx-auto px-4 py-8">
          <div className="text-center max-w-screen-sm mx-auto">
            <p className="text-3xl text-gray-900 dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
              Something&apos;s missing.
            </p>
            <p className="text-gray-500 text-lg dark:text-gray-400 font-light mb-4">
              Error while loading recruiters.
            </p>
          </div>
        </div>
      </section>
    );
  const recruiters = data.recruiters;
  return (
    <div className="py-5 px-5 ">
      <div className="relative overflow-x-auto overflow-y-auto  ">
        <div className="py-4 px-2">
          <Search onQuery={setSearch} query={search} />
        </div>
        <div className="h-100 lg:h-[650px] overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recruiters.length > 0 ? (
                recruiters.map((item) => (
                  <RecruiterList recruiter={item} key={item._id} />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No recruiters found.
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
export default Recruiter;
