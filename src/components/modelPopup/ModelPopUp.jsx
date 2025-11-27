"use client";
import React from 'react';
import './modelPopup.scss';

function ModelPopUp({isVisible, onClose, children}) {
  if (!isVisible) return null;
  
  const handelClose =(e)=>{
    if(e.target.id === "wapper")onClose();
  }
  return (
    <div className='fixed inset-0 bg-transparent mt-14 bg-opacity-25 flex justify-center items-center rounded' id="wapper" onClick={handelClose}>
      <div className='modelApp w-[700px] flex flex-col'>
        {/* <button className='text-white-900 text-md place-self-end' onClick={()=> onClose()} >X</button> */}
        <div className='p-2 rounded-lg flex flex-col'>
            {children}
        </div>
      </div>
    </div>
  )
}

export default ModelPopUp
