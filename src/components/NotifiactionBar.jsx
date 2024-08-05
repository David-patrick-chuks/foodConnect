import React, { useState } from "react";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoArrowForward, IoClose } from "react-icons/io5";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

export const NotifiactionBar = () => {
  const [showNbar, setShowNbar] = useState(true);

  return (
    <>
      {showNbar && (
        <div className="  bg-opacity-90 bg-gradient-to-bl from-[#05380a] to-[#031605] h-8 w-[100%] items-center hidden lg:flex ">
          <div className="w-[100%] text-center pop">
            {/* <FaHandHoldingHeart className=" inline-block mr-1 text-lg text-white" />{" "} */}
            <span className="text-[14px] text-white">
              Make a difference!{" "}
              <Link to="/" className=" lg:ml-2 text-white  lg:border-b-[1.5px] pb-[2px] font-semibold text-[14px] border-[#ffffff] lg:inline-block">
                Donate Today{" "}
                <IoArrowForward className=" inline-block text-xl" />{" "}
              </Link>{" "}
            </span>
          </div>
          <button
            className=" right-0 pr-10 absolute"
            onClick={() => setShowNbar(false)}
          >
            <IoClose color="white" className="text-xl" />
          </button>
        </div>
      )}
    </>
  );
};
