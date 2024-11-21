import H5Heading from "@components/commons/headings/H5Heading";
import PText from "@components/commons/headings/PText";
import Input from "@components/commons/input";
import { IoIosContact, IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import MobileNavBar from "./MobileNavBar";
import { Input as MyInput,  Popover } from 'antd'; 
import { SearchOutlined } from '@ant-design/icons'
import { useState } from "react";

const Navbar: React.FC<{ activeTab: string; collapsed: boolean }> = ({
  collapsed,
}) => {
  const [visible, setVisible] = useState(false);
   const handleSearchClick = () => { setVisible(!visible); }; 
   const content = ( 
   <MyInput placeholder="Search..." 
    suffix={<SearchOutlined />} 
    autoFocus 
    onBlur={() => setVisible(false)} /> 
  )

  const storedUser = localStorage.getItem("DC_User");
  const user = storedUser ? JSON.parse(storedUser) : null;

  console.log(user);
  return (
    <div
      className={`${
        collapsed ? "md:pl-[12rem]" : "md:pl-[25rem]"
      } w-[100%] h-[8.1rem] bg-[#fff] px-[20px] flex items-center`}
    >
         <div className="md:hidden">
          <MobileNavBar/>
        </div>
      <div className="flex gap-x-[16px] justify-end  w-full items-center">

      {/* <Popover content={content} 
      trigger="click" 
      visible={visible} 
      placement="bottom" 
      className="md:hidden"
      onVisibleChange={setVisible} >
         {<img src="/search2.svg" alt="search logo" width={40} height={"auto"} onClick={handleSearchClick}/>}   </Popover> */}
   
        {/* <div className="hidden md:flex  w-[60%]">
          <Input
            icon={<IoSearch color="#9B9B9B" size={25} />}
            placeholder="Search here."
            iconPosition="left"
            className="rounded-[3rem] bg-BrandLightGray "
          />
        </div> */}

        <div className="flex items-center gap-[2.4rem] cursor-pointer ">
          {/* <div className=" bg-[#F2F2F2] p-4 rounded-full">
            <div className="relative">
              <IoMdNotificationsOutline size={20} color="#9B9B9B" />
              <span className="absolute -top-1 right-0 bg-BrandBlack rounded-full w-6 h-6 text-sm flex items-center justify-center text-[#fff] font-bold">
                5
              </span>
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            <IoIosContact size={50} color="#6e6f70" />
            <div className="hidden md:flex flex-col">
              <H5Heading title={user && user.name} />
              <PText text={user && user.role} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
