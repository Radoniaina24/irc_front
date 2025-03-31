"use client";
import { MapPinIcon, MailIcon, PhoneIcon } from "lucide-react";
import ProfileSkills from "./Skills";
import ProfileLanguages from "./Language";
import ProfileSection from "./ProfilSection";
import { useGetProfilQuery } from "@/lib/api/candidateApi";
import Photo from "./info";
import Info from "./info";

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

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 border border-gray-200">
      {/* Profil */}
      <Info user={user} />

      {/* Informations */}
      <div className="space-y-4">
        <ProfileSkills title="Skills" items={user.skills} />
        <ProfileLanguages title="Language" items={user.languages} />
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
