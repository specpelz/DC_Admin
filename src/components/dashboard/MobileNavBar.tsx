
import { useState } from "react";
import { Drawer, Menu } from "antd";
import Logo from "@assets/images/datacablogo.svg"
import { IoMenu } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BiEditAlt, BiLogOut } from "react-icons/bi";
import { SlShield } from "react-icons/sl";
import useLogout from "@hooks/useLogOut";



interface appMenuType{
    isInline:boolean;
    setOpenMenu:(value:boolean)=>void;
}


const MobileNavBar = () => {


    const navigate = useNavigate();
    const { logout } = useLogout();
  
    const logOutHandler = async () => {
      await logout();
      navigate("/", { replace: true });
    };

  const [openMenu, setOpenMenu] = useState<boolean>(false);



  return (
    <div >
      <div className="flex  items-center md:hidden">
        <div

      
          onClick={() => setOpenMenu(true)}
        >
          <IoMenu size={30} />
        </div>
        <div className="mt-[10px]">
          <img src={Logo} alt="Logo" width={80} height="auto" />
        </div>
      </div>
      {/* <div className="pt-[10px] pl-[10px] flex justify-between items-center fixed top-0 w-full z-[1000] bg-white">
        <div className="pl-[10px] pt-[10px] md:hidden">
          <img src="/logo.png" alt="Logo" width={100} height="auto"  />
        </div>

        <div className="w-[500px] md:hidden">
        <AppMenu isInline setOpenMenu={setOpenMenu} />
        </div>
      </div> */}
      <div>
        <Drawer
          placement="left"
          open={openMenu}
          style={{
            backgroundColor: "rgb(255,255,255)",
            padding: 0,
          }}
          // closable={false}

          onClose={() => setOpenMenu(false)}
        >
  <div className="h-full flex flex-col justify-between">
  <AppMenu isInline setOpenMenu={setOpenMenu} />
  <div
      onClick={logOutHandler}
                className="flex gap-x-[16px] pl-[20px]"
              >
                {" "}
                <BiLogOut
                  size={24}
                 className="text-BrandRed"
                />
                <h2
                  className="text-[16px] text-BrandRed"
                >
                 Logout
                </h2>
              </div>
  </div>
        </Drawer>
      </div>
 

{/* <div className="h-[100vh] overflow-y-scroll ">
{children}
</div> */}
    </div>
  );
};

const AppMenu = ({ isInline = false, setOpenMenu }:appMenuType) => {

  const handleLinkClick = () => {
    if (setOpenMenu) {
      setOpenMenu(false);
    }
  };
  return (
    <Menu
      style={{
        fontSize: "18px",
        border: "none",
        backgroundColor: "rgb(255,255,255)",
      }}
      
      mode={isInline ? "inline" : "horizontal"}
      items={[
        {
          label: <Link  to="/admin" onClick={handleLinkClick}>Air Monitoring</Link>,
          key: "airMonitoring",
          icon:<MdDashboard
          size={18}
        />
        },
        {
          label: <Link to="/admin/multimedia" onClick={handleLinkClick}>Multimedia</Link>,
          key: "multimedia",
          icon:<FaRegImages
          size={18}
        />
        },
        {
          label: <Link to="/admin/blog" onClick={handleLinkClick}>Blog</Link>,
          key: "blog",
          icon:<BiEditAlt
          size={18}
        />
        },
        {
          label: <Link to="/admin/content" onClick={handleLinkClick}>Website content</Link>,
          key: "contact",
          icon:<SlShield
          size={18}
        />
        },
    
      ]}
    ></Menu>
  );
};
export default MobileNavBar;
