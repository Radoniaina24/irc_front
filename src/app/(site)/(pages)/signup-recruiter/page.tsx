import React from "react";
import { Metadata } from "next";
import SignupRecruiter from "@/components/Auth/Signup/Recruiter";
export const metadata: Metadata = {
  title: "Signin-Recruiter  | IRC",
};
const SigninPage = () => {
  return (
    <main>
      <SignupRecruiter />
    </main>
  );
};

export default SigninPage;
