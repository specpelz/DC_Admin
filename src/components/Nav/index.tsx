import { useState } from "react";
import signout from "@assets/images/signout.svg";
import { Link } from "react-router-dom";
import logo from "@assets/images/logo.svg";
import SecondaryBtn from "@components/commons/buttons/SecondaryBtn";
import MobileNav from "./MobileNav";
import SectionLayout from "@layouts/SectionLayout";

const Nav = () => {
  const [selectedPath, setSelectedPath] = useState<string>(location.pathname);

  const menuItems = [
    {
      path: "/",
      text: "Home",
    },
  ];

  return (
    <nav className=" sticky top-0 z-[999]">
      <SectionLayout>
        

        <div className="h-[5.6rem] hidden w-full md:flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10" />
            
          </Link>

          <ul className="flex space-x-8 items-center">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`hover:text-BrandPrimary transition duration-100 ${
                    selectedPath === item.path
                      ? "text-BrandPrimary"
                      : "text-gray-800"
                  }`}
                  onClick={() => setSelectedPath(item.path)}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/signin">
                <SecondaryBtn>
                  <p className="flex space-x-3 items-center ">
                    <span>
                      <img src={signout} alt="" />
                    </span>
                    <span>Sign in</span>
                  </p>
                </SecondaryBtn>
              </Link>
            </li>
{/* Register button , should write SIGNIN button to change id user is signed in */}
            {/*  */}
          </ul>
        </div>
        <MobileNav />
      </SectionLayout>
    </nav>
  );
};

export default Nav;
