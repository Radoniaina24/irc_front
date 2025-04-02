import React, { useState } from "react";
import Modal from "./Modal";
import { AiOutlineFolderView } from "react-icons/ai";

import dayjs from "dayjs";
import {
  Briefcase,
  MapPin,
  Calendar,
  GraduationCap,
  Clock,
  Building,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/Ui/Badge";
import { Card, CardContent } from "@/components/Ui/card";
import ToHtml from "@/lib/utils/toHtml";

export default function ViewJobPost({ job }: { job: any }) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <AiOutlineFolderView size={20} className="text-green-500" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)} width="700px">
        <div className=" px-2 w-full lg:max-w-4xl max-w-lg md:max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
          <Card className="max-w-2xl mx-auto p-6 shadow-lg border border-gray-200 rounded-2xl">
            <CardContent>
              <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Briefcase size={16} /> {job.contractType}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin size={16} /> {job.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Calendar size={16} /> Deadline : {formatDate(job.deadline)}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <GraduationCap size={16} /> {job.studyLevels}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock size={16} /> Experience : {job.experienceRequired}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Building size={16} /> Sector : {job.sector.name}
                </Badge>
              </div>
              <h2 className="my-3 uppercase font-bold text-blue-500">
                Company activity
              </h2>
              <ToHtml content={job.description} />
              <h2 className="my-3 uppercase font-bold text-blue-500">
                Missions
              </h2>
              <ToHtml content={job?.missions} />
              <h2 className="my-3 uppercase font-bold text-blue-500">
                Candidate profile
              </h2>
              <ToHtml content={job?.candidate_profil} />
              <h3 className="text-lg font-semibold text-gray-800 mt-6">
                Required skills
              </h3>

              <ul className="mt-3 space-y-2">
                {job.skills.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-800 bg-gray-100 px-3 py-2 rounded-lg shadow-sm transition-all duration-300 hover:bg-gray-200"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
}
