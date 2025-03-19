import React from "react";
import { FiEdit } from "react-icons/fi";
import { GrView } from "react-icons/gr";
const RecruiterActions = ({ toggleEdit, toggleDetails }: any) => {
  return (
    <>
      <button
        onClick={toggleDetails}
        className="hover:bg-gray-2 rounded-full p-2"
      >
        <GrView size={16} />
      </button>
      {/* <button onClick={toggleEdit} className="hover:bg-gray-2 rounded-full p-2">
        <FiEdit size={16} />
      </button> */}
    </>
  );
};

export default RecruiterActions;
