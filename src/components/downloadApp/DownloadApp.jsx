"use client";
import React from "react";
import { Download, Play, Apple, QrCode, TrendingUp, Zap } from "lucide-react";

export default function DownloadAppMinimalist() {
  return (
    <section className="bg-white py-12 sm:py-16 flex justify-center font-sans px-3 sm:px-6 lg:px-6">
      <div
        className="relative overflow-hidden bg-white w-full max-w-7xl h-auto min-h-[300px] rounded-xl shadow-2xl shadow-orange-300/50 border border-orange-500/30 flex flex-col md:flex-row items-stretch"
      >
        {/* Left Column: Core Message & Features */}
        <div className="flex-grow md:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 leading-snug">
            Unleash Your Potential with the{" "}
            <span className="text-red-600">App</span>!
          </h2>

          {/* Subtitle/Description (Keeping the original content) */}
          <p className="text-base text-gray-600 mb-6 max-w-md">
            Seamless bookings, real-time tracking, and exclusive offers at your
            fingertips.
          </p>

          {/* Offer Badge (Minimalist style) */}
          <div className="bg-orange-50 text-orange-800 p-3 rounded-lg w-full max-w-xs mb-6 flex items-center shadow-inner">
            <Zap className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
            <p className="text-sm font-semibold">
              Use Code{" "}
              <span className="font-extrabold text-orange-700">GORIDE25</span>{" "}
              for <span className="font-extrabold text-lg">25% OFF</span>!
            </p>
          </div>

          {/* Download Buttons (Row layout) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            {/* Google Play Button */}
            <a
              href="#"
              className="flex-1 flex items-center justify-center bg-gray-900 text-white px-4 py-3 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 group min-w-[140px]"
              aria-label="Download on Google Play"
            >
              <Play className="w-5 h-5 mr-3 text-green-400 group-hover:text-white transition-colors" />
              <div className="text-left">
                <p className="text-xs opacity-70 leading-none">Get it on</p>
                <h5 className="text-base font-bold">Google Play</h5>
              </div>
            </a>
            {/* App Store Button */}
            <a
              href="#"
              className="flex-1 flex items-center justify-center bg-red-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 group min-w-[140px]"
              aria-label="Download on App Store"
            >
              <Apple className="w-5 h-5 mr-3 text-white transition-colors" />
              <div className="text-left">
                <p className="text-xs opacity-80 leading-none">
                  Download on the
                </p>
                <h5 className="text-base font-bold">App Store</h5>
              </div>
            </a>
          </div>
        </div>

        {/* Right Column: QR Code & Visual Anchor */}
        <div
          className="md:w-2/5 relative flex flex-col items-center justify-center 
                        bg-red-500/90 p-8 rounded-b-xl md:rounded-l-none md:rounded-r-xl 
                        text-white shadow-inner shadow-black/10"
        >
          {/* Decorative Pattern (inspired by waves/data) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,50 C20,70 80,30 100,50 L100,100 L0,100 Z"
                fill="currentColor"
                className="text-orange-400"
              ></path>
            </svg>
          </div>

          <Download className="w-10 h-10 mb-3 relative z-10" />
          <h4 className="text-lg font-bold mb-4 relative z-10">
            Scan to Install
          </h4>

          {/* QR Code Block */}
          <div className="bg-white p-2 rounded-lg shadow-xl relative z-10">
            <QrCode className="w-8 h-8 text-gray-800 mb-1 mx-auto" />
            <img
              src="https://placehold.co/70x70/ffffff/000000?text=QR"
              alt="QR Code"
              className="w-18 h-18 rounded-sm mx-auto"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/70x70/cccccc/333333?text=QR+Error"; }}
            />
            <p className="text-center text-xs text-gray-600 mt-1 font-semibold">Scan to Download</p>
          </div>
        </div>
      </div>
    </section>
  );
}
