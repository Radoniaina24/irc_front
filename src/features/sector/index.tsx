import React, { useState } from "react";
import Pagination from "@/components/Orders/Pagination";
import SectorList from "./SectorList";
import Search from "@/components/Orders/Search";
import { useGetAllSectorQuery } from "@/lib/api/sectorApi";
import AddSector from "./AddSector";

const Sector = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetAllSectorQuery({
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
        Error while loading the industry sectors.
      </div>
    );
  const sectors = data.sectors;
  return (
    <div className="py-5 px-5">
      <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg ">
        <div className="flex flex-wrap justify-between items-center px-4 py-2">
          <AddSector />
          <Search onQuery={setSearch} query={search} />
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sectors.length > 0 ? (
              sectors.map((item) => <SectorList sector={item} key={item._id} />)
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No sectors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {sectors.length > limit ? (
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
export default Sector;
