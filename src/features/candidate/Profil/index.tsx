import {
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import ProfileSkills from "./Skills";
import ProfileLanguages from "./Language";
import ProfileSection from "./ProfilSection";

export default function UserProfileCandidate() {
  const user = {
    photo:
      "https://res.cloudinary.com/dx3xhdaym/image/upload/v1740895258/cld-sample.jpg",
    lastname: "Doe",
    firstname: "John",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    role: "Admin", // Peut être "Admin", "Recruteur" ou "Candidat"
    skills: ["React", "Next.js", "Node.js"],
    languages: [
      { name: "English", level: "Fluent" },
      { name: "French", level: "Intermediate" },
    ],
    address: "123 Main Street, New York, USA",
  };

  const getRoleBadge = (role: string) => {
    const roleStyles: Record<string, string> = {
      Admin: "bg-red-100 text-red-700",
      Recruteur: "bg-blue-100 text-blue-700",
      Candidat: "bg-green-100 text-green-700",
    };
    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
          roleStyles[role] || "bg-gray-100 text-gray-700"
        }`}
      >
        {role}
      </span>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 border border-gray-200">
      {/* Profil */}
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.photo}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md"
        />
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {user.firstname} {user.lastname}
            </h2>
            {getRoleBadge(user.role)}
          </div>
          <UserInfo icon={<MailIcon className="w-4 h-4" />} text={user.email} />
          <UserInfo
            icon={<PhoneIcon className="w-4 h-4" />}
            text={user.phone}
          />
        </div>
      </div>

      {/* Informations */}
      <div className="space-y-4">
        <ProfileSkills title="Skills" items={user.skills} />
        <ProfileLanguages title="Langues" items={user.languages} />
        <ProfileSection
          title="Adresse"
          content={user.address}
          icon={<MapPinIcon className="w-5 h-5 text-gray-500" />}
        />
      </div>
    </div>
  );
}

// Composant pour afficher une ligne d'information (Email, Téléphone)
function UserInfo({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <div className="flex items-center text-gray-500 mt-1 space-x-2">
      {icon}
      <p>{text}</p>
    </div>
  );
}
