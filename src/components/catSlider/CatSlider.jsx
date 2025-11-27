"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Tag } from "lucide-react";

export default function CatSlider() {
  const destinations = [
    {
      id: 1,
      title: "Shimla",
      discount: "15% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹6821",
      duration: "Round Trip | 3 Days",
      image: "images/carousel/travel1.jpg",
    },
    {
      id: 2,
      title: "Kashmir",
      discount: "35% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹5795",
      duration: "Round Trip | 3 Days",
      image: "images/carousel/travel-2.jpg",
    },
    {
      id: 3,
      title: "Nainital",
      discount: "17% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹8795",
      duration: "Round Trip | 2 Days",
      image: "images/carousel/travel-3.jpg",
    },
    {
      id: 4,
      title: "GOA",
      discount: "16% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹11795",
      duration: "Round Trip | 3 Days",
      image: "images/carousel/travel-4.jpg",
    },
    {
      id: 5,
      title: "Haridwar",
      discount: "16% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹3795",
      duration: "Round Trip | 3 Days",
      image: "images/carousel/travel1.jpg",
    },
    {
      id: 6,
      title: "Kashmir",
      discount: "35% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹12795",
      duration: "Round Trip | 3 Days",
      image: "images/carousel/travel-2.jpg",
    },
    {
      id: 7,
      title: "Nainital",
      discount: "17% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹6795",
      duration: "Round Trip | 2 Days",
      image: "images/carousel/travel-3.jpg",
    },
    {
      id: 8,
      title: "GOA",
      discount: "16% Off",
      rating: 4.6,
      reviews: 52,
      price: "₹1795",
      duration: "Round Trip | 3 Days",
      image: "images/carousel/travel-4.jpg",
    },
  ];

  const wrapperRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const [slideWidth, setSlideWidth] = useState(0);
  const [current, setCurrent] = useState(0);

  const calculateSlidesToShow = () => {
    const w = window.innerWidth;

    if (w >= 1536) return 5; 
    if (w >= 1280) return 4; 
    if (w >= 992) return 3; 
    if (w >= 640) return 2; 
    return 1; 
  };

  const updateLayout = () => {
    const count = calculateSlidesToShow();
    setSlidesToShow(count);

    if (wrapperRef.current) {
      const width = wrapperRef.current.offsetWidth / count;
      setSlideWidth(width);
    }
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const next = () => {
    const max = destinations.length - slidesToShow;
    setCurrent((c) => (c >= max ? max : c + 1));
  };

  const prev = () => {
    setCurrent((c) => (c <= 0 ? 0 : c - 1));
  };

  useEffect(() => {
    const max = destinations.length - slidesToShow;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= max ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slidesToShow]);

  return (
    <section className="py-8 px-3 sm:px-4 bg-gray-50 font-inter overflow-hidden">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-blue-700 mb-2 sm:mb-0 border-l-4 border-blue-600 pl-4">
              Top Trending Destinations
            </h2>
          </div>

          {/* CITY FILTERS */}
          <div className="flex gap-2 p-2 overflow-x-auto no-scrollbar sm:overflow-visible">
            {["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai"].map(
              (c) => (
                <button
                  key={c}
                  className="px-3 py-1 text-xs sm:text-sm whitespace-nowrap bg-gray-100 border rounded-lg hover:bg-gray-200"
                >
                  {c}
                </button>
              )
            )}

            <a className="flex items-center text-red-600 text-xs sm:text-sm font-semibold hover:text-red-700 whitespace-nowrap">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative overflow-hidden">
          <div ref={wrapperRef} className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${current * slideWidth}px)`,
              }}
            >
              {destinations.map((d) => (
                <div
                  key={d.id}
                  style={{ width: `${slideWidth}px` }}
                  className="p-2 flex-shrink-0"
                >
                  <div className="bg-white rounded-xl shadow hover:shadow-xl transition border overflow-hidden flex flex-col h-[300px] sm:h-[315px]">
                    {/* IMAGE */}
                    <div className="h-[140px] sm:h-[170px] relative">
                      <img
                        src={d.image}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/600x400?text=Image+Unavailable";
                        }}
                      />
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow">
                        <Tag className="w-3 h-3" /> {d.discount}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-3 sm:p-4 flex flex-col justify-between">
                      {/* Rating */}
                      <div className="flex justify-center items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                i < Math.round(d.rating)
                                  ? "fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] sm:text-xs text-gray-600">
                          {d.rating} ({d.reviews})
                        </span>
                      </div>


                      {/* Title */}
                      <h3 className="text-[12px] sm:text-sm text-center font-bold text-blue-700 mt-2 leading-tight">
                        Now Get up to {d.discount}
                        <span className="inline-flex items-center px-1 text-blue-600">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block"
                          >
                            <path d="M17.4 7H4C3.4 7 3 7.4 3 8C3 8.6 3.4 9 4 9H17.4V7ZM6.60001 15H20C20.6 15 21 15.4 21 16C21 16.6 20.6 17 20 17H6.60001V15Z" />
                            <path
                              opacity="0.3"
                              d="M17.4 3V13L21.7 8.70001C22.1 8.30001 22.1 7.69999 21.7 7.29999L17.4 3ZM6.6 11V21L2.3 16.7C1.9 16.3 1.9 15.7 2.3 15.3L6.6 11Z"
                            />
                          </svg>
                        </span>
                        {d.title}
                      </h3>

                      {/* Price */}
                      <div className="text-center mt-2">
                        <h2 className="text-lg sm:text-xl font-extrabold text-blue-700">
                          {d.price}
                        </h2>
                        <p className="text-[10px] sm:text-xs text-gray-500">
                          {d.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ARROWS */}
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 sm:left-3 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 right-2 sm:right-3 -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
