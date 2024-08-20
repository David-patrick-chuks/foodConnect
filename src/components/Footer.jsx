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
    <div>
      <div className="lg:px-[140px] px-5 bg-gradient-to-bl from-amber-500 to-amber-800  text-white pop">
        <div className="flex justify-between items-center py-5 border-b border-b-white">
          <div className="flex justify-center my-auto items-center gap-5">
            <h1 className="font-semibold">FoodConnect</h1>
            <FaGripLinesVertical />
            <h1 className="lg:text-sm text-xs ">
              Donate, CLaim and Connect with Food.
            </h1>
          </div>
          <ul className="md:flex gap-8 hidden capitalize text-[#ffffff] font-medium text-[14px]">
            <RiInstagramLine />
            <RiFacebookBoxLine />
            <RiYoutubeLine />
            <RiTwitterLine />
          </ul>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 py-5">
          {FooterLinks.map((section) => (
            <div
              key={section.id}
              className="mb-3 p-1 m-1 w-fit  lg:mb-0 flex flex-col gap-2"
            >
              <h3 className="font-bold">{section.title}</h3>
              <ul className="flex flex-col gap-2 font-light">
                {section.links.map((link) => (
                  <div key={link.id}>
                    <Link to={`/${link.id}`} className=" hover:font-[500]">
                      {link.label}
                    </Link>
                  </div>
                ))}
              </ul>
            </div>
          ))}
          <div className="ml-[10px] md:hidden">
            <p className="font-bold">Follow us on:</p>
            <div className="flex flex-col gap-1 mt-1 text-sm">
              <p>
                <RiInstagramLine className="inline-block text-lg" /> Instagram
              </p>
              <p>
                <RiFacebookBoxLine className="inline-block text-lg" /> Facebook
              </p>
              <p>
                <RiYoutubeLine className="inline-block text-lg" /> Youtube
              </p>
              <p>
                <RiTwitterLine className="inline-block text-lg" />
                Twitter
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center  justify-center pt-0 pb-3 md:pt-3">
          <div className="flex gap-4 text-xs md:text-base font-light w-full items-center justify-center ">
            <h1>Copyright © {currentYear} FoodBank. All rights reserved</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
