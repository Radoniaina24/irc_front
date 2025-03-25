"use client";
import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";
import { FormPassProvider } from "@/features/candidate/context/FormCandidateContext";
import AddForm from "@/features/candidate/form/AddForm";

const SignupCandidate = () => {
  return (
    <>
      <Breadcrumb title={"Signup"} pages={["Signup"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[800px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account <br />
                Candidate
              </h2>
            </div>

            <div className="mt-5.5">
              <FormPassProvider>
                <AddForm />
              </FormPassProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupCandidate;
