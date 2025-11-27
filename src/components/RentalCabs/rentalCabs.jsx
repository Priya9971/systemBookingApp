"use client"
import React from 'react';

// Self-contained icons for the UI
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 013 0m-3 0h6m-9 0H3.375a1.5 1.5 0 01-1.48-1.75l.75-2.25A1.5 1.5 0 013.882 13.5H20.25a1.5 1.5 0 011.48 1.75l-.75 2.25m-13.5 0a1.5 1.5 0 013 0m-3 0h6m-9 0h12" />
  </svg>
);

// Sample data for the car cards
const cars = [
  {
    id: 1,
    image: '/images/Tour/ErtigaElegent.png',
    city: 'Mumbai',
    state: 'Maharashtra, India',
    price: '2,500',
  },
  {
    id: 2,
    image: '/images/Tour/brandNewInnova.png',
    city: 'Chennai',
    state: 'Tamil Nadu, India',
    price: '1,500',
  },
  {
    id: 3,
    image: '/images/Tour/aura.jpg',
    city: 'Delhi',
    state: 'Delhi, India',
    price: '1,800',
  },
  {
    id: 4,
    image: '/images/Tour/cabImage.png',
    city: 'Bengaluru',
    state: 'Karnataka, India',
    price: '1,600',
  },
  {
    id: 6,
    image: '/images/Tour/hondaCity.png',
    city: 'Hyderabad',
    state: 'Andhra Pradesh, India',
    price: '1,900',
  },
];

function rentalCabs() {
  return (
    <div className="bg-gray-900 min-h-screen font-[Inter] text-gray-100">
      {/* Hero Section */}
      <div className="relative w-full h-96 bg-cover bg-center flex items-center justify-center p-8"
        style={{ backgroundImage: 'url(https://placehold.co/1920x1080/1c1f28/606575?text=Discover+Your+Perfect+Ride)', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-md">
            Find Your Freedom.
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto mb-8 drop-shadow-md">
            The simplest way to rent a car, with flexible hourly, daily, or weekly options.
          </p>
          <button className="bg-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center mx-auto space-x-2">
            <SearchIcon />
            <span><a href='#'>Start Your Search</a></span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Flexible Hourly Rentals
        </h2>
        <p className="text-lg text-gray-400 max-w-3xl mb-12">
          Choose from a wide range of cars available for rent by the hour, perfect for short trips and city commutes.
        </p>

        {/* Cards Scrollable Area */}
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide py-4">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex-shrink-0 w-72 sm:w-80 bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative w-full h-48">
                <img
                  src={car.image}
                  alt={`${car.city} car rental`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{car.city}</h3>
                <p className="text-sm text-gray-400 mb-4">{car.state}</p>
                <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-700">
                  <div className="flex items-end">
                    <span className="text-lg font-medium text-gray-500">From</span>
                    <span className="text-3xl font-bold text-white ml-2">₹{car.price}</span>
                  </div>
                  <a href="#" className="text-lg font-semibold text-red-500 hover:text-red-400 transition-colors">
                    Book →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default rentalCabs;

