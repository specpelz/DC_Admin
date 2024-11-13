import Logo from "@assets/images/datacablogo.svg";
import useLogout from "@hooks/useLogOut";
import React, { Dispatch, SetStateAction } from "react";
import { BiEditAlt, BiLogOut } from "react-icons/bi";
import { FaRegImages } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { SlShield } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";

type SideBarProps = {
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  collapsed: boolean;
  activeTab: string;
};

const SideBar: React.FC<SideBarProps> = ({
  setCollapsed,
  collapsed,
  activeTab,
}) => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const logOutHandler = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={`md:flex h-screen bg-[#fff] py-2 px-1 lg:px-[1rem]  flex-col justify-between `}
    >
      <div>
        <Link to="/">
          <div
   
          >
            <img src={Logo} alt="Logo" width={70} height={70} />
          </div>
        </Link>

        <div
          className={`hidden md:flex flex-col gap-[2rem] justify-center  ${
            collapsed ? "md:collapsed" : ""
          }`}
        >
          <div
            onClick={handleCollapseToggle}
            className={`flex justify-end cursor-pointer ${
              collapsed ? "mt-5" : "mt-0"
            } `}
          >
            <div className="border p-[0.8rem] rounded-l-xl">
              {collapsed ? (
                <FaArrowRight size={20} />
              ) : (
                <FaArrowLeft size={20} />
              )}
            </div>
          </div>

          {/* Dashboard */}
          <Link
            to="/admin"
            className={`flex gap-2 items-center cursor-pointer pl-[3.2rem] pr-[2rem]  py-[1rem] ${
              activeTab === "/admin" && "bg-BrandLightPrimary  rounded-[0.4rem]"
            }`}
          >
            {collapsed ? (
              <div className=" pr-[2rem] ">
                <MdDashboard
                  size={18}
                  color={`${activeTab === "/admin" ? "#4165EB" : "#757575"} `}
                />
              </div>
            ) : (
              <div
                className={`flex gap-[1rem] items-center cursor-pointer  ${
                  activeTab === "/admin" && " rounded-[0.4rem]"
                }`}
              >
                {" "}
                <MdDashboard
                  size={18}
                  color={`${activeTab === "/admin" ? "#4165EB" : "#757575"} `}
                />
                <h2
                  className={`${
                    activeTab === "/admin"
                      ? "text-BrandPrimary"
                      : "text-BrandTextColor"
                  } text-Sixteen font-[500] `}
                >
                  Air Monitoring
                </h2>
              </div>
            )}
          </Link>

          {/* multimedia */}
          <Link
            to="/admin/multimedia"
            className={`flex gap-2 items-center cursor-pointer pl-[3.2rem] pr-[2rem]  ${
              activeTab === "/admin/multimedia" &&
              "bg-BrandLightPrimary  rounded-[0.4rem]"
            }`}
          >
            {collapsed ? (
              <div className=" pr-[2rem] py-[1rem]">
                <FaRegImages
                  size={18}
                  color={`${
                    activeTab === "/admin/multimedia" ? "#4165EB" : "#757575"
                  } `}
                />
              </div>
            ) : (
              <div
                className={`flex gap-[1rem] items-center cursor-pointer  py-[1rem] ${
                  activeTab === "/admin/multimedia" && "  rounded-[0.4rem]"
                }`}
              >
                {" "}
                <FaRegImages
                  size={18}
                  color={`${
                    activeTab === "/admin/multimedia" ? "#4165EB" : "#757575"
                  } `}
                />
                <h2
                  className={`${
                    activeTab === "/admin/multimedia"
                      ? "text-BrandPrimary"
                      : "text-BrandTextColor"
                  } text-Sixteen font-[500] `}
                >
                  Multimedia
                </h2>
              </div>
            )}
          </Link>

          {/* blog */}
          <Link
            to="/admin/blog"
            className={`flex gap-2 items-center cursor-pointer pl-[3.2rem] pr-[2rem]  ${
              activeTab === "/admin/blog" &&
              "bg-BrandLightPrimary  rounded-[0.4rem]"
            }`}
          >
            {collapsed ? (
              <div className=" pr-[2rem] py-[1rem]">
                <BiEditAlt
                  size={18}
                  color={`${
                    activeTab === "/admin/blog" ? "#4165EB" : "#757575"
                  } `}
                />
              </div>
            ) : (
              <div
                className={`flex gap-[1rem] items-center cursor-pointer  py-[1rem] ${
                  activeTab === "/admin/blog" && " rounded-[0.4rem]"
                }`}
              >
                {" "}
                <BiEditAlt
                  size={18}
                  color={`${
                    activeTab === "/admin/blog" ? "#4165EB" : "#757575"
                  } `}
                />
                <h2
                  className={`${
                    activeTab === "/admin/blog"
                      ? "text-BrandPrimary"
                      : "text-BrandTextColor"
                  } text-Sixteen font-[500] `}
                >
                  Blog
                </h2>
              </div>
            )}
          </Link>

          {/* content */}
          <Link
            to="/admin/content"
            className={`flex gap-2 items-center cursor-pointer pl-[3.2rem] pr-[2rem]  ${
              activeTab === "/admin/content" &&
              "bg-BrandLightPrimary  rounded-[0.4rem]"
            }`}
          >
            {collapsed ? (
              <div className=" pr-[2rem] py-[1rem]">
                <SlShield
                  size={18}
                  color={`${
                    activeTab === "/admin/content" ? "#4165EB" : "#757575"
                  } `}
                />
              </div>
            ) : (
              <div
                className={`flex gap-[1rem] items-center cursor-pointer  py-[1rem] ${
                  activeTab === "/admin/content" && "  rounded-[0.4rem]"
                }`}
              >
                {" "}
                <SlShield
                  size={18}
                  color={`${
                    activeTab === "/admin/content" ? "#4165EB" : "#757575"
                  } `}
                />
                <h2
                  className={`${
                    activeTab === "/admin/content"
                      ? "text-BrandPrimary"
                      : "text-BrandTextColor"
                  } text-Sixteen font-[500] `}
                >
                  Website Content
                </h2>
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* log out */}
      <div
        className={`hidden cursor-pointer md:flex gap-2 items-center pl-[3.2rem] pr-[2rem]`}
        onClick={logOutHandler}
      >
        {collapsed ? (
          <BiLogOut size={18} color="#000" />
        ) : (
          <div
            className={`cursor-pointer flex gap-[1rem] items-center  py-[1rem]`}
          >
            {" "}
            <BiLogOut size={18} color="#F33B3B" />
            <h2 className="text-Sixteen  font-[500] text-BrandRed">Logout</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
