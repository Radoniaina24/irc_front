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
              Error while loading the industires sectors.
            </p>
          </div>
        </div>
      </section>
    );
  const sectors = data.sectors;
  return (
    <div className="px-5 py-5">
      <div className="shadow-md overflow-x-auto overflow-y-auto relative sm:rounded-lg">
        <div className="flex flex-wrap justify-between items-center px-4 py-2">
          <AddSector />
          <Search onQuery={setSearch} query={search} />
        </div>

        <div className="h-100 lg:h-[650px] overflow-y-auto">
          <table className="text-gray-500 text-left text-sm w-full dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-50 text-gray-700 text-xs dark:bg-gray-700 dark:text-gray-400 sticky top-0 uppercase z-10">
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
                sectors.map((item) => (
                  <SectorList sector={item} key={item._id} />
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center text-gray-500 py-4">
                    No sectors found.
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
export default Sector;
