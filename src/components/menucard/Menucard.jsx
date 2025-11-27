"use client"
import React,{ useState } from 'react';

function Menucard({ imgSrc, name, path}) {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        if (isActive) {
            window.location.href = path;
        } 
    };

    return (
        <div className={`rowMenuCard`} onClick={handleClick}>
            <div className="imgBox">
                <img src={imgSrc} alt="" />
            </div>
            <h3>{name}</h3>
        </div>
    )
}

export default Menucard
