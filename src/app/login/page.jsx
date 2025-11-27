// app/login/page.js
"use client";
import ModelPopUp from '@/components/modelPopup/ModelPopUp';
import React, { useEffect, useState } from 'react';
import "@/components/navbar/Navbar.css";

export default function LoginPage() {
  const [showModel, setShowModel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    setShowModel(true); // Show the modal on page load
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', loginData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ModelPopUp isVisible={showModel} onClose={() => setShowModel(true)}>
      <div className='modelPop bg-blue-700'>
        <section className="boxModel">
          <div className="box">
            <div className="square" style={{ '--i': 0 }}></div>
            <div className="square" style={{ '--i': 1 }}></div>
            <div className="square" style={{ '--i': 2 }}></div>
            <div className="square" style={{ '--i': 3 }}></div>
            <div className="square" style={{ '--i': 4 }}></div>
            <div className="square" style={{ '--i': 5 }}></div>
            <div className="left">
              {/* <h2>Welcome back</h2>
              <p>Start Your Journey by One Click Explore beautiful world!</p> */}
              <div className="cartoonImg"></div>
            </div>
            <div className="boxContainer">
              <div className="form">
                <h2>Login/Signup</h2>
                <form onSubmit={handleSubmit}>
                  <div className="inputBx">
                    <input
                      type="text"
                      name="username"
                      value={loginData.username}
                      onChange={handleInputChange}
                      required
                    />
                    <span>Enter Mobile No.</span>
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="inputBx password">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <span>Enter OTP</span>
                    <a href="#" className={showPassword ? 'password-control view' : 'password-control'} onClick={togglePasswordVisibility}></a>
                    <i className="fas fa-key"></i>
                  </div>
                  <div className="inputBx">
                    <input
                      type="submit"
                      value="Log in"
                      disabled={!loginData.username || !loginData.password}
                    />
                  </div>
                </form>
                <p>Existing User?<a href="/login"> Log in</a></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ModelPopUp>
  );
}
