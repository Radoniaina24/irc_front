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
} from "lucide-react";
import { Badge } from "@/components/Ui/Badge";
import { Card, CardContent } from "@/components/Ui/Card";
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
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className=" w-full lg:max-w-4xl max-w-lg md:max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
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
              <ToHtml content={job.description} />
              <h3 className="text-lg font-semibold text-gray-800 mt-6">
                Compétences requises
              </h3>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                <li>Analyse financière</li>
                <li>Excel</li>
                <li>Comptabilité</li>
                <li>Modélisation financière</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
}
