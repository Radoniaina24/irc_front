import React from "react";
import DashboardStats from "./DashboardStatsAdmin";

export default function Dashboard({ activeTab, user }) {
  return (
    <div
      className={`xl:max-w-[770px] w-full mt-20   py-9.5 px-4 sm:px-7.5 xl:px-10  ${
        activeTab === "dashboard" ? "block" : "hidden"
      }`}
    >
      {user.role === "admin" && <DashboardStats />}
    </div>
  );
}
