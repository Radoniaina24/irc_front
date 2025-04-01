import React, { useState } from "react";
import Pagination from "@/components/Orders/Pagination";
import SectorList from "./SectorList";
import Search from "@/components/Orders/Search";
import { useGetAllSectorQuery } from "@/lib/api/sectorApi";
import AddSector from "./AddSector";
import { PaginationSkeleton } from "@/components/JobWithSidebar/UI";

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
    return (
      <div className="px-5 py-5">
        <div className=" relative ">
          {/* Search and Add Button Skeleton */}
          <div className="flex flex-wrap justify-between items-center px-4 py-2">
            <div className="h-8 w-64 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
          </div>

          {/* Table Skeleton */}
          <div className="h-100 lg:h-[650px] overflow-y-auto">
            <table className="text-gray-500 text-left text-sm w-full dark:text-gray-400 rtl:text-right">
              <thead className="bg-gray-50 text-gray-700 text-xs dark:bg-gray-700 dark:text-gray-400 sticky top-0 uppercase z-10">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(9)].map((_, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    </td>
                    <td className=" flex gap-2 items-center px-6 py-4">
                      <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
                      <div className="h-7 w-7 bg-gray-300 rounded-md"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center gap-2">
            <div className="h-8 w-8 bg-gray-300  rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
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
      <div className=" overflow-x-auto overflow-y-auto relative ">
        <div className="flex flex-wrap justify-between items-center  space-y-2 sm:space-y-0  px-4 py-2">
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
export default Sector;
