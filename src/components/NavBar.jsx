import { Button, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import {  RiMenu2Fill } from "react-icons/ri";
import { NotifiactionBar } from "./NotifiactionBar";
import { IoClose, } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { HomeModernIcon, InformationCircleIcon, PhoneArrowDownLeftIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export const NavBar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMobileNav(!mobileNav);
  };

  const NavBarLinks = [
    {
      id: 1,
      path: "/",
      label: "Home",
      icon: HomeModernIcon ,
    },
    {
      id: 2,
      path: "/about-us",
      label: "About Us",
      icon: InformationCircleIcon,
    },
    {
      id: 3,
      path: "/how-it-works",
      label: "How It Works",
      icon: QuestionMarkCircleIcon,
    },
    {
      id: 4,
      path: "/contact-us",
      label: "Contact Us",
      icon: PhoneArrowDownLeftIcon ,
    },
  ];
  const handleRegister = () => {
    navigate("/signup");
    setMobileNav(false);
  };
  const returnHome = () => {
    setMobileNav(false);
    navigate("/");
  };
  return (
    <div className="sticky z-50  top-0">
      <NotifiactionBar />
      <div
        className={` flex pop  bg-white justify-between px-8 lg:px-[140px] bg-opacity-100 text-dark items-center  shadow-md ${
          mobileNav ? "bg-dark" : "bg-white"
        }  h-[60px]`}
      >
        <h1
          onClick={returnHome}
          className="lg:text-2xl text-lg font-semibold flex items-center"
        >
          <img src="images/FoodBank.png" className="w-8" />
          Food <span className="text-amber-600">Connect</span>
        </h1>
        <ul className="lg:flex my-auto items-center rounded-l-2xl gap-5 hidden capitalize  font-medium  text-[14px] ">
          {NavBarLinks.map((link, i) => (
            <NavLink
              to={link.path}
              key={i}
              className={({ isActive }) =>
                isActive
                  ? " text-amber-600 font-semibold"
                  : "  text-black font-normal"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </ul>
        <Button
          className=" uppercase font-semibold px-4 shadow-md hover:shadow-sm py-[5px] hidden lg:inline-block bg-opacity-90 bg-gradient-to-br from-amber-300 to-amber-600  text-white rounded-sm"
          onClick={handleRegister}
        >
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
                className={` text-amber-600 inline-block lg:hidden text-3xl ${
                  mobileNav && "text-amber-600"
                }`}
              />
            ) : (
              <RiMenu2Fill className=" inline-block text-amber-600 lg:hidden text-2xl " />
            )}
          </IconButton>
        </div>
      </div>
      <div>
        <ul
          className={`lg:hidden nav py-5 pop transition-all duration-300 top-0 flex flex-col gap-5 bg-gradient-to-tl from-amber-400  to-amber-700 pr-2 w-[60%] h-[100vh] fixed z-50 left-0 capitalize text-black font-medium text-[20px] ${
            mobileNav ? " left-0" : "left-[-1000px] duration-500 transition-all"
          }`}
        >
          <h1
            onClick={returnHome}
            className="lg:text-2xl text-xl font-extrabold pop flex items-center px-2 py-3 mt-1 text-white"
          >
            <img src="images/FoodBank.png" className="w-8" />
            FoodConnect
          </h1>
          {NavBarLinks.map((link, id) => (
            <NavLink
              key={id}
              className="flex py-2 pl-5 items-center gap-3"
              to={link.path}
              onClick={() => setMobileNav(false)}
            >
              <link.icon className=" w-5 h-5" />
              {link.label}
            </NavLink>
          ))}
          <div className="py-2 my-[20%] z-50 pop px-3 rounded-r-lg bg-gradient-to-b from-black to-black/90  text-white flex flex-col gap-5">
            <p className=" text-center text-base">
              Discover how you can make an impact with FoodConnect. Connect with
              the community and get involved.
            </p>
            <Button
              className=" uppercase font-bold px-4 shadow-md hover:shadow-sm py-[7px] inline-block bg-opacity-90 bg-gradient-to-br from-amber-300 to-amber-600 pop text-black rounded-md"
              onClick={handleRegister}
            >
              get started
            </Button>
          </div>
        </ul>
      </div>
      <div>
        {mobileNav && (
          <div
            onClick={toggleMenu}
            className=" fixed t0 w-[100%] h-screen overflow-hidden bg-amber-200 bg-opacity-85 z-30"
          ></div>
        )}
      </div>
    </div>
  );
};
