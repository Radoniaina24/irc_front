import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signup-Candidate  | IRC",

  // other metadata
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
