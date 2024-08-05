import React from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import {
    RiFacebookBoxLine,
  RiFacebookLine,
  RiInstagramLine,
  RiTwitterLine,
  RiYoutubeLine,
} from "react-icons/ri";
import { FooterLinks } from "../utils/footerLinks";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div  style={{backgroundImage: "url('/images/banner.jpeg')"}} className=" bg-no-repeat bg-cover" >
    <div className="px-[140px] bg-opacity-90 bg-gradient-to-bl from-[#05380a] to-[#031605]  text-white pop">
      <div className="flex justify-between items-center py-5 border-b border-b-white">
        <div className="flex justify-center my-auto items-center gap-5">
          <h1 className="font-semibold">FoodConnect</h1>
          <FaGripLinesVertical />
          <h1 className="text-sm ">Donate, CLaim and Connect with Food.</h1>
        </div>
        <ul className="lg:flex gap-8 hidden capitalize text-[#ffffff] font-medium text-[14px]">
          <RiInstagramLine />
          <RiFacebookBoxLine />
          <RiYoutubeLine />
          <RiTwitterLine />
        </ul>
      </div>
      <div className="grid grid-cols-5 py-5">
        {FooterLinks.map((section) => (
          <div key={section.id} className="mb-3 p-1 m-1 w-fit   lg:mb-0 flex flex-col gap-2">
            <h3 className="font-bold">{section.title}</h3>
            <ul className="flex flex-col gap-2 font-light">
              {section.links.map((link) => (
                <div key={link.id} >
                  <Link to={`/${link.id}`} className=" hover:font-[500]">
                    {link.label}
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center  justify-center py-3">
        <div className="flex gap-4 font-light w-full items-center justify-center ">
          <h1>Copyright © {currentYear} FoodBank. All rights reserved</h1>
        </div>
      </div>
    </div>
    </div>
  );
};
