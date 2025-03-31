"use client";
import React, { useMemo, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout, selectUser } from "@/redux/features/auth/authSlice";
import { authAPI, useLogoutMutation } from "@/lib/api/authApi";
import { useRouter } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { GrUserSettings } from "react-icons/gr";
import Recruiter from "../Orders";
import { SlLogout } from "react-icons/sl";
import { MdOutlineCategory, MdOutlinePassword } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { PiReadCvLogoLight } from "react-icons/pi";
import Dashboard from "./Dashboard";
import Sector from "@/features/sector";
import Category from "@/features/category";
import Job from "@/features/job";
import ChangePassword from "@/features/recruiter/password";
import { FaUserCog } from "react-icons/fa";
import InfoRecruteur from "@/features/recruiter/info";
import { recruiterAPI } from "@/lib/api/recruiterApi";
import { jobAPI } from "@/lib/api/jobApi";
import JobAdmin from "@/features/admin/job";
import { GiDiploma } from "react-icons/gi";
import ChangePasswordCandidate from "@/features/candidate/password";
import Education from "@/features/candidate/Education";
import { FcDiploma1 } from "react-icons/fc";
import Experience from "@/features/candidate/Experience";
import { GrCertificate } from "react-icons/gr";
import Certification from "@/features/candidate/Certification";
import { certificationAPI } from "@/lib/api/certificationApi";
import { experienceAPI } from "@/lib/api/experienceApi";
import { educationAPI } from "@/lib/api/educationApi";
import { FaPortrait } from "react-icons/fa";
import Portfolio from "@/features/candidate/Porfolio";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileCandidate from "@/features/candidate/Profil";
import { languageAPI } from "@/lib/api/languageApi";
import { skilleAPI } from "@/lib/api/skillsApi";
import { portfolioAPI } from "@/lib/api/portfolioApi";
import Candidate from "@/features/admin/candidate";
type Tab = {
  id: string;
  label: string;
  icon: JSX.Element;
  adminOnly?: boolean;
  recruiterOnly?: boolean;
  candidateOnly?: boolean;
};
const TABS: Tab[] = [
  {
    id: "profile",
    label: " My Profile",
    icon: <FaRegUserCircle size={18} />,
    candidateOnly: true,
  },
  { id: "dashboard", label: "Dashboard", icon: <RxDashboard size={18} /> },

  {
    id: "job-recruiter",
    label: "Job Announcement",
    icon: <PiReadCvLogoLight size={18} />,
    recruiterOnly: true,
  },
  {
    id: "job-admin",
    label: "Job Announcement",
    icon: <PiReadCvLogoLight size={18} />,
    adminOnly: true,
  },
  {
    id: "recruiter",
    label: "Recruiter",
    icon: <GrUserSettings size={18} />,
    adminOnly: true,
  },
  {
    id: "candidate",
    label: "Candidate",
    icon: <GrUserSettings size={18} />,
    adminOnly: true,
  },
  {
    id: "sector",
    label: "Sector",
    icon: <MdOutlineCategory size={18} />,
    adminOnly: true,
  },
  {
    id: "education",
    label: "Education",
    icon: <GiDiploma size={18} />,
    candidateOnly: true,
  },
  {
    id: "experience",
    label: "Experience",
    icon: <FcDiploma1 size={18} />,
    candidateOnly: true,
  },
  {
    id: "certification",
    label: "Certification",
    icon: <GrCertificate size={18} />,
    candidateOnly: true,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: <FaPortrait size={18} />,
    candidateOnly: true,
  },
  {
    id: "info-recruiter",
    label: "Personal Information",
    icon: <FaUserCog size={18} />,
    recruiterOnly: true,
  },
  {
    id: "password-recruiter",
    label: "Change Password",
    icon: <MdOutlinePassword size={18} />,
    recruiterOnly: true,
  },
  {
    id: "password-candidate",
    label: "Change Password",
    icon: <MdOutlinePassword size={18} />,
    candidateOnly: true,
  },
  {
    id: "category",
    label: "Category",
    icon: <BiCategoryAlt size={18} />,
    adminOnly: true,
  },
];

const MyAccount = () => {
  const [logoutUser] = useLogoutMutation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const handleLogout = async () => {
    try {
      await logoutUser("").unwrap();
      dispatch(logout());
      dispatch(recruiterAPI.util.resetApiState());
      dispatch(jobAPI.util.resetApiState()); // Réinitialiser RTK Query
      dispatch(authAPI.util.resetApiState()); // Réinitialiser RTK Query
      dispatch(certificationAPI.util.resetApiState());
      dispatch(experienceAPI.util.resetApiState());
      dispatch(educationAPI.util.resetApiState());
      dispatch(languageAPI.util.resetApiState());
      dispatch(skilleAPI.util.resetApiState());
      dispatch(portfolioAPI.util.resetApiState());
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  const availableTabs = useMemo(() => {
    return TABS.filter(({ adminOnly, recruiterOnly, candidateOnly }) => {
      if (adminOnly && user.role !== "admin") return false;
      if (recruiterOnly && user.role !== "recruiter") return false;
      if (candidateOnly && user.role !== "candidate") return false;
      return true;
    });
  }, [user.role]);
  return (
    <>
      <Breadcrumb title="My Account" pages={["my account"]} />
      <section className="bg-gray-2 overflow-hidden py-20">
        <div className="flex flex-col w-full gap-7.5 max-w-[1170px] mx-auto px-4 sm:px-8 xl:flex-row xl:px-0">
          {/* Sidebar */}
          <aside className="bg-white rounded-xl shadow-1 w-full xl:max-w-[300px]">
            <div className="flex xl:flex-col">
              <div className="flex-wrap border-gray-3 border-r gap-5 hidden items-center lg:flex px-4 py-6 sm:px-7.5 xl:border-b xl:border-r-0 xl:px-9">
                <Image
                  src="/images/users/user.png"
                  alt="user"
                  width={64}
                  height={64}
                  className="h-16 rounded-full w-full max-w-[64px]"
                />
                <div>
                  <p className="text-dark font-medium mb-0.5">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-custom-xs">{user.role}</p>
                </div>
              </div>
              <div className="p-4 sm:p-7.5 xl:p-9">
                <nav className="flex flex-wrap gap-4 xl:flex-col xl:flex-nowrap">
                  {availableTabs.map(({ id, label, icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 transition duration-200 hover:bg-blue hover:text-white ${
                        activeTab === id
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      {icon} {label}
                    </button>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex bg-gray-1 rounded-md text-dark-2 duration-200 gap-2.5 hover:bg-blue hover:text-white items-center px-4.5 py-3 transition"
                  >
                    <SlLogout size={18} /> Logout
                  </button>
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="bg-white rounded-xl shadow-1 w-full xl:max-w-[820px]">
            {activeTab === "dashboard" && (
              <Dashboard activeTab={activeTab} user={user} />
            )}
            {activeTab === "recruiter" && user.role === "admin" && (
              <Recruiter />
            )}
            {activeTab === "candidate" && user.role === "admin" && (
              <Candidate />
            )}
            {activeTab === "sector" && <Sector />}
            {activeTab === "category" && <Category />}
            {activeTab === "job-recruiter" && <Job />}
            {activeTab === "job-admin" && <JobAdmin />}
            {activeTab === "password-recruiter" &&
              user.role === "recruiter" && <ChangePassword />}
            {activeTab === "password-candidate" &&
              user.role === "candidate" && <ChangePasswordCandidate />}
            {activeTab === "info-recruiter" && user.role === "recruiter" && (
              <InfoRecruteur />
            )}
            {activeTab === "education" && user.role === "candidate" && (
              <Education />
            )}
            {activeTab === "experience" && user.role === "candidate" && (
              <Experience />
            )}
            {activeTab === "certification" && user.role === "candidate" && (
              <Certification />
            )}
            {activeTab === "portfolio" && user.role === "candidate" && (
              <Portfolio />
            )}
            {activeTab === "profile" && user.role === "candidate" && (
              <UserProfileCandidate />
            )}
          </main>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
