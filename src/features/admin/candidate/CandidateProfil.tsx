"use client";
import React from "react";
import { Briefcase, GraduationCap, Star, FolderOpen } from "lucide-react";
import { useGetInfoCandidateQuery } from "@/lib/api/candidateApi";
import SkeletonCandidateProfile from "./SkeletonProfil";

const CandidateProfile = ({ id }: { id: string }) => {
  const {
    data: candidate,
    isLoading,
    error,
  } = useGetInfoCandidateQuery({ id: id });
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
    });
  const data = {
    candidate: {
      user: {
        firstName: "Caleb",
        lastName: "ANDRIANINA",
        email: "caleb@gmail.com",
      },
      permissions: "Allowed",
    },
    education: [
      {
        _id: "1",
        institution: "EPSI Tsiazotafo",
        degree: "Licence",
        fieldOfStudy: "Développeur web",
        startDate: "2019-10-26",
        endDate: "2022-02-15",
      },
      {
        _id: "2",
        institution: "Lycée Galieni Andohalo",
        degree: "BAC",
        fieldOfStudy: "Série D",
        startDate: "2014-10-10",
        endDate: "2017-07-10",
      },
    ],
    experience: [
      {
        _id: "1",
        company: "E-media",
        position: "Développeur Full Stack",
        startDate: "2024-12-26",
        endDate: "2026-01-12",
        description:
          "Développeur Full Stack passionné avec 5+ ans d'expérience. Maîtrise de React, Node.js, MongoDB, déploiement sur AWS, CI/CD avec Docker et Jenkins.",
      },
      {
        _id: "2",
        company: "AllForOne",
        position: "Développeur Next.js",
        startDate: "2024-03-10",
        endDate: "2024-08-10",
        description:
          "Développeur front-end spécialisé en React et Next.js. Création d’interfaces performantes et optimisées SEO avec SSR et SSG.",
      },
    ],
    certification: [
      {
        _id: "1",
        name: "Certified Scrum Master",
        issuingOrganization: "Scrum Alliance",
        dateObtained: "2025-03-14",
      },
    ],
    portfolio: [
      {
        _id: "1",
        title: "International Recruit Agency",
        role: "Front-end and Back-end",
        description:
          "Création d’un site web personnel pour partager des projets et articles techniques.",
        link: "https://international-recruit-agency.vercel.app",
        skills: ["Reactjs", "Nextjs", "MongoDB"],
        file: {
          type: "pdf",
          url: "https://res.cloudinary.com/dx3xhdaym/raw/upload/v1743061090/portfolio/Cahier_de_charge_site_web_IRC_20250327.pdf",
        },
      },
    ],
  };

  if (isLoading) {
    return <SkeletonCandidateProfile />;
  }
  const info = candidate;
  return (
    <div className=" mx-auto px-6 py-10 font-sans">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 shadow-lg mb-10">
        <h1 className="text-4xl font-bold mb-1">
          {info.candidate.user.firstName} {info.candidate.user.lastName}
        </h1>
        <p className="text-sm">{info.candidate.user.email}</p>
      </div>

      {/* SECTION BLOCK */}
      <div className="space-y-10">
        {/* ÉDUCATION */}
        <section>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xl mb-4">
            <GraduationCap className="w-6 h-6" />
            <h2>Education</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {info.education &&
              info.education.map((edu) => (
                <div
                  key={edu._id}
                  className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all border-l-4 border-indigo-500"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {edu.institution}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {edu.degree} - {edu.fieldOfStudy}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(edu.startDate)} → {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* EXPÉRIENCE */}
        <section>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xl mb-4">
            <Briefcase className="w-6 h-6" />
            <h2>Experience</h2>
          </div>
          <div className="space-y-6">
            {info.experience &&
              info.experience.map((exp) => (
                <div
                  key={exp._id}
                  className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-all border-l-4 border-purple-500"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-500">{exp.company}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 mb-2">
                    {formatDate(exp.startDate)} → {formatDate(exp.endDate)}
                  </p>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
          </div>
        </section>

        {/* CERTIFICATION */}
        <section>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xl mb-4">
            <Star className="w-6 h-6" />
            <h2>Certifications</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {info.certification &&
              info.certification.map((cert) => (
                <div
                  key={cert._id}
                  className="bg-white rounded-xl p-5 shadow border-l-4 border-yellow-500"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {cert.issuingOrganization}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(cert.dateObtained)}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xl mb-4">
            <FolderOpen className="w-6 h-6" />
            <h2>Portfolio</h2>
          </div>
          <div className="grid md:grid-cols-1 gap-6">
            {info.portfolio &&
              info.portfolio.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl p-6 shadow border-l-4 border-teal-500"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm italic text-gray-600">{item.role}</p>
                  <p className="text-sm text-gray-500 my-3">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        🌐 View website
                      </a>
                    )}

                    {item.file && item.file?.type && (
                      <a
                        href={item.file.url}
                        className="text-sm text-purple-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📄 View document (PDF)
                      </a>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CandidateProfile;
