import React from "react";
const SingleItem = ({ item }: { item: any }) => {
  return (
    <a href="#" className="flex flex-col group items-center">
      <div className="flex bg-blue-600 h-32.5 justify-center rounded-full w-full ease-in-out hover:bg-blue-700 items-center max-w-[130px] mb-4 transition-all">
        <h3 className="p-7 text-center text-sm text-white font-medium inline-block">
          {item.name}
        </h3>
      </div>
    </a>
  );
};

export default SingleItem;
