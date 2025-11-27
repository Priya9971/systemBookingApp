"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Clock,
    CreditCard,
    MapPin,
    PhoneCall,
    Zap,
} from "lucide-react";

const features = [
    {
        icon: <Zap className="h-6 w-6 text-indigo-600" />,
        title: "Instant Bookings",
        description: "Book a cab anytime, anywhere in just a few taps.",
    },
    {
        icon: <MapPin className="h-6 w-6 text-indigo-600" />,
        title: "Real-Time Tracking",
        description: "Track your ride in real time and never miss a beat.",
    },
    {
        icon: <Clock className="h-6 w-6 text-indigo-600" />,
        title: "24/7 Availability",
        description: "Day or night, rain or shine — we’re always here.",
    },
    {
        icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
        title: "Verified Drivers",
        description: "Travel safely with trained and background-checked drivers.",
    },
    {
        icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
        title: "Flexible Payments",
        description: "Choose from UPI, cards, wallets, or cash.",
    },
    {
        icon: <PhoneCall className="h-6 w-6 text-indigo-600" />,
        title: "Emergency Support",
        description: "We’re just a call away, anytime you need help.",
    },
];

function AboutCompany() {
    return (
        <section className="bg-gray-50 py-16 px-6 lg:px-0">
            <motion.div
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Why Choose Us for Online Cab Booking
                    </h2>
                    <p className="text-md text-gray-600 max-w-xl mx-auto">
                        Seamlessly connect to 200+ cities with safe, reliable, and
                        eco-conscious rides. Trusted by thousands daily.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Company Info */}
                    <div className="space-y-4 text-gray-800 text-sm leading-relaxed">
                        <p>
                            GoRydeWay is revolutionizing urban transport with easy and
                            efficient cab booking across India. From daily commutes to urgent
                            airport rides, our platform ensures reliable transport at your
                            fingertips.
                        </p>
                        <p>
                            Choose from a range of vehicles — hatchbacks, sedans, SUVs — with
                            upfront pricing, cashback offers, and loyalty rewards.
                        </p>
                        <p>
                            Safety is our top priority. All drivers are vetted, and rides come
                            with live tracking, 24/7 support, and emergency assistance.
                        </p>
                        <p>
                            Our intuitive app ensures that booking, managing, and tracking
                            your rides is as smooth as the journey itself.
                        </p>
                        <p>
                            Join us in our green mission with shared rides and eco-friendly
                            cab options. Ride smarter. Ride greener.
                        </p>
                        <p>
                            GoRydeWay is more than just a cab booking service — it's a
                            commitment to transforming how India moves. Whether you're heading
                            to the office during peak hours, catching a red-eye flight, or
                            planning a weekend escape, GoRydeWay offers a smooth, reliable,
                            and tech-enabled travel experience tailored to your needs.
                        </p>
                        <p>
                            Flexibility is at your fingertips. Choose from a wide fleet of
                            vehicles — from compact hatchbacks for solo travelers to spacious
                            SUVs for family trips. Transparent pricing, cashback rewards, and
                            loyalty benefits ensure you save more while riding better.
                        </p>
                        <p>
                            With verified drivers, real-time tracking, and built-in emergency
                            features, we prioritize your safety and comfort on every ride.
                            Plus, our 24/7 customer support ensures help is always a tap away.
                        </p>
                        <a
                            href="#"
                            className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                        >
                            Learn more about us &rarr;
                        </a>
                    </div>

                    {/* Right: Feature Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-start p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition"
                            >
                                <div className="mr-4">{feature.icon}</div>
                                <div>
                                    <h4 className="text-md font-semibold text-gray-900">
                                        {feature.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

export default AboutCompany;
