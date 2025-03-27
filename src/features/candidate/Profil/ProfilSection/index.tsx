import { PencilIcon } from "lucide-react";

export default function ProfileSection({
  title,
  content,
  icon,
}: {
  title: string;
  content?: string;
  icon?: JSX.Element;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl flex items-center shadow-sm border border-gray-200">
      {icon && <div className="mr-3">{icon}</div>}
      <div className="flex-1">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
      <button className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
        <PencilIcon className="w-4 h-4 text-gray-700" />
      </button>
    </div>
  );
}
