"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setBookingDetails } from "@/redux/features/bookingSlice";

// Star icon for rating
const Star = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-yellow-500"
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.212a.75.75 0 011.424 0l.974 2.923 3.085.213a.75.75 0 01.416 1.286l-2.348 2.054.675 3.072a.75.75 0 01-1.127.915L12 14.852l-2.76 1.624a.75.75 0 01-1.127-.915l.675-3.072-2.348-2.054a.75.75 0 01.416-1.286l3.085-.213.974-2.923z"
      clipRule="evenodd"
    />
  </svg>
);

// Check icon for list items
const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600 flex-shrink-0">
    <path fillRule="evenodd" d="M16.704 4.704a.75.75 0 01-.708.012l-8.25 7.5a.75.75 0 01-1.042-1.09l8.25-7.5a.75.75 0 011.054 1.078z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M8.502 14.998a.75.75 0 01-.53-.22L3.22 9.72a.75.75 0 011.06-1.06l4.75 4.75a.75.75 0 01-.53 1.28z" clipRule="evenodd" />
  </svg>
);


function CabCard({ car, tripDetails, filteredRoutes, surgeRoutes }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleBookNow = () => {
    dispatch(setBookingDetails({ car, trip: tripDetails, filteredRoutes: filteredRoutes, surgeRoutes: surgeRoutes }));
    router.push("/booking");
  };

  // Extract distance from tripDetails
  const distanceString = tripDetails.distance?.toLowerCase();
  const actualDis = distanceString ? parseFloat(distanceString.match(/\d+(\.\d+)?/)[0]) : 0;

  const pickupDate = new Date(tripDetails.pickupDate);
  const returnDate = new Date(tripDetails.returnDate);

  // Determine number of days between pickup and return
  const diffInTime = returnDate.getTime() - pickupDate.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // difference in days

  // Determine trip type (default to "roundtrip" if not provided)
  const tripType = tripDetails.tripType?.toLowerCase() || "roundtrip";

  // Calculate actualDistance based on your rules
  let actualDistance = 0;

  if (diffInDays === 0) {
    actualDistance = actualDis * 2; // same-day roundtrip
  } else if (diffInDays === 1) {
    actualDistance = 250 * 2;
  } else if (diffInDays === 2) {
    actualDistance = 250 * 3;
  } else if (diffInDays === 3) {
    actualDistance = 250 * 4;
  } else if (diffInDays === 4) {
    actualDistance = 250 * 5;
  } else {
    actualDistance = 250 * (diffInDays + 1); // trips longer than 5 days
  }

  if (tripType !== "roundtrip") {
    // For one-way or airport transfers, use original distance
    actualDistance = actualDis;
  }


  return (
    <div className="bg-gray-100 w-full flex items-center justify-center font-sans p-1 rounded-2xl">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse {
            animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .white-card {
            background-color: #fff;
            border-radius: 16px;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          }
          .btn-book-now {
            background-image: linear-gradient(to right, #a855f7, #ec4899); /* Purple to Pink */
            transition: all 0.3s ease;
          }
          .btn-book-now:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4);
          }
        `}
      </style>
      {/* desktop View */}
      <div className="hidden md:block w-full max-w-4xl p-2 ">
        <div className="white-card flex flex-col md:flex-row gap-4 w-full animate-fade-in transition-all">
          {/* Left Side: Car Image & Tags */}
          <div className="relative mt-3 flex-1 rounded-2xl overflow-hidden shadow-lg h-48 md:h-max">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {car.tag}
            </div>
            <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              {car.discount}% OFF
            </div>
          </div>

          {/* Right Side: Details & Booking */}
          <div className="flex-1 flex flex-col justify-between p-2 md:p-4">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">{car.name}</h2>
              <div className="flex items-center space-x-1">
                <Star />
                <span className="text-gray-600 text-sm font-semibold">{car.rating} rating</span>
              </div>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">{car.type} AC</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">{car.seater} Seater</span>
              <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium">{car.bags} bags</span>
            </div>


            {/* Fine Print and Additional Features */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2">
                <Check />
                <span className="text-sm text-gray-600">{actualDistance} kms included. After that ₹{car.extraCharge}/Km</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check />
                <span className="text-sm text-gray-600">Free waiting up to 30 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check />
                <span className="text-sm text-gray-600">Free Cancellation, till 2 hour of Pick up</span>
              </div>
            </div>


            {/* Added a new section for features */}
            <div className="flex flex-wrap gap-2 mb-2">
              {car.features.map((feature, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-xs font-small">
                  {feature}
                </span>
              ))}
            </div>

            {/* Price & Book Now */}
            <div className="mt-2 flex flex-col md:flex-row justify-between items-end md:items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 line-through text-md">₹ {car.originalPrice}</p>
                  <p className="text-3xl font-extrabold text-gray-900">₹ {car.price}</p>
                </div>
                <p className="text-gray-600 text-sm font-light">+ ₹ {car.taxes} taxes & fees</p>
              </div>

              <button
                className="mt-2 md:mt-0 w-full md:w-auto px-8 btn-book-now text-white font-bold py-2 rounded-full text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Mobile View */}
      <div className="md:hidden bg-gray-100 mt-3 flex flex-col w-full mx-auto">
        <div className="bg-white p-2 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded-md text-xs font-semibold">
              {car.tag}
            </span>
            <div className="flex items-center mt-2">
              <div className="bg-green-500 text-white px-3 py-1 text-xs rounded-lg flex items-center w-fit">
                <Star size={12} className="mr-1" />
                {car.rating}/5
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <img src={car.image} alt={car.name} className="w-20 h-16 object-cover rounded-lg" />
            <div className="flex-1 mt-2">
              <h3 className="text-sm font-semibold">{car.name}</h3>
              <p className="text-xs text-gray-500">{car.type} AC • {car.seater} passengers</p>
              <p className="text-xs text-gray-500">{tripDetails.distance} Kms included. After that ₹{car.extraCharge}/Km</p>
              <p className="text-xs text-gray-500">Free waiting up to 30 minutes</p>
            </div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <div>
              <p className="text-gray-400 line-through text-xs">₹ {car.originalPrice}</p>
              <p className="text-lg font-bold text-gray-900">₹ {car.price}</p>
              <p className="text-gray-500 text-xs">+ ₹ {car.taxes} taxes & fees</p>
            </div>

            <button
              onClick={handleBookNow}
              className="btn-book-now text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CabCard;