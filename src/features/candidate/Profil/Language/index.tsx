import { PencilIcon, PlusCircleIcon, TrashIcon } from "lucide-react";
import AddLanguage from "./AddLanguage";
import { useGetLanguageQuery } from "@/lib/api/languageApi";
import Skeleton from "@/components/Ui/Skeleton";
import DeleteLanguage from "./DeleteLanguage";
import EditLanguage from "./EditLanguage";

export default function ProfileLanguages({
  title,
  items,
}: {
  title: string;
  items: { name: string; level: string }[];
}) {
  const levelColors = {
    Beginner: "bg-red-100 text-red-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-green-100 text-green-700",
    Fluent: "bg-blue-100 text-blue-700",
    Native: "bg-purple-100 text-purple-700",
  };
  const { data, isLoading, error } = useGetLanguageQuery("");
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200 animate-pulse"
          >
            {/* Nom de l'élément */}
            <Skeleton className="h-4 w-1/4" />

            {/* Niveau */}
            <Skeleton className="h-4 w-16 rounded-full" />

            {/* Boutons */}
            <div className="flex space-x-1.5">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  // console.log(data);
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-md font-semibold text-gray-700">{title}</h3>
        <AddLanguage />
      </div>

      <div className="space-y-2">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm border border-gray-200"
            >
              <span className="text-gray-700 text-sm font-medium">
                {item.language}
              </span>
              <span
                key={index}
                className={`px-2.5 py-1 text-xs font-medium rounded-full shadow-sm hover:opacity-80 transition ${
                  levelColors[item.proficiency] || "bg-gray-100 text-gray-700"
                }`}
              >
                {item.proficiency}
              </span>
              <div className="flex space-x-1.5">
                <EditLanguage language={item} />
                <DeleteLanguage id={item._id} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
