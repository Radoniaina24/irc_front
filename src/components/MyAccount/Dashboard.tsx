import React from "react";

export default function Dashboard({ activeTab, user }) {
  return (
    <div
      className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 py-9.5 px-4 sm:px-7.5 xl:px-10 ${
        activeTab === "dashboard" ? "block" : "hidden"
      }`}
    >
      <p className="text-dark">
        Hello {user.firstName + " "}
        {user.lastName}
      </p>
    </div>
  );
}
