import React, { useState } from "react";
import Pagination from "@/components/Orders/Pagination";
import CategoryList from "./CategoryList";
import Search from "@/components/Orders/Search";
import { useGetAllCategoryQuery } from "@/lib/api/categoryApi";
import AddCategory from "./AddCategory";

const Category = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error } = useGetAllCategoryQuery({
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
      <div className="text-red-500">Error while loading the categories.</div>
    );
  const categories = data.categories;
  return (
    <div className="px-5 py-5">
      <div className="shadow-md overflow-x-auto overflow-y-auto relative sm:rounded-lg">
        <div className="flex flex-wrap justify-between items-center px-4 py-2">
          <Search onQuery={setSearch} query={search} />
          <AddCategory />
        </div>

        <div className="h-100 lg:h-[650px] overflow-y-auto">
          <table className="text-gray-500 text-left text-sm w-full dark:text-gray-400 rtl:text-right">
            <thead className="bg-gray-50 text-gray-700 text-xs dark:bg-gray-700 dark:text-gray-400 sticky top-0 uppercase z-10">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sector
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((item) => (
                  <CategoryList category={item} key={item._id} />
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="text-center text-gray-500 py-4">
                    No categories found.
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
export default Category;
