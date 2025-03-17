import MyAccount from "@/components/MyAccount";
import React from "react";

import { Metadata } from "next";
import AuthGuard from "@/components/Auth/AuthGuard/AuthGuard";
export const metadata: Metadata = {
  title: "My Account | IRC",

  // other metadata
};

const MyAccountPage = () => {
  return (
    <main>
      <AuthGuard>
        <MyAccount />
      </AuthGuard>
    </main>
  );
};

export default MyAccountPage;
