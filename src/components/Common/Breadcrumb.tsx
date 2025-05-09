import Link from "next/link";
import React from "react";

const Breadcrumb = ({ title, pages }: { title?: string; pages?: any }) => {
  return (
    <div className="overflow-hidden shadow-breadcrumb pt-[209px] sm:pt-[155px] lg:pt-[132px] xl:pt-[165px]">
      <div className="">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 py-5 xl:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center items-center justify-between gap-3">
            <h1 className="font-semibold text-dark text-xl sm:text-2xl xl:text-custom-2">
              {title}
            </h1>

            <ul className="flex items-center gap-2 ">
              <li className="text-custom-sm hover:text-blue">
                {pages && <Link href="/">Home /</Link>}
              </li>

              {pages.length > 0 &&
                pages.map((page, key) => (
                  <li
                    className="text-custom-sm last:text-blue capitalize"
                    key={key}
                  >
                    {page}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
