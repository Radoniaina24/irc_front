import { useState } from "react";

import {
  CheckCircle,
  Briefcase,
  MapPin,
  Calendar,
  Building,
  AlertTriangle,
} from "lucide-react";
import { Badge, Button, Card, CardContent } from "./UI";

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

const JobList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
      {jobs.map((job) => (
        <Card
          key={job.id}
          className="relative shadow-lg rounded-2xl p-4 border border-gray-200 group overflow-hidden"
        >
          {job.urgent && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-tr-lg rounded-bl-lg">
              Urgent
            </div>
          )}
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h3>
              <div className="flex items-center gap-2">
                {job.remote && (
                  <Badge className="bg-green-500 text-white">Remote</Badge>
                )}
              </div>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Building className="w-4 h-4 mr-1" />
              {job.company}
            </div>
            <p className="text-gray-700 mb-2">
              {job.description.substring(0, 100)}...
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-blue-500 text-white">
                {job.contractType}
              </Badge>
              <Badge className="bg-purple-500 text-white">
                {job.experienceRequired}
              </Badge>
              <Badge className="bg-yellow-500 text-white">
                {job.studyLevels}
              </Badge>
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </div>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Briefcase className="w-4 h-4 mr-1" />
              {job.category.name} - {job.sector.name}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              Date limite : {job.deadline}
            </div>
            <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300  translate-y-4 ">
              Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobList;
