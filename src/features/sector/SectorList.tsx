import React from "react";

import DeleteButton from "./DeleteButton";
export default function SectorList(sector: any) {
  const sect = sector.sector;
  return (
    <>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4"> {sect.name}</td>
        <td className="px-6 py-4">
          <DeleteButton id={sect._id} />
        </td>
      </tr>
    </>
  );
}
