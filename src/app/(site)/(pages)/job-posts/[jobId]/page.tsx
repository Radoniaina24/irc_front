"use client";
import JobId from "@/components/JobWithSidebar/JobId";
import { useGetJobByIdQuery } from "@/lib/api/jobApi";
import React from "react";

export default function JobPost({ params }: { params: { jobId: string } }) {
  const { data, isLoading, error } = useGetJobByIdQuery(params.jobId);
  return (
    <div>
      <JobId data={data} isLoading={isLoading} error={error} />
    </div>
  );
}
