import { Button, IconButton } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { RiContactsFill, RiMenu2Fill } from "react-icons/ri";
import { NotifiactionBar } from "./NotifiactionBar";
import { IoClose, IoHome } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { FaInfoCircle, FaQuestionCircle } from "react-icons/fa";

export const NavBar = () => {
  const [mobileNav, setMobileNav] = useState(false);
const navigate = useNavigate()
  const toggleMenu = () => {
    setMobileNav(!mobileNav);
  };

  const NavBarLinks = [
    {
      id: 1,
      path: "/",
      label: "Home",
      icon: <IoHome />,
    },
    {
      id: 2,
      path: "/about-us",
      label: "About Us",
      icon: <FaInfoCircle />,
    },
    {
      id: 3,
      path: "/how-it-works",
      label: "How It Works",
      icon: <FaQuestionCircle />,
    },
    {
      id: 4,
      path: "/contact-us",
      label: "Contact Us",
      icon: <RiContactsFill />,
    },
  ];
const handleRegister = () => {
  navigate("/signup")
}
  return (
    <div className="sticky z-50  top-0">
      <NotifiactionBar />
      <div
        className={` flex pop  bg-white justify-between px-8 lg:px-[140px] bg-opacity-95 text-dark items-center  shadow-md ${mobileNav ?
          "bg-dark" : "bg-white"}  h-[60px]`}
      >
        <h1 className="lg:text-2xl text-lg font-semibold flex items-center">
          <img src="images/FoodBank.png" className="w-8" />
          FoodConnect
        </h1>
        <ul className="lg:flex my-auto items-center rounded-l-2xl gap-5 hidden capitalize  font-medium  text-[14px] ">
          {NavBarLinks.map((link, i) => (
            <NavLink to={link.path} key={i}>
              {link.label}
            </NavLink>
          ))}
        </ul>
        <Button className=" uppercase font-semibold px-4 shadow-md py-[5px] hidden lg:inline-block bg-opacity-90 bg-gradient-to-bl from-[#05380a] to-[#054b0c] text-white rounded-sm" onClick={handleRegister}>
          get started 
        </Button>
        <div className="lg:hidden flex gap-2 text-[#141718] items-center justify-center ">
          <IconButton
            variant="text"
            color="white"
            onClick={toggleMenu}
            className="inline-block lg:hidden text-dark w-7 h-7 mr-2"
            size="lg"
          >
            {mobileNav ? (
              <IoClose
                className={`  inline-block lg:hidden text-3xl ${mobileNav &&
                  "text-white"}`}
              />
            ) : (
              <RiMenu2Fill className=" inline-block lg:hidden text-2xl " />
            )}
          </IconButton>
        </div>
      </div>
      <div>
        <ul
          className={`lg:hidden nav py-5 duration-300 top-0 flex flex-col gap-5 [-1000px] bg-gradient-to-bl from-[#05380a]  to-[#031605] pr-2 w-[60%] h-[100vh] fixed z-50 capitalize text-white font-medium text-[20px] ${
            mobileNav ? " left-0" : "left-[-1000px]"
          }`}
        >
          {NavBarLinks.map((link, id) => (
            <React.Fragment key={id}>
              <NavLink
                className="flex py-2 pl-5 items-center gap-3"
                to={link.path}
              >
                {link.icon}
                {link.label}
              </NavLink>
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div>
        {mobileNav && (
          <div
            onClick={toggleMenu}
            className=" fixed t0 w-[100%] h-screen overflow-hidden bg-[#031605] bg-opacity-85 z-30"
          ></div>
        )}
      </div>
    </div>
  );
};
