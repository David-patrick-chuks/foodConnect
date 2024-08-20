import React, { useState } from "react";
import { IoArrowForward, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export const NotifiactionBar = () => {
  const [showNbar, setShowNbar] = useState(true);

  return (
    <>
      {showNbar && (
        <div className="  bg-gradient-to-br from-amber-400 to-amber-500 h-6 w-[100%] items-center flex ">
          <div className="lg:w-[100%] w-[80%] text-center pop">
            <span className="lg:text-[14px] text-[12px] text-white leading-none">
              Donate anonymously <span className="hidden lg:inline-flex">with FoodConnect</span>. Learn more{" "}
              <Link
                to="/donations"
                className=" text-white hover:underline font-medium lg:text-[14px] inline-block"
              >
                here
                <IoArrowForward className=" inline-block text-xs" />{" "}
              </Link>
            </span>
          </div>
          <button
            className=" right-0 lg:pr-10 pr-5 absolute"
            onClick={() => setShowNbar(false)}
          >
            <IoClose className="text-xl text-white" />
          </button>
        </div>
      )}
    </>
  );
};
