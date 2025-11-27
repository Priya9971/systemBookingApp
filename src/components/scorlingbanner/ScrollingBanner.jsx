"use client";

import React, { useState, useRef, useEffect } from "react";

const OFFERS = [
  // Bank Offers
  {
    id: "bank-1",
    type: "bank",
    title: "Flat 12% Off on Axis Bank Credit Cards",
    subtitle: "Plus Interest Free EMI on Flights",
    badge: "EXCLUSIVE",
    color: "bg-[linear-gradient(135deg,#E3F2FD,rgba(227,242,253,0.85))]",
    categories: ["All Offers", "Bank Offers"],
  },
  {
    id: "bank-2",
    type: "bank",
    title: "Get up to ₹2,000 Off with HDFC Credit Card",
    subtitle: "On various bookings + Interest Free EMI",
    color: "bg-[linear-gradient(135deg,#E3F2FD,#F3F8FF)]",
    categories: ["All Offers", "Bank Offers"],
  },
  {
    id: "bank-3",
    type: "bank",
    title: "10% Cashback on SBI Cards",
    subtitle: "Max cashback ₹1,500. Limited time deal!",
    color: "bg-[linear-gradient(135deg,#E3F2FD,#E8F4FF)]",
    categories: ["All Offers", "Bank Offers"],
  },
  {
    id: "bank-4",
    type: "bank",
    title: "Flat ₹500 Off on ICICI Debit Cards",
    subtitle: "Minimum booking value ₹5,000.",
    color: "bg-[linear-gradient(135deg,#E3F2FD,#EAF6FF)]",
    categories: ["All Offers", "Bank Offers"],
  },

  // Holidays
  {
    id: "holiday-1",
    type: "holiday",
    badge: "EXCLUSIVE",
    title: "Explore Malaysia Holiday Packages",
    subtitle: "Starting at ₹6,999",
    color: "bg-[linear-gradient(135deg,#FFF3E0,#FFF9F0)]",
    categories: ["All Offers", "Holidays"],
  },
  {
    id: "holiday-2",
    type: "holiday",
    title: "Bali Beach Escape",
    subtitle: "5 Nights, 6 Days all-inclusive package",
    color: "bg-[linear-gradient(135deg,#FFF3E0,#FFF5EB)]",
    categories: ["All Offers", "Holidays"],
  },
  {
    id: "holiday-3",
    type: "holiday",
    title: "European Rail Tour",
    subtitle: "Book now and save 20% on group tours",
    color: "bg-[linear-gradient(135deg,#FFF3E0,#FFF8F0)]",
    categories: ["All Offers", "Holidays"],
  },
  {
    id: "holiday-4",
    type: "holiday",
    title: "Domestic Weekend Getaways",
    subtitle: "Starting from ₹3,999 per person",
    color: "bg-[linear-gradient(135deg,#FFF3E0,#FFF7EE)]",
    categories: ["All Offers", "Holidays"],
  },

  // Cabs
  {
    id: "cabs-1",
    type: "cabs",
    title: "Up to ₹1,500 Off on Airport Cabs",
    subtitle: "Reliable and Fast Service",
    color: "bg-[linear-gradient(135deg,#E8F5E9,#F3FBF4)]",
    categories: ["All Offers", "Cabs"],
  },
  {
    id: "cabs-2",
    type: "cabs",
    badge: "EXCLUSIVE",
    title: "Flat ₹50 Off on First Cab Ride",
    subtitle: "Use code FIRSTCAB",
    color: "bg-[linear-gradient(135deg,#E8F5E9,#F1FAF3)]",
    categories: ["All Offers", "Cabs"],
  },
  {
    id: "cabs-3",
    type: "cabs",
    title: "20% Discount on Rental Cabs",
    subtitle: "For 8 hours or more bookings",
    color: "bg-[linear-gradient(135deg,#E8F5E9,#EEF9F0)]",
    categories: ["All Offers", "Cabs"],
  },
  {
    id: "cabs-4",
    type: "cabs",
    title: "Airport Drop for ₹499",
    subtitle: "Fixed pricing in major metro cities",
    color: "bg-[linear-gradient(135deg,#E8F5E9,#ECF8EE)]",
    categories: ["All Offers", "Cabs"],
  },
];

const TABS = ["All Offers", "Bank Offers", "Holidays", "Cabs"];

const OffersForYou = () => {
  const [activeTab, setActiveTab] = useState("All Offers");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const scrollRef = useRef(null);

  // Filter offers based on active tab
  const filteredOffers = OFFERS.filter((o) => o.categories.includes(activeTab));

  // Scroll behavior
  const CARD_GAP = 16; // px

  // Scroll helpers
  const scrollByCard = (dir = 1) => {
    const container = scrollRef.current;
    if (!container) return;

    // Calculate card width based on first child for adaptive scrolling
    const firstChild = container.querySelector(".offer-card");
    const cardWidth = firstChild
      ? firstChild.getBoundingClientRect().width
      : 300;

    const offset = Math.round((cardWidth + CARD_GAP) * dir);

    container.scrollBy({ left: offset, behavior: "smooth" });
  };

  const onPrev = () => scrollByCard(-1);
  const onNext = () => scrollByCard(1);

  // Keyboard navigation for cards
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, []);

  // Reset scroll on tab change
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({ left: 0, behavior: "smooth" });
    setFocusedIndex(0);
  }, [activeTab]);

  return (
    <section className="w-full p-2 bg-gradient-to-br from-white via-gray-50 to-blue-50 font-sans">
      <div className="w-full px-2 md:px-4 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 sm:mb-0 border-l-4 border-blue-600 pl-4">
            Exclusive Offers Just For You
          </h2>

          <div className="flex items-center gap-4">
            {/* Tabs */}
            <div className="flex overflow-x-auto whitespace-nowrap pb-1 mr-2">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-3 py-2 text-xs transition-all mr-3  focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    activeTab === tab
                      ? "bg-blue-600 text-white font-bold rounded-full border-2 border-blue-700"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 font-medium rounded-full"
                  }`}
                  aria-pressed={activeTab === tab}
                >
                  {tab}
                </button>
              ))}
            </div>

            <a
              href="#"
              className="text-orange-500 text-sm font-bold flex items-center flex-shrink-0 hover:text-orange-600 transition-colors"
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Carousel area */}
        <div className="relative">
          {/* Prev/Next Buttons */}
          <button
            onClick={onPrev}
            aria-label="Scroll left"
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-white/90 shadow-xl transition-transform hover:scale-105 active:scale-95 border border-gray-100 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#007bff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={onNext}
            aria-label="Scroll right"
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-white/90 shadow-xl transition-transform hover:scale-105 active:scale-95 border border-gray-100 backdrop-blur-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#007bff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Cards container */}
          {filteredOffers.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">
              No offers found in {activeTab}.
            </p>
          ) : (
            <div
              ref={scrollRef}
              tabIndex={0}
              role="list"
              aria-label={`${activeTab} offers`}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 px-2 md:px-0"
              style={{ scrollPadding: "1rem" }}
            >
              {filteredOffers.map((offer, idx) => (
                <article
                  key={offer.id}
                  role="listitem"
                  className={`offer-card snap-start flex-shrink-0 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] p-2`}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all duration-300 h-full ${offer.color}`}
                    style={{ minHeight: 180 }}
                    onMouseEnter={() => setFocusedIndex(idx)}
                  >
                    {/* soft overlay for contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent"></div>

                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-gray-900">
                      {offer.badge && (
                        <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                          {offer.badge}
                        </span>
                      )}

                      <div className="mt-auto">
                        <h3 className="text-xl md:text-2xl font-extrabold leading-snug">
                          {offer.title}
                        </h3>
                        <p className="text-sm md:text-sm font-medium mt-1 opacity-90">
                          {offer.subtitle}
                        </p>

                        <div className="mt-4 flex items-center gap-3">
                          <button className="px-3 py-1.5 text-xs bg-white/90 rounded-full font-semibold shadow-sm hover:shadow-md">
                            Book Now
                          </button>
                          <button className="px-3 py-1.5 text-xs bg-white/5 border border-white/20 rounded-full font-medium hover:bg-white/10">
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* hide native scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default OffersForYou;
