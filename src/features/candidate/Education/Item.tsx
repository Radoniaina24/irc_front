import { Trash } from "lucide-react";
import { Education } from "../context/FormCandidateContext";
import dayjs from "dayjs";
import EditEducation from "./EditEducation";
import DeleteEducation from "./DeleteEducation";

export default function EducationCard({ education }: { education: Education }) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("YYYY");
  };
  return (
    <div className="  p-6 bg-white rounded-2xl shadow-lg border border-gray-200 relative">
      {/* Edit & Delete Icons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <EditEducation education={education} />
        <DeleteEducation id={education._id} />
      </div>
      {/* Degree & Institution */} {/* Field of Study */}
      <h2 className="text-lg font-semibold text-gray-800">
        {education.institution}
      </h2>
      <p className="text-gray-500 text-md">
        {education.degree} - {education.fieldOfStudy}
      </p>
      {/* Start & End Dates */}
      <p className="text-sm text-gray-500">
        <span className="font-medium">
          {formatDate(education.startDate)} -{" "}
        </span>
        <span className="font-medium">{formatDate(education.endDate)}</span>
      </p>
    </div>
  );
}
