"use client"
import React from 'react'
import './mobilenav.css'
import { Container} from 'react-bootstrap';
import Menucard from '../menucard/Menucard';
import {MobileLink} from "@/components/menucard/mobileLink";

function MobileNav() {
  return (
    <Container className="mobileView">
      <div className="menuCategory">
        {MobileLink && MobileLink.map((data) =>(
            <div key={data.id}>
              <Menucard imgSrc={data.imgSrc} name={data.name}  path={data.path} isActive />
           </div>
          ))
        }
      </div>
      
    </Container>
  )
}

export default MobileNav
