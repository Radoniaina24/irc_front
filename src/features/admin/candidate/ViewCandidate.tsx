import React, { useState } from "react";

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
import Modal from "./Modal";

export default function ViewCandidate({ candidate }: { candidate?: any }) {
  dayjs.locale("en");
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  const [open, setOpen] = useState<boolean>(false);
  // console.log(candidate);
  return (
    <div>
      <button onClick={() => setOpen(true)}>
        <AiOutlineFolderView size={20} className="text-green-500" />
      </button>
      <Modal isOpen={open} closeModal={() => setOpen(false)} width="700px">
        <div className=" px-2 w-full lg:max-w-4xl max-w-lg md:max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
          <Card className="max-w-2xl mx-auto p-6 shadow-lg border border-gray-200 rounded-2xl">
            <CardContent>sdfsdfs</CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
}
