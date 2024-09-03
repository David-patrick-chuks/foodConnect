import React from "react";

import { Link } from "react-router-dom";

export default function Receiver() {



  return (
    <div className="  flex w-full flex-col h-full p-2 ">
      <div className="relative z-50 bg-[url('/images/dash2.jpg')] rounded-xl overflow-hidden w-full bg-no-repeat md:bg-top bg-center bg-cover h-[45dvh]">
        <div className=" w-full flex gap-2 flex-col items-start px-16 justify-center h-full">
          <p className="text-black leading-none font-bold text-5xl">
            Get Fresh Food at No Cost
          </p>
          <p className=" text-xl w-[50%] leading-[22px] font-medium text-black ">
            Find fresh, uncooked food available for you to claim. We connect you
            with donors who care.
          </p>
          <Link
            className="text-white text-base font-semibold mt-2 bg-amber-600 rounded-lg px-2 py-1"
            to="/dashboard/claim-food"
          >
            Browse Food Items
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Stat Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-yellow-600 text-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Items Claimed</h2>
            <p className="text-2xl mt-2">25</p>
          </div>
          <div className="bg-blue-600 text-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Pending Claims</h2>
            <p className="text-2xl mt-2">5</p>
          </div>
          <div className="bg-green-600 text-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Rejected Claims</h2>
            <p className="text-2xl mt-2">2</p>
          </div>
          <div className="bg-purple-600 text-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Received Items</h2>
            <p className="text-2xl mt-2">20</p>
          </div>
        </div>

        {/* Line Chart - Claim Activity */}
   
      </div>

      <div>total cliamed</div>
      <div>pending claim</div>
      <div>total pickup</div>
      <div>two chatts js</div>
      <div>available food items</div>
      <div>my claims</div>
      <div>nortifaction</div>
      <div>profile overview</div>
      <div>add testimonial</div>
      <div>testimoney section</div>
    </div>
  );
}
