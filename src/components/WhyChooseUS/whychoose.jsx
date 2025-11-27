"use client"
import React from 'react';
import { MapPin, Globe, ShieldCheck, Headphones } from 'lucide-react'; 

function whychoose() {
    const benefits = [
    {
      icon: MapPin, // Lucide React Icon component
      title: 'Extensive Route Network',
      description: 'Explore over 10,000+ routes across India, ensuring seamless travel to almost any city, anytime.',
    },
    {
      icon: Globe, // Lucide React Icon component
      title: '150+ Countries Worldwide',
      description: 'Your trusted global travel partner: GoRydeWay provides reliable cab services in over  countries worldwide.',
    },
    {
      icon: ShieldCheck, // Lucide React Icon component
      title: '100% Full Refund Policy',
      description: 'Peace of mind guaranteed with our 100% full refund policy, offering free cancellation on eligible cab bookings.',
    },
    {
      icon: Headphones, // Lucide React Icon component
      title: '24/7 Dedicated Support',
      description: 'Our friendly and dedicated support team is available around the clock to assist you, anytime, anywhere.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
          Benefits To Book Cab With <span className="text-blue-600"> Us?</span>
        </h2>
        <p className="text-md text-gray-600 max-w-xl mx-auto">
          Experience unparalleled convenience, reliability, and support with our premium cab booking service.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                       border border-gray-200 flex flex-col items-center text-center group" // Added group for icon hover
          >
            <div className="p-3 bg-blue-100 rounded-full mb-6 transition-colors duration-300 group-hover:bg-blue-600">
              <benefit.icon className="h-8 w-8 text-blue-600 transition-colors duration-300 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-snug">
              {benefit.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* Optional: Call to Action below the benefits */}
      <div className="mt-16 text-center">
        <button
          className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-md
                     shadow-xl hover:bg-blue-700 transition-all duration-300 ease-in-out
                     transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Book Your Cab Now!
        </button>
      </div>
    </div>
  )
}

export default whychoose
