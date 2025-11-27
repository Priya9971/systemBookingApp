"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange } from "@/redux/features/filterSlice";
import { Slider } from "@mui/material";
import { CheckCircle, Star, Car, Filter, Users, Banknote, Award, } from "lucide-react";

export default function Sidebar() {
  const dispatch = useDispatch();
  // Select the filters slice directly
  const filters = useSelector((state) => state.filters);
  // Optional: provide fallback if state not ready
  const appliedFilters = filters || { priceRange: [125, 980], hotelName: "", propertyTypes: [], starRating: [] };


  const [tripDetails, setTripDetails] = useState({ pickupLocation: {}, dropLocation: {} });

  const carTypes = ["Sedan", "SUV", "Innova Crysta", "Hatchback"];
  const popularFilters = ["Instant Confirmation", "Free Cancellation Available", "Book @ ₹1", "Pay At Cab Available"];
  const customerRatings = [{ rating: 4.5, count: 16 }, { rating: 4, count: 10 }, { rating: 3.5, count: 10 }, { rating: 3, count: 5 }];
  const seatOptions = ["4-5 Seats", "5-7 Seats", "Others"];
  const carModels = ["WagonR or similar", "Dzire or similar", "InnovaCrysta or similar", "Ertiga or similar", "xylo or similar"];


  useEffect(() => {
    if (typeof window === "undefined") return; // ❌ Skip on server

    try {
      const storedDataRaw = window.localStorage.getItem("tripDetails");
      if (storedDataRaw) {
        const storedData = JSON.parse(storedDataRaw);
        setTripDetails(storedData);
      }
    } catch (error) {
      console.error("Error parsing tripDetails from localStorage:", error);
    }
  }, []);


  // Features for different trip types
  const featuresMap = {
    oneway: [
      "One-way fare for doorstep pickup & drop-off",
      "No extra charges transparent pricing",
      "Pay only what’s shown no hidden fees",
      "Experienced & polite drivers",
      "Clean & comfortable cabs",
    ],
    roundtrip: [
      "Includes multiple pickups, sightseeing, and return to the starting point.",
      "No hidden fees—pay only the mentioned amount.",
      "Clean, well-maintained cabs for a smooth ride.",
      "Experienced, polite, and customer-friendly chauffeurs.",
      "Clean & comfortable cabs",
    ],
    airport: [
      "Includes flight tracking & waiting time at no extra cost.",
      "No hidden fees—pay only the mentioned amount.",
      "Clean, well-maintained cabs for a smooth ride.",
      "Experienced, polite, and customer-friendly chauffeurs.",
      "Clean & comfortable cabs",
    ],
    hourlyRental: [
      "Flexible rental duration for city travel.",
      "No hidden fees—pay only the mentioned amount.",
      "Clean, well-maintained cabs for a smooth ride.",
      "Experienced, polite, and customer-friendly chauffeurs.",
      "Clean & comfortable cabs",
    ],
  };

  // Get features based on selected trip type
  const selectedFeatures = featuresMap[tripDetails?.tripType] || [];

  // State to manage the filters
  const [localFilters, setLocalFilters] = useState({
    priceRange: [2460, 20000],
    carType: '',
    seats: '',
    popularFilters: [],
    customerRatings: [],
    carModels: []
  });

  const handleClearAll = () => {
    setLocalFilters({
      priceRange: [2460, 20000],
      carType: '',
      seats: '',
      popularFilters: [],
      customerRatings: [],
      carModels: []
    });
  };


  return (
    <div className="w-full hidden md:block md:w-1/4 p-6 bg-white rounded-3xl shadow-lg font-sans">
      {/* Header with Icon */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-600" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        </div>
        <button className="text-pink-600 text-sm font-semibold hover:underline" onClick={handleClearAll}>Clear All</button>
      </div>
      <p className="text-gray-500 text-sm mb-6">Showing 4 cabs</p>

      {/* Mandatory Features Section */}
      {selectedFeatures.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-sm mb-3 text-gray-700">Mandatory Features</h3>
          <div className="space-y-2">
            {selectedFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-green-600">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-base text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <hr className="border-t border-gray-200 my-6" />

      {/* Car Type Section with Icon */}
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Car size={18} />Car Type</h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {carTypes.map((type) => (
          <button
            key={type}
            className="border-2 border-gray-200 px-4 py-3 rounded-xl text-xs font-semibold bg-gray-50 text-gray-700 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200"
          >
            {type}
          </button>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-6" />

      {/* Popular Filters Section with Icon */}
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Award size={18} />Popular Filters</h3>
      <div className="space-y-3 mb-6">
        {popularFilters.map((filter) => (
          <label key={filter} className="flex items-center gap-3 text-gray-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 rounded-md border-gray-300 focus:ring-purple-500" />
            <span className="text-sm font-medium">{filter}</span>
          </label>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-6" />

      {/* Pricing Range Section with Icon */}
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Banknote size={18} />Pricing Range in ₹</h3>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-semibold text-gray-700">2460</span>
        <div className="flex-grow">
          <Slider
            value={appliedFilters.priceRange}
            onChange={(e, newValue) => dispatch(setPriceRange(newValue))}
            min={125}
            max={980}
            valueLabelDisplay="auto"
            sx={{
              color: "#ec4899",
              '& .MuiSlider-thumb': {
                backgroundColor: '#fff',
                border: '2px solid #ec4899',
              },
            }}
          />

        </div>
        <span className="text-sm font-semibold text-gray-700">20000</span>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-6" />

      {/* Customer Ratings Section with Icon */}
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Star size={18} />Customer Ratings</h3>
      <div className="space-y-3 mb-6">
        {customerRatings.map(({ rating, count }) => (
          <label key={rating} className="flex items-center gap-3 text-gray-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 rounded-md border-gray-300 focus:ring-purple-500" />
            <span className="flex items-center gap-1 font-semibold text-sm">
              <Star fill="#FCD34D" stroke="none" className="text-yellow-400" size={16} /> {rating}+
            </span>
            <span className="ml-auto text-gray-500 text-sm">{count}</span>
          </label>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-6" />

      {/* Seats Section with Icon */}
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Users size={18} />Seats</h3>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {seatOptions.map((seat) => (
          <button
            key={seat}
            className="border-2 border-gray-200 px-4 py-3 rounded-xl text-xs font-semibold bg-gray-50 text-gray-700 hover:bg-purple-100 hover:border-purple-300 transition-colors duration-200"
          >
            {seat}
          </button>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-200 my-6" />

      {/* Car Model Section with Icon */}
      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2"><Car size={18} />Car Model</h3>
      <div className="space-y-3">
        {carModels.map((model) => (
          <label key={model} className="flex items-center gap-3 text-gray-700">
            <input type="checkbox" className="w-4 h-4 text-purple-600 rounded-md border-gray-300 focus:ring-purple-500" />
            <span className="text-sm font-medium">{model}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
