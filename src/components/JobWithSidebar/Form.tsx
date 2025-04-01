import React from "react";
import ContractType from "./ContractType";
import ExperienceLevel from "./ExperienceLevel";
import StudyLevel from "./StudyLevel";
import { useSectorsOptions } from "@/features/job/options";
import SelectInput from "./SelectInput";
const contractType = [
  {
    name: "CDI",
    products: 10,
    isRefined: true,
  },
  {
    name: "CDD",
    products: 12,
    isRefined: false,
  },
  {
    name: "Freelance",
    products: 30,
    isRefined: false,
  },
  {
    name: "Alternance",
    products: 23,
    isRefined: false,
  },
  {
    name: "Interim",
    products: 10,
    isRefined: false,
  },
  {
    name: "Stage",
    products: 13,
    isRefined: false,
  },
];
const experienceLevel = [
  {
    name: "1 year",
    products: 10,
    value: "1 ans",
  },
  {
    name: "2 years",
    products: 23,
    value: "2 ans",
  },
  {
    name: "3 years",
    products: 8,
    value: "3 ans",
  },
  {
    name: "4 years",
    products: 8,
    value: "4 ans",
  },
  {
    name: "5 years",
    products: 8,
    value: "5 ans",
  },
];
const studyLevel = [
  {
    name: "Bac",
    products: 10,
  },
  {
    name: "Bac +2",
    products: 23,
  },
  {
    name: "Bac +3",
    products: 8,
  },
  {
    name: "Bac +4",
    products: 8,
  },
  {
    name: "Bac +5",
    products: 8,
  },
];
export default function Form({ formik }: { formik?: any }) {
  const { options: sectors, isLoading: isSectorLoading } = useSectorsOptions();
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-6 sticky top-0">
        {/* <!-- filter box --> */}
        <div className="bg-white  shadow-1 rounded-lg py-3 px-5 categoryJob">
          <div className="">
            <SelectInput
              name={"sector"}
              options={sectors}
              isLoading={isSectorLoading}
              label={"Sector"}
              formik={formik}
              placeholder="Sector"
            />
          </div>
        </div>
        {/* <!-- category box --> */}
        <ContractType type={contractType} formik={formik} />

        {/* <!-- gender box --> */}
        <ExperienceLevel type={experienceLevel} formik={formik} />

        {/* <!--Study level --> */}
        <StudyLevel type={studyLevel} formik={formik} />
      </div>
    </form>
  );
}
