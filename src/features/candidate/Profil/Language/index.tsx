import { PencilIcon, PlusCircleIcon, TrashIcon } from "lucide-react";

export default function ProfileLanguages({
  title,
  items,
}: {
  title: string;
  items: { name: string; level: string }[];
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        <button className="p-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition duration-300">
          <PlusCircleIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200"
          >
            <span className="text-gray-700 text-sm font-medium">
              {item.name}
            </span>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full shadow-sm
                ${
                  item.level === "Débutant"
                    ? "bg-red-100 text-red-700"
                    : item.level === "Intermédiaire"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
            >
              {item.level}
            </span>
            <div className="flex space-x-1.5">
              <button className="p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300">
                <PencilIcon className="w-4 h-4 text-gray-700" />
              </button>
              <button className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-300">
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
