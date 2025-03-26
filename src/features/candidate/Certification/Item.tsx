import { Certification } from "../context/FormCandidateContext";
import dayjs from "dayjs";
import DeleteCertification from "./DeleteCertification";
import EditCertification from "./EditCertification";

export default function CertificationCard({
  certification,
}: {
  certification: Certification;
}) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("DD MMMM YYYY");
  };
  return (
    <div className="  p-6 bg-white rounded-2xl shadow-lg border border-gray-200 relative">
      {/* Edit & Delete Icons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <EditCertification certification={certification} />
        <DeleteCertification id={certification._id} />
      </div>
      {/* Degree & Institution */} {/* Field of Study */}
      <h2 className="text-lg font-semibold text-gray-800">
        {certification.name}
      </h2>
      <p className="text-gray-600 text-md">
        {certification.issuingOrganization}
      </p>
      {/* Start & End Dates */}
      <p className="text-sm mt-2 text-gray-500">
        <span className="font-medium">
          {formatDate(certification.dateObtained)}
        </span>
      </p>
    </div>
  );
}
