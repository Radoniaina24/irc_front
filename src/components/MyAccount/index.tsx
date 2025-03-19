"use client";
import React, { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import AddressModal from "./AddressModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout, selectUser } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/lib/api/authApi";
import { useRouter } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { GrUserSettings } from "react-icons/gr";
import Recruiter from "../Orders";
import { SlLogout } from "react-icons/sl";
import { MdOutlineCategory } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { PiAddressBookLight, PiReadCvLogoLight } from "react-icons/pi";
import Dashboard from "./Dashboard";
import AccountDetails from "./AccountDetails";
import Address from "./Address";
import { LuUserRound } from "react-icons/lu";
const MyAccount = () => {
  const [logoutUser] = useLogoutMutation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addressModal, setAddressModal] = useState(false);
  const dispatch = useDispatch();
  const openAddressModal = () => {
    setAddressModal(true);
  };
  const closeAddressModal = () => {
    setAddressModal(false);
  };

  const navigation = useRouter();
  const user = useSelector(selectUser);
  async function handleLogout() {
    try {
      // Appeler la mutation de déconnexion
      await logoutUser("").unwrap();
      // Si la déconnexion réussit, effacer l'état d'authentification de Redux
      dispatch(logout());
      navigation.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  }
  return (
    <>
      <Breadcrumb title={"My Account"} pages={["my account"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            {/* <!--== user dashboard menu start ==--> */}
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
              <div className="flex xl:flex-col">
                <div className="hidden lg:flex flex-wrap items-center gap-5 py-6 px-4 sm:px-7.5 xl:px-9 border-r xl:border-r-0 xl:border-b border-gray-3">
                  <div className="max-w-[64px] w-full h-16 rounded-full overflow-hidden">
                    <Image
                      src="/images/users/user-04.jpg"
                      alt="user"
                      width={64}
                      height={64}
                    />
                  </div>

                  <div>
                    <p className="font-medium text-dark mb-0.5">
                      {user.firstName}
                      <br />
                      {user.lastName}
                    </p>
                    <p className="text-custom-xs">{user.role}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-7.5 xl:p-9">
                  <div className="flex flex-wrap xl:flex-nowrap xl:flex-col gap-4">
                    <button
                      onClick={() => setActiveTab("dashboard")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "dashboard"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <RxDashboard size={18} />
                      Dashboard
                    </button>
                    <button
                      onClick={() => setActiveTab("recruiter")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "recruiter"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <GrUserSettings size={18} />
                      Recruiter
                    </button>
                    <button
                      onClick={() => setActiveTab("candidate")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "candidate"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <GrUserSettings size={18} />
                      Candidate
                    </button>
                    <button
                      onClick={() => setActiveTab("job")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "job"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <PiReadCvLogoLight size={18} />
                      Job Announcement
                    </button>
                    <button
                      onClick={() => setActiveTab("sector")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "sector"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <MdOutlineCategory size={18} />
                      Sector
                    </button>
                    <button
                      onClick={() => setActiveTab("category")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "category"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <BiCategoryAlt size={18} />
                      Category
                    </button>
                    <button
                      onClick={() => setActiveTab("addresses")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "addresses"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <PiAddressBookLight size={18} />
                      Addresses
                    </button>
                    <button
                      onClick={() => setActiveTab("account-details")}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "account-details"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <LuUserRound size={18} />
                      Account Details
                    </button>
                    <button
                      onClick={() => handleLogout()}
                      className={`flex items-center rounded-md gap-2.5 py-3 px-4.5 ease-out duration-200 hover:bg-blue hover:text-white ${
                        activeTab === "logout"
                          ? "text-white bg-blue"
                          : "text-dark-2 bg-gray-1"
                      }`}
                    >
                      <SlLogout size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!--== user dashboard menu end ==-->
          <!--== user dashboard content start ==--> */}
            {/* <!-- dashboard tab content start --> */}
            <Dashboard activeTab={activeTab} user={user} />
            {/* <!-- dashboard tab content end -->

          <!-- recruiter tab content start --> */}
            <div
              className={`xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 ${
                activeTab === "recruiter" ? "block" : "hidden"
              }`}
            >
              <Recruiter />
            </div>
            {/* <!-- recruiter tab content end -->

          <!-- addresses tab content start --> */}
            <Address
              activeTab={activeTab}
              openAddressModal={openAddressModal}
            />
            {/* <!-- addresses tab content end -->

          <!-- details tab content start --> */}
            <AccountDetails activeTab={activeTab} />
            {/* <!-- details tab content end -->
          <!--== user dashboard content end ==--> */}
          </div>
        </div>
      </section>

      <AddressModal isOpen={addressModal} closeModal={closeAddressModal} />
    </>
  );
};

export default MyAccount;
