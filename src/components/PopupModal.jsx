import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function PopupModal({ show, onClose }) {
  useEffect(() => {
    if (show) {
          document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!show) {
    return null;
  }
  return (
    <div className="fixed pop inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white relative p-8 rounded-lg shadow-lg z-10 md:w-1/2 w-3/4">
        <button
          onClick={onClose}
          className="absolute text-2xl py-2 top-0 right-4 text-black"
        >
          <IoClose />
        </button>
        <h1 className="text-2xl font-semibold mb-4">
          {" "}
          Welcome to FoodConnect!{" "}
        </h1>
        <div className="mb-6 text-sm md:text-base">
          <p>
            Thank you for visiting FoodConnect! We are dedicated to connecting
            communities with fresh Food Donations.{" "}
          </p>
          <p>
            Sign up now to become a part of our mission to help those in need.
            As a Donor, you can post fresh food items, and as a Receiver, you
            can claim food items you need.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            className="bg-amber-600 duration-300 transition-all text-white py-2 px-4 rounded-md hover:bg-amber-700 md:text-base text-xs"
            to="/signup"
          >
            Sign Up
          </Link>
          <Link
            className="bg-gray-800 text-white py-2 px-4 rounded-md  duration-300 transition-all hover:bg-gray-700 md:text-base text-xs"
            to="/how-it-works"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
