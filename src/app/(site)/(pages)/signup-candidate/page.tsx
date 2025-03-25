import React from "react";
import { Metadata } from "next";
import SignupCandidate from "@/components/Auth/Signup";
export const metadata: Metadata = {
  title: "Signup-Candidate  | IRC",

  // other metadata
};

const SignupPage = () => {
  return (
    <main>
      <SignupCandidate />
    </main>
  );
};

export default SignupPage;
