import Home from "@/components/Home";
import JobList from "@/components/JobWithSidebar/JobList";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "International Recruit Agency",
  // description: "This is Home for NextCommerce Template",
  // other metadata
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
