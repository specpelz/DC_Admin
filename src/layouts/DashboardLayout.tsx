// import MobileNavBar from "@components/dashboard/mobileNavBar";
import Navbar from "@components/dashboard/Navbar";
import SideBar from "@components/dashboard/Sidebar";
import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState("");
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <div className="bg-[#f9f7f7] min-h-screen">
      <div className="sticky top-0 z-[908]">
        {/* max-w-[144rem] */}
        <div className=" w-full mx-auto px-0 shadow-sm">
          <Navbar activeTab={activeTab} collapsed={collapsed} />
        </div>
      </div>

      {/* max-w-[144rem] */}
      <div className="flex  w-full mx-auto px-0">

        <div
          className={`hidden md:block fixed top-0 z-[999] ${
            collapsed ? " w-[10rem]" : "w-[23rem]"
          }`}
        >
          <SideBar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            activeTab={activeTab}
          />
        </div>
        <div
          className={`w-full  bg-[#f9f7f7] h-full ${
            collapsed ? "md:ml-[10rem]" : "md:ml-[23rem]"
          }`}
        >
          <div
            className="p-[1.6rem] bg-BrandLightPrimary h-[100vh]"
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
