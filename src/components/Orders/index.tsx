import React, { useState } from "react";

import { useGetAllRecruiterQuery } from "@/lib/api/recruiterApi";
import RecruiterList from "./recruiterList";
import Search from "./Search";

const Recruiter = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(3);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetAllRecruiterQuery({
    search,
    limit,
    page,
  });
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
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((item, index) => (
              <RecruiterList recruiter={item} key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Recruiter;
