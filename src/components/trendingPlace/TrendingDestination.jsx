"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, Heart } from 'lucide-react';

function TrendingDestination() {
  const [destinationData, setDestinationData] = useState([
    {
      id: 1,
      title: "Delhi To Rishikesh",
      image: "../images/Tour/Delhi-rishikesh.png",
      distance: "229.9 km",
      estimatedTime: "6 hrs",
      liked: "http://localhost:3000/cabs",
    },
    {
      id: 2,
      title: "Delhi To Nainital",
      image: "../images/Tour/naimital.png",
      distance: "229.9 km",
      estimatedTime: "7 hrs",
      liked: false,
    },
    {
      id: 3,
      title: "Delhi To Agra",
      image: "../images/Tour/Delhi-Agra.png",
      distance: "229.9 km",
      estimatedTime: "5 hrs",
      liked: false,
    },
    {
      id: 4,
      title: "Delhi To Jaipur",
      image: "../images/Tour/Delhi-rishikesh.png",
      distance: "281.3 km",
      estimatedTime: "6 hrs",
      liked: false,
    },
    {
      id: 5,
      title: "Delhi To Manali",
      image: "../images/Tour/naimital.png",
      distance: "537.6 km",
      estimatedTime: "12 hrs",
      liked: false,
    },
    {
      id: 6,
      title: "Delhi To Shimla",
      image: "../images/Tour/Delhi-Agra.png",
      distance: "342.7 km",
      estimatedTime: "7 hrs",
      liked: false,
    },
    {
      id: 7,
      title: "Delhi To Mussoorie",
      image: "../images/Tour/Delhi-rishikesh.png",
      distance: "290.6 km",
      estimatedTime: "7 hrs",
      liked: false,
    },
    {
      id: 8,
      title: "Delhi To Haridwar",
      image: "../images/Tour/naimital.png",
      distance: "220.3 km",
      estimatedTime: "5 hrs",
      liked: false,
    },
    {
      id: 9,
      title: "Delhi To Udaipur",
      image: "../images/Tour/Delhi-Agra.png",
      distance: "663.9 km",
      estimatedTime: "12 hrs",
      liked: false,
    },
    {
      id: 10,
      title: "Delhi To Varanasi",
      image: "../images/Tour/Delhi-rishikesh.png",
      distance: "863.3 km",
      estimatedTime: "14 hrs",
      liked: false,
    },
    {
      id: 11,
      title: "Delhi To Amritsar",
      image: "../images/Tour/naimital.png",
      distance: "450.8 km",
      estimatedTime: "8 hrs",
      liked: false,
    },
    {
      id: 12,
      title: "Delhi To Chandigarh",
      image: "../images/Tour/Delhi-Agra.png",
      distance: "244.6 km",
      estimatedTime: "5 hrs",
      liked: false,
    }
  ]);


  const handleLikeToggle = (id, event) => {
    event.stopPropagation(); 
    setDestinationData((prevData) =>
      prevData.map((dest) =>
        dest.id === id ? { ...dest, liked: !dest.liked } : dest
      )
    );
  };


  const handleCardClick = (destinationTitle) => {

    window.location.href = `https://example.com/booking-list?destination=${encodeURIComponent(destinationTitle)}`;
  };
  return (
    <section className="py-12 bg-gray-50 font-sans antialiased">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Popular Outstation Places in India
          </h2>
          <p className="text-md text-gray-600 max-w-lg mx-auto">
            We've carefully curated a selection of the best travel destinations
            around India, just for you.
          </p>
        </div>

        {[0, 6].map((startIndex, rowIndex) => (
          <div
            key={startIndex}
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center ${rowIndex === 1 ? "mt-8" : "" // Add top margin for the second row
              }`}
          >
            {destinationData
              .slice(startIndex, startIndex + 6)
              .map((destination) => (
                <motion.div
                  key={destination.id} 
                  className="w-full max-w-xs bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer overflow-hidden flex flex-col items-center justify-between relative" // 'relative' for positioning the like button
                  whileHover={{ scale: 1.05, y: -5 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{
                    duration: 0.5,
                    delay: (destination.id - 1) * 0.07, 
                  }}
                  onClick={() => handleCardClick(destination.title)} 
                >

                  {/* Destination Image Container */}
                  <div className="w-full h-32 overflow-hidden rounded-t-xl">
                    <a href="#" className="block h-full" onClick={(e) => e.preventDefault()}>
                      <motion.img
                        src={destination.image}
                        alt={destination.title}
                        className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = `https://placehold.co/400x250/E0E7FF/4F46E5?text=${encodeURIComponent(
                            destination.title.split(' ')[2] || 'Destination' 
                          )}`;
                        }}
                        whileHover={{ scale: 1.1 }} 
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </div>

                  {/* Destination Details */}
                  <div className="p-4 text-center w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                      {destination.title}
                    </h3>
                    <div className="flex items-center justify-center text-gray-500 text-sm space-x-4">
                      {/* Distance - Car icon */}
                      <div className="flex items-center">
                        <Car size={16} className="text-indigo-500 mr-1" />
                        <span>{destination.distance}</span>
                      </div>
                      {/* Estimated Time */}
                      <div className="flex items-center">
                        <Clock size={16} className="text-indigo-500 mr-1" />
                        <span>{destination.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingDestination;
