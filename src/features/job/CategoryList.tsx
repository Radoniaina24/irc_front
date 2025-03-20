import React from "react";

import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
export default function CategoryList(category: any) {
  const cat = category.category;
  return (
    <>
      <tr className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
        <td className="px-6 py-4"> {cat.name}</td>
        <td className="px-6 py-4"> {cat.sector.name}</td>
        <td className="flex gap-3 px-6 py-4">
          <EditButton id={cat._id} name={cat.name} sector={cat.sector._id} />
          <DeleteButton id={cat._id} />
        </td>
      </tr>
    </>
  );
}
