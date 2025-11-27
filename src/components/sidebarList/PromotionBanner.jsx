"use client";
import React from "react";
import { Gift } from "lucide-react";

function PromotionBanner() {
  return (
    <div className="bg-[rgba(39,169,116,1)] text-white rounded-lg p-3 my-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 lg:gap-4 w-full">
        {/* Gift Icon for desktop */}
        <div className="hidden md:block bg-white rounded-full p-3 flex-shrink-0">
          <Gift size={22} className="text-green-500" />
        </div>
        {/* Gift Icon for mobile */}
        <div className="md:hidden flex items-start gap-2">
          <div className="bg-white rounded-full p-2 flex items-start">
            <Gift size={18} className="text-green-500" />
          </div>
        </div>


        {/* Promotion Text */}
        <div className=" hidden md:block flex-1 text-center md:text-left">
          <h3 className="font-bold text-lg">Explore the World with Ease!</h3>
          <p className="text-sm">
            Book Cabs Seamlessly and Earn $50+ per Booking with TravelTrax.com.
          </p>
        </div>

        {/* Promotion Text */}
        <div className="md:hidden flex-1 text-center md:text-left">
          <h3 className="font-bold text-sm">Explore the World with Ease!</h3>
          <p className="text-xs">
            Book Cabs Seamlessly and Earn $50+ per Booking with TravelTrax.com.
          </p>
        </div>

        {/* Button */}
        <button className="hidden md:block bg-white text-green-700 px-4 py-2.5 mt-1.5 rounded-md font-bold hover:bg-gray-100 w-full md:w-auto">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default PromotionBanner;
