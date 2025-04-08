import React from "react";
import DashboardStats from "./DashboardStatsAdmin";
import DashboardR from "@/features/recruiter/info/DashboardR";

export default function Dashboard({ activeTab, user }) {
  return (
    <div
      className={` my-auto  py-9.5 px-4 sm:px-7.5 xl:px-10  ${
        activeTab === "dashboard" ? "block" : "hidden"
      }`}
    >
      {user.role === "admin" && <DashboardStats />}
      {user.role === "recruiter" && <DashboardR />}
    </div>
  );
}
