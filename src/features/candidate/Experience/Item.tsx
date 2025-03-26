import { Experience } from "../context/FormCandidateContext";
import dayjs from "dayjs";
import EditExperience from "./EditExperience";
import DeleteExperience from "./DeleteExperience";

export default function ExperienceCard({
  experience,
}: {
  experience: Experience;
}) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("YYYY");
  };
  return (
    <div className="  p-6 bg-white rounded-2xl shadow-lg border border-gray-200 relative">
      {/* Edit & Delete Icons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <EditExperience experience={experience} />
        <DeleteExperience id={experience._id} />
      </div>
      {/* Degree & Institution */} {/* Field of Study */}
      <h2 className="text-xl font-semibold text-gray-800">
        {experience.company}
      </h2>
      <p className="text-gray-600 text-lg">{experience.position}</p>
      <p className="text-gray-500 ps-2 text-md">
        {experience.description.slice(0, 60)}...
      </p>
      {/* Start & End Dates */}
      <p className="text-sm mt-2 text-gray-500">
        <span className="font-medium">
          {formatDate(experience.startDate)} -{" "}
        </span>
        <span className="font-medium">{formatDate(experience.endDate)}</span>
      </p>
    </div>
  );
}
