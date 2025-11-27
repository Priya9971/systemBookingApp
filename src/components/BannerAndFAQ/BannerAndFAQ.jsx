"use client";

import React, { useState } from "react";
import { ChevronDown, Phone, Mail } from "lucide-react";

const faqData = [
  {
    question: "How can I book a cab with GoRydeWay?",
    answer:
      "Booking a cab is easy! Just open the GoRydeWay app or website, enter your pickup and drop-off details, select your preferred vehicle, and confirm the booking.",
  },
  {
    question: "What types of cars are available on GoRydeWay?",
    answer:
      "We offer a range of vehicles to suit every need — from compact hatchbacks and comfortable sedans to spacious SUVs for group travel or outstation trips.",
  },
  {
    question: "Can I schedule multiple pickups or drops?",
    answer:
      "Yes, you can customize your ride with multiple pickups or drop locations. Simply add the stops while booking or contact our support team for help.",
  },
  {
    question: "Are there any extra charges when booking via app or website?",
    answer:
      "No hidden fees! Our pricing is fully transparent. A minimal convenience fee may apply during peak hours or high demand.",
  },
  {
    question: "What if I have extra luggage?",
    answer:
      "If you're carrying more than usual, we recommend booking an SUV or larger vehicle to ensure a comfortable journey.",
  },
  {
    question: "How do I find the latest offers on cab bookings?",
    answer:
      "Check the GoRydeWay app or website for the latest promo codes, cashback offers, and loyalty discounts. Don’t forget to subscribe to our newsletter!",
  },
];

export default function BannerAndFAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      {/* Banner */}
      <div className="mx-auto max-w-6xl px-6 sm:px-6 lg:px-8 relative mb-20">
        <div
          className="relative bg-gray-700 text-white rounded-3xl shadow-2xl pt-10 pb-24 px-6 md:px-16 lg:px-20 overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(to right, #423E53, #3A373A)",
          }}
        >
          {/* Background SVG */}
          <div
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.1'%3E%3Cpath d='M36 34L30 39 24 34 30 29zM24 42l6 5 6-5-6-5zM18 16l6 5 6-5-6-5zM42 16l6 5 6-5-6-5zM36 42l6 5 6-5-6-5zM24 4L30 9 36 4 30-1zM12 42l6 5 6-5-6-5zM18 4L24 9 30 4 24-1zM48 4L54 9 60 4 54-1zM42 4L48 9 54 4 48-1zM36 4L42 9 48 4 42-1zM0 42l6 5 6-5-6-5zM6 4L12 9 18 4 12-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "100px 100px",
              backgroundRepeat: "repeat",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between">
            {/* Text Content */}
            <div className="flex-grow text-right md:text-right">
              <h2 className="text-3xl md:text-3xl font-extrabold leading-tight mb-6">
                Hassle Free. 24×7 On-Trip Assistance
              </h2>
              <div className="flex flex-col sm:flex-row items-right md:justify-end space-y-3 sm:space-y-0 sm:space-x-8">
                <a
                  href="tel:+917982309382"
                  className="flex items-right text-lg font-semibold hover:text-gray-200"
                >
                  <Phone className="mr-3" />
                  +91-7982309382
                </a>
                <a
                  href="mailto:support@gorydeway.com"
                  className="flex items-right text-lg font-semibold hover:text-indigo-200"
                >
                  <Mail className="mr-3" />
                  support@gorydeway.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping Image */}
        <div className="absolute left-1/2 md:left-24 transform -translate-x-1/2 md:translate-x-0 bottom-[-47px] z-20">
          <img
            src="images/SupportAgent.png"
            alt="Customer Support"
            className="w-64 h-auto rounded-2xl shadow-xl"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl font-bold text-left text-gray-800 mb-4">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-3 text-left hover:bg-indigo-50"
              >
                <span className="text-sm font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-indigo-500 transition-transform duration-200 ${activeIndex === index ? "rotate-180" : ""
                    }`}
                />
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4 text-gray-700 text-sm border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
