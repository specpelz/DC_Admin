import { useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import logo from "@assets/images/datacablogo.svg";
import signout from "@assets/images/signout.svg";
import user from "@assets/images/userr.svg";
import { FaBarsStaggered } from "react-icons/fa6";
import SecondaryBtn from "@components/commons/buttons/SecondaryBtn";
import PrimaryBtn from "@components/commons/buttons/PrimaryBtn";

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="h-[5.6rem] md:hidden px-[2rem] flex items-center justify-between w-ful">
      <div>
        <Link to="/">
          <div className="flex gap-2 justify-center md:justify-normal items-center cursor-pointer">
            <span>
              <img src={logo} alt="Logo" />
            </span>
          </div>
        </Link>
      </div>

      <div className="mt-4 lg:hidden text-2xl" onClick={toggleMenu}>
        {menuOpen ? (
          <FaTimes className="text-4xl" />
        ) : (
          <FaBarsStaggered className="text-4xl" />
        )}
        <div
          className={`lg:hidden mt-8 flex flex-col gap-2 justify-center absolute right-0 top-14  w-3/5 z-40 bg-white shadow-lg py-4 rounded-bl-lg px-6 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col gap-8 text-base pb-4 md:pb-0 md:gap-5">
            <Link to="/">
              <span className="hover:text-BrandPrimary">Home</span>
            </Link>
            <Link to="/signin">
              <SecondaryBtn>
                <p className="flex space-x-3 items-center">
                  <span>
                    <img src={signout} alt="" />
                  </span>
                  <span>Sign in</span>
                </p>
              </SecondaryBtn>
            </Link>

            <Link to="/register">
              <PrimaryBtn>
                <p className="flex space-x-3 items-center">
                  <span>
                    <img src={user} alt="" />
                  </span>
                  <span>Join now</span>
                </p>
              </PrimaryBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
