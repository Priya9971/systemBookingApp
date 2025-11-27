"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

const MenuBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const menuLink = [
    { id: 1, title: "Flights", path: "/flights", icon: "/icons/flights.png", badge: "Coming Soon" },
    { id: 2, title: "Hotels", path: "/hotels", icon: "/icons/hotels.png" },
    { id: 3, title: "Trains", path: "/trains", icon: "/icons/trains.png" },
    { id: 4, title: "Bus", path: "/bus", icon: "/icons/bus.png" },
    { id: 5, title: "Holidays", path: "/holidays", icon: "/icons/holidays.png" },
    { id: 6, title: "Cabs", path: "/cabs", icon: "/icons/cabs.png" },
  ];

  const handleNavigation = (path) => {
    router.push(path); // client-side navigation
  };

  return (
    <div className="d-flex gap-3 mt-3 justify-content-center flex-wrap">
      {menuLink.map((item) => (
        <div
          key={item.id}
          onClick={() => handleNavigation(item.path)}
          className={`d-flex flex-column align-items-center position-relative p-2 rounded ${
            pathname === item.path ? "active-tab" : ""
          }`}
          style={{ cursor: "pointer", minWidth: "70px" }}
        >
          {item.badge && (
            <span
              className="badge position-absolute top-0 translate-middle-x bg-danger text-white px-2 py-1 rounded-pill"
              style={{
                fontSize: "10px",
                top: "-12px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {item.badge}
            </span>
          )}
          <img src={item.icon} alt={item.title} width="40" height="40" />
          <p className="mt-1 mb-0" style={{ fontSize: "12px" }}>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuBar;
