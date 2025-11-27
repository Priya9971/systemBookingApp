"use client"
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCarSide, faEnvelope, faGear, faPoo } from '@fortawesome/free-solid-svg-icons';
import './MagicNavigationMenu.css';


function MenuIndicator() {
    const [activeLink, setActiveLink] = useState("home");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null; // Prevents rendering until component is mounted

    const handleClick = (link, e) => {
        e.preventDefault();
        setActiveLink(link);
    };

    return (
        <div className="mobileContainer pt-3">
            <a href="#" onClick={(e) => handleClick("home", e)} className={activeLink === "home" ? "active" : ""}>
                <FontAwesomeIcon icon={faHome} className="icon" />
                <span className="label">Home</span>
            </a>
            <a href="#" onClick={(e) => handleClick("packages", e)} className={activeLink === "packages" ? "active" : ""}>
                <FontAwesomeIcon icon={faCarSide} className="icon" />
                <span className="label">Packages</span>
            </a>
            <a href="#" onClick={(e) => handleClick("offers", e)} className={activeLink === "offers" ? "active" : ""}>
                <FontAwesomeIcon icon={faPoo} className="icon" />
                <span className="label">Offers</span>
            </a>
            <a href="#" onClick={(e) => handleClick("messages", e)} className={activeLink === "messages" ? "active" : ""}>
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <span className="label">Messages</span>
            </a>
            <a href="#" onClick={(e) => handleClick("account", e)} className={activeLink === "account" ? "active" : ""}>
                <FontAwesomeIcon icon={faGear} className="icon" />
                <span className="label">Account</span>
            </a>
        </div>
    );
}

export default MenuIndicator;