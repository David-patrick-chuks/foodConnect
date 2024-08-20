import React, { useEffect, useState } from "react";
import { FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import Preloader from "./Preloader";
export const NotFound = () => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 5500);
  }, []);
  return (
    <>
      <div className="h-screen pop flex-col text-white p-8 flex justify-center items-center bg-black">
        <div className="text-center mb-6">
          <h1 className="text-9xl text-amber-500 font-extrabold mb-4">404</h1>
          <p className="text-3xl font-semibold mb-4">Page Not Found</p>
          <p className="text-lg mb-6">
            {" "}
            Oops! This page is missing, like a meal without seasoning.
          </p>
        </div>
        <div className="text-center">
          <Link
            to="/"
            className="bg-amber-500 text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-amber-400 transition duration-300"
          >
            Return to Homepage
          </Link>
          {/* <p className="mt-4 text-gray-400">
          {" "}
          Thanks for being part of FoodConnect-where every connection is a treat
        </p>{" "} */}
        </div>
      </div>
    </>
  );
};
