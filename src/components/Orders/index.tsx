import React, { useState } from "react";
import { useGetAllRecruiterQuery } from "@/lib/api/recruiterApi";
import RecruiterList from "./recruiterList";
import Search from "./Search";
import Pagination from "./Pagination";

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
    return <div>Loading ...</div>;
  }
  if (error)
    return (
      <div className="text-red-500">
        Erreur lors du chargement des recruteurs
      </div>
    );
  const recruiters = data.recruiters;
  return (
    <div className="py-5 px-5">
      <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg ">
        <Search onQuery={setSearch} query={search} />
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
      {recruiters.length > limit ? (
        <Pagination
          totalPages={data.totalPages}
          currentPage={data.currentPage}
          onPageChange={setPage}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Recruiter;
