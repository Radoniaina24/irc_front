"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Search from "../Orders/Search";

import Form from "./Form";
import { useFormik } from "formik";
import JobList from "./JobList";
import { useGetAllJobQuery } from "@/lib/api/jobApi";
import Pagination from "../Orders/Pagination";
import { PaginationSkeleton } from "./UI";
import StudyLevel from "./StudyLevel";
const initialvalues = {
  sector: { value: "", label: "" },
  contractType: [],
  experienceLevel: [],
  studyLevel: [],
};
const ShopWithSidebar = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    // closing sidebar while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const formik = useFormik({
    initialValues: initialvalues,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {},
  });
  // const sectorId = formik.values.sector?.value || null;
  const { data, isLoading, error } = useGetAllJobQuery({
    search,
    limit,
    page,
    sectorId:
      formik.values.sector?.value !== undefined
        ? formik.values.sector.value
        : "",
    contractType: formik.values.contractType,
    experienceRequired: formik.values.experienceLevel,
    studyLevels: formik.values.studyLevel,
  });
  // console.log(formik.values.studyLevel);
  return (
    <>
      <Breadcrumb title={"Explore All Jobs"} pages={""} />
      <section className="overflow-hidden  relative pb-20 pt-5 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* <!-- Sidebar Start --> */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? "translate-x-0 bg-white p-5 h-screen overflow-y-auto"
                  : "-translate-x-full"
              }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-8 h-8 rounded-md bg-white shadow-1 ${
                  stickyMenu
                    ? "lg:top-20 sm:top-34.5 top-35"
                    : "lg:top-24 sm:top-39 top-37"
                }`}
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.0068 3.44714C10.3121 3.72703 10.3328 4.20146 10.0529 4.5068L5.70494 9.25H20C20.4142 9.25 20.75 9.58579 20.75 10C20.75 10.4142 20.4142 10.75 20 10.75H4.00002C3.70259 10.75 3.43327 10.5742 3.3135 10.302C3.19374 10.0298 3.24617 9.71246 3.44715 9.49321L8.94715 3.49321C9.22704 3.18787 9.70147 3.16724 10.0068 3.44714Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.6865 13.698C20.5668 13.4258 20.2974 13.25 20 13.25L4.00001 13.25C3.5858 13.25 3.25001 13.5858 3.25001 14C3.25001 14.4142 3.5858 14.75 4.00001 14.75L18.2951 14.75L13.9472 19.4932C13.6673 19.7985 13.6879 20.273 13.9932 20.5529C14.2986 20.8328 14.773 20.8121 15.0529 20.5068L20.5529 14.5068C20.7539 14.2876 20.8063 13.9703 20.6865 13.698Z"
                    fill=""
                  />
                </svg>
              </button>
              {/* Form */}

              <Form formik={formik} />
            </div>
            {/* // <!-- Sidebar End --> */}

            {/* // <!-- Content Start --> */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  {/* <!-- top bar left --> */}
                  <div className="flex items-center space-x-2 text-gray-700 text-sm font-medium">
                    <h2>Job Announcement:</h2>
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {data?.totalJobPosts ?? 0}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center  ">
                    <Search query={search} onQuery={setSearch} />
                  </div>
                </div>
              </div>

              {/* <!-- Job Grid Tab Content Start --> */}
              <JobList loading={isLoading} job={data} error={error} />
              {/* <!-- Job Pagination Start --> */}
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

              {/* <!-- Job Pagination End --> */}
            </div>
            {/* // <!-- Content End --> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;
