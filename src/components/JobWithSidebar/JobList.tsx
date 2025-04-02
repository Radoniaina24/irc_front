import { useState } from "react";
import { Briefcase, MapPin, Calendar, Building } from "lucide-react";
import { Badge, Button, Card, CardContent } from "./UI";
import dayjs from "dayjs";
import ToHtml from "@/lib/utils/toHtml";
import { error } from "console";

const jobs = [
  {
    id: 1,
    company: "TechCorp",
    title: "Développeur Full-Stack",
    description:
      "Nous recherchons un développeur full-stack expérimenté pour rejoindre notre équipe.",
    contractType: "CDI",
    experienceRequired: "2 ans",
    studyLevels: "Bac +3",
    location: "Paris, France",
    remote: true,
    category: { name: "Informatique" },
    sector: { name: "Développement Web" },
    deadline: "30/04/2025",
    urgent: true,
  },
  {
    id: 2,
    company: "DesignX",
    title: "Designer UX/UI",
    description:
      "Nous recherchons un designer UX/UI talentueux pour améliorer nos interfaces.",
    contractType: "Freelance",
    experienceRequired: "3 ans",
    studyLevels: "Bac +5",
    location: "Lyon, France",
    remote: false,
    category: { name: "Design" },
    sector: { name: "UX/UI" },
    deadline: "15/05/2025",
    urgent: false,
  },
  {
    id: 3,
    company: "DataSolutions",
    title: "Data Analyst",
    description:
      "Nous recherchons un Data Analyst pour analyser les tendances et optimiser nos stratégies.",
    contractType: "CDI",
    experienceRequired: "3 ans",
    studyLevels: "Bac +4",
    location: "Marseille, France",
    remote: false,
    category: { name: "Analyse de Données" },
    sector: { name: "Big Data" },
    deadline: "10/06/2025",
    urgent: true,
  },
  {
    id: 4,
    company: "MarketingPro",
    title: "Responsable Marketing Digital",
    description:
      "Nous recherchons un expert en marketing digital pour booster notre présence en ligne.",
    contractType: "CDI",
    experienceRequired: "5 ans",
    studyLevels: "Bac +5",
    location: "Toulouse, France",
    remote: true,
    category: { name: "Marketing" },
    sector: { name: "Marketing Digital" },
    deadline: "20/06/2025",
    urgent: false,
  },
  {
    id: 5,
    company: "FinTechX",
    title: "Analyste Financier",
    description:
      "Nous recherchons un analyste financier pour gérer et optimiser nos investissements.",
    contractType: "CDI",
    experienceRequired: "4 ans",
    studyLevels: "Bac +5",
    location: "Bordeaux, France",
    remote: false,
    category: { name: "Finance" },
    sector: { name: "Banque & Assurance" },
    deadline: "05/07/2025",
    urgent: true,
  },
  {
    id: 6,
    company: "CyberSec",
    title: "Expert en Cybersécurité",
    description:
      "Nous recrutons un expert en cybersécurité pour renforcer la protection de nos systèmes.",
    contractType: "CDI",
    experienceRequired: "5 ans",
    studyLevels: "Bac +5",
    location: "Nice, France",
    remote: true,
    category: { name: "Informatique" },
    sector: { name: "Sécurité Informatique" },
    deadline: "12/07/2025",
    urgent: false,
  },
  {
    id: 7,
    company: "HealthTech",
    title: "Développeur Mobile",
    description:
      "Nous recherchons un développeur mobile pour créer des applications innovantes en santé.",
    contractType: "CDI",
    experienceRequired: "2 ans",
    studyLevels: "Bac +3",
    location: "Lille, France",
    remote: true,
    category: { name: "Informatique" },
    sector: { name: "Développement Mobile" },
    deadline: "25/07/2025",
    urgent: false,
  },
  {
    id: 8,
    company: "AutoTech",
    title: "Ingénieur IA",
    description:
      "Nous recherchons un ingénieur IA pour développer des solutions innovantes pour l'automobile.",
    contractType: "CDI",
    experienceRequired: "4 ans",
    studyLevels: "Bac +5",
    location: "Grenoble, France",
    remote: false,
    category: { name: "Informatique" },
    sector: { name: "Intelligence Artificielle" },
    deadline: "30/07/2025",
    urgent: true,
  },
  {
    id: 9,
    company: "EcoEnergy",
    title: "Ingénieur Énergie Renouvelable",
    description:
      "Nous recrutons un ingénieur spécialisé dans les énergies renouvelables pour nos projets écologiques.",
    contractType: "CDI",
    experienceRequired: "3 ans",
    studyLevels: "Bac +5",
    location: "Nantes, France",
    remote: false,
    category: { name: "Énergie" },
    sector: { name: "Énergies Renouvelables" },
    deadline: "10/08/2025",
    urgent: false,
  },
  {
    id: 10,
    company: "BioPharma",
    title: "Chercheur en Biotechnologie",
    description:
      "Nous recherchons un chercheur en biotechnologie pour développer de nouveaux traitements.",
    contractType: "CDI",
    experienceRequired: "5 ans",
    studyLevels: "Bac +5",
    location: "Strasbourg, France",
    remote: false,
    category: { name: "Sciences" },
    sector: { name: "Biotechnologie" },
    deadline: "20/08/2025",
    urgent: true,
  },
];

const JobList = ({
  loading,
  job,
  error,
}: {
  loading: boolean;
  job: any;
  error: any;
}) => {
  dayjs.locale("en");
  // console.log(loading);
  const formatDate = (isoDate) => {
    return dayjs(isoDate).format("MMMM DD, YYYY ");
  };
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="relative shadow-lg rounded-2xl p-4 border border-gray-200 animate-pulse bg-gray-200"
          >
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-tr-lg rounded-bl-lg opacity-50"></div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-32 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-16 h-6 bg-gray-300 rounded-md"></div>
              </div>
              <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-3"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
                <div className="w-24 h-6 bg-gray-300 rounded-md"></div>
              </div>
              <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-3"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-3"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded-md mb-3"></div>
              <div className="w-1/2 h-10 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  const jobs = job?.jobPosts;
  if (!jobs?.length) {
    return (
      <div className="xl:max-w-[870px]">
        <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-70 mb-6 text-center">
          Not found
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="xl:max-w-[870px]">
        <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-70 mb-6 text-center">
          <p className="text-3xl text-gray-900 dark:text-white font-bold mb-4 md:text-4xl tracking-tight">
            Something&apos;s missing.
          </p>
          <p className="text-gray-500 text-lg dark:text-gray-400 font-light mb-4">
            Error while loading the job announcement.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      {jobs.map((item) => (
        <Card
          key={item._id}
          className="relative shadow-lg rounded-2xl p-4 border border-gray-200 group overflow-hidden"
        >
          {item.remote && (
            <div className="absolute top-0 left-0 bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-tr-lg rounded-bl-lg">
              Remote
            </div>
          )}
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              {/* <div className="flex items-center gap-2">
                {item.remote && (
                  <Badge className="bg-green-500 text-white text-xs">
                    Remote
                  </Badge>
                )}
              </div> */}
            </div>
            {item.recruiter.companyName && (
              <div className="flex items-center text-gray-600 text-sm ">
                <Building className="w-4 h-4 mr-1" />
                {item.recruiter.companyName}
              </div>
            )}

            <ToHtml content={`${item.description.substring(0, 100)}`} />

            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-blue-500 text-white">
                {item.contractType}
              </Badge>
              <Badge className="bg-purple-500 text-white">
                {item.experienceRequired}
              </Badge>
              <Badge className="bg-yellow-500 text-white">
                {item.studyLevels}
              </Badge>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              {item.location}
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Briefcase className="w-4 h-4 mr-1" />
              {item.sector.name}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              Deadline : {formatDate(item.deadline)}
            </div>
            {/* <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300  translate-y-4 ">
              Details
            </Button> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobList;
