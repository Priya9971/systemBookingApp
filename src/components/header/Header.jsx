"use client"
import React, { useState } from 'react';
import Swiperslider from '../swiper/Swiperslider'
import MobileNav from '../mobileNavbar/MobileNav';
import ScrollingBanner from "@/components/scorlingbanner/ScrollingBanner";


function Header() {

  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);


  return (
    <div className='container-fluid'>
      <Swiperslider />
      <MobileNav />
      <ScrollingBanner />
    </div>
  )
}

export default Header
