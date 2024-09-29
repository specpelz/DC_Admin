import H5Heading from "@components/commons/headings/H5Heading";
import PText from "@components/commons/headings/PText";
import Input from "@components/commons/input";
import { IoIosContact, IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

const Navbar: React.FC<{ activeTab: string; collapsed: boolean }> = ({
  // activeTab,
  collapsed,
}) => {
  return (
    <div
      className={`${
        collapsed ? "pl-[12rem]" : "pl-[25rem]"
      } w-[100%] h-[8.1rem] bg-[#fff] px-10 flex items-center`}
    >
      <div className="flex justify-end md:justify-between w-full items-center">
        <div className="hidden md:flex  w-[60%]">
          {/* <h1 className="text-[20px] font-bold w-[45rem]">
            {activeTab === "/admin" ? (
              ""
            ) : activeTab === "/admin/users" ? (
              <H5Heading title="Manage Users" />
            ) : activeTab === "/admin/opportunities" ? (
              <H5Heading title="Manage Opportunities" />
            ) : activeTab === "/admin/complaints" ? (
              <H5Heading title="Manage Complaints" />
            ) : activeTab === "/admin/broadcast" ? (
              <H5Heading title="Send Broadcast" />
            ) : (
              ""
            )}
          </h1> */}

          <Input
            icon={<IoSearch color="#9B9B9B" size={25} />}
            placeholder="Search here."
            iconPosition="left"
            className="rounded-[3rem] bg-BrandLightGray "
          />
        </div>

        <div className="flex items-center gap-[2.4rem] cursor-pointer ">
          <div className=" bg-BrandGray p-4 rounded-full">
            <div className="relative">
              <IoMdNotificationsOutline size={25} color="#9B9B9B" />
              <span className="absolute -top-1 right-0 bg-BrandBlack rounded-full w-6 h-6 text-sm flex items-center justify-center text-[#fff] font-bold">
                5
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <IoIosContact size={50} color="#6e6f70" />
            <div className="hidden md:flex flex-col">
              <H5Heading title="Anita Odom" />
              <PText text="Admin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
