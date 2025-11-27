"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../swiper/swiper.css";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import slider1 from "../../../public/images/carousel/banner-img1.png";
import slider2 from "../../../public/images/carousel/bannerImage-1.png";

function Swiperslider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="w-full relative">
            <Image
              src={slider1}
              alt="Banner" 
              width={1200}
              height={400}
              className="rounded-lg"
              priority
            />
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black/40 rounded-lg z-10 flex items-center justify-center">
              <div className="text-center space-y-2 px-4">
                <h2 className="text-white text-md md:text-xl font-bold">
                  Seamless and Reliable Cab Booking Across All India
                </h2>
              </div>
            </div> */}
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full relative">
            <Image
              src={slider2}
              alt="Slider 2"
              width={800}
              height={400}
              className="rounded-lg"
            />
            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-black/40 rounded-lg z-10 flex items-center justify-center">
              <div className="text-center space-y-2 px-4">
                <h2 className="text-white text-md md:text-xl font-bold">
                  Experience Hassle-Free Online Cab Booking in India
                </h2>
                <p className="text-white text-xs md:text-lg font-medium">
                  Fast, Easy & Reliable – Book Your Cab Now
                </p>
              </div>
            </div> */}
          </div>
        </SwiperSlide>

        {/* Autoplay Progress Indicator */}
        <div
          className="autoplay-progress absolute bottom-5 right-5 bg-white p-2 rounded-full shadow-md z-20"
          slot="container-end"
        >
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span
            ref={progressContent}
            className="text-xs font-semibold text-gray-700"
          ></span>
        </div>
      </Swiper>
    </div>
  );
}

export default Swiperslider;
