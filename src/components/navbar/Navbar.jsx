"use client";
import React, { useState, useEffect, useRef } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import "./Navbar.css";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import LoginModal from "@/app/login/page";



const ModelPopUp = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  const handleWrapperClick = (e) => {
    if (e.target.id === "wrapper") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-60 flex justify-center items-center z-[200] p-4 font-inter"
      id="wrapper"
      onClick={handleWrapperClick}
    >
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-2xl w-full relative transform transition-all duration-300 scale-100 opacity-100">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-3xl font-bold rounded-full p-1 leading-none transition-colors"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

function NavbarPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  const handleLoginClick = () => {
    if (location.pathname === "/login") return; // ❌ Prevent modal
    setShowLoginModal(true);
  };

  const menuLink = [
    {
      id: 1,
      title: "Hotels",
      path: "#",
      icon: "/images/Hotels.png",
      badge: "Coming Soon",
    },
    { id: 2, title: "Flights", path: "#", icon: "/images/Flights.png" },
    { id: 3, title: "Trains", path: "#", icon: "/images/Trains.png" },
    { id: 4, title: "Bus", path: "#", icon: "/images/Buses.png" },
    { id: 5, title: "Cabs", path: "/", icon: "/images/cabs.png", active: true },
    {
      id: 6,
      title: "Holidays",
      path: "/holidaypackages",
      icon: "/images/Holidays.png",
    },
  ];

  const [loginData, setLoginData] = useState({ mobile: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const goToProfile = () => {
    setDropdownOpen(false);
    router.push("/auth/profile/UserProfile");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavigation = (path) => router.push(path);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!otpSent) {
        // Step 1: Send OTP
        await axios.post("/api/auth/send-otp", { phone: loginData.mobile });
        toast.success("OTP sent to your mobile number");
        setOtpSent(true);
      } else {
        // Step 2: Verify OTP → cookie is set in backend
        const res = await axios.post("/api/auth/verify-otp", {
          phone: loginData.mobile,
          code: loginData.otp,
        });
        toast.success(res.data.message || "Login successful");

        // ✅ Fetch user info from session
        const me = await axios.get("/api/auth/me", { withCredentials: true });
        if (me.data.authenticated) {
          setUser(me.data.user); // ✅ Store in state instead of Redux
          console.log("Fetched user:", me.data.user);
        }

        setShowModal(false);
        setLoginData({ mobile: "", otp: "" });
        setOtpSent(false);
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Restore user on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me");
        if (res.data.authenticated) {
          setUser(res.data.user);
        }
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      router.push("/");
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Failed to logout");
    }
  };

  return (
    <Navbar
      expand="lg"
      className="bg-white/90 sm:px-12 py-2 flex items-center justify-center shadow-sm fixed top-0 w-full z-[100]"
    >
      <Container fluid>
        {/* Logo + Animation */}
        <div className="relative flex items-center justify-center">
          <motion.div
            className="absolute w-20 h-18 mb-3 ml-8 sm:ml-8"
            initial={{ x: "-100%", opacity: 1 }}
            animate={{ x: "100%", opacity: [1, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 7,
              ease: "easeInOut",
              times: [0, 0.9, 1],
            }}
          >
            <Image
              src="/cab.png"
              alt="Cab"
              width={45}
              height={45}
              className="w-auto h-auto object-contain filter brightness-120"
            />
          </motion.div>

          <div
            onClick={() => (window.location.href = "/")}
            className="cursor-pointer text-[32px] font-bold text-slate-700 dark:text-white hover:scale-105 transition-transform duration-200 no-underline mt-3 me-4 fw-bold fs-3"
          >
            <span className="text-pink-600 dark:text-pink-400 hover:text-pink-500 drop-shadow-md">
              Ryd
            </span>
            <span className="text-blue-600 dark:text-sky-400 hover:text-sky-500 drop-shadow-md">
              eWay
            </span>
          </div>
        </div>

        {/* Menu Links */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mb-0 mb-lg-0 mt-2 gap-3">
            {menuLink.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`nav-item d-flex flex-column align-items-center position-relative ${
                  pathname === item.path ? "active-tab" : ""
                }`}
                style={{
                  cursor: "pointer",
                  padding: "6px",
                  borderRadius: "8px",
                }}
              >
                {item.badge && (
                  <span
                    className="badge position-absolute translate-middle-x bg-danger text-white px-2 py-1 rounded-pill"
                    style={{ fontSize: "8px", top: "-8px" }}
                  >
                    {item.badge}
                  </span>
                )}
                <div className="d-flex flex-column align-items-center text-dark text-decoration-none">
                  <img
                    src={item.icon}
                    alt={item.title}
                    width="39"
                    height="20"
                  />
                  <p className="mb-0" style={{ fontSize: "12px" }}>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </Nav>
        </Navbar.Collapse>

        {/* Login Modal */}
        <ModelPopUp
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
            setOtpSent(false);
          }}
        >
          <section className="flex flex-col md:flex-row min-h-fit md:min-h-[480px] w-full bg-white rounded-2xl overflow-hidden">
            {/* Left side */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-gradient-to-br from-sky-400 via-indigo-400 to-purple-500 text-white rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
              <div
                className="w-full h-full bg-center bg-cover bg-no-repeat rounded-xl shadow-lg"
                style={{
                  backgroundImage: `url('/images/Untitled design1.png')`,
                }}
                aria-label="Travel illustration"
              ></div>
              <h3 className="text-2xl font-bold mt-1 mb-0">
                Adventure Awaits!
              </h3>
              <p className="text-sm text-center px-4 opacity-90">
                Unlock personalized travel experiences.
              </p>
            </div>

            {/* Right side */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-white rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center drop-shadow-md">
                {otpSent ? "Verify OTP" : "Login / Signup"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mobile Input */}
                <div className="relative group">
                  <input
                    type="text"
                    name="mobile"
                    value={loginData.mobile}
                    onChange={handleInputChange}
                    required
                    disabled={otpSent}
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 peer placeholder-transparent"
                    placeholder=" "
                  />
                  <label className="absolute left-5 -top-3.5 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-700 cursor-text">
                    Enter Mobile No.
                  </label>
                </div>

                {/* OTP Input */}
                {otpSent && (
                  <div className="relative group">
                    <input
                      type="text"
                      name="otp"
                      value={loginData.otp}
                      onChange={handleInputChange}
                      required
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-300 peer placeholder-transparent"
                      placeholder=" "
                    />
                    <label className="absolute left-5 -top-3.5 text-sm text-gray-600 bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-700 cursor-text">
                      Enter OTP
                    </label>
                  </div>
                )}

                <div className="inputBx">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-[1.01]"
                  >
                    {otpSent ? "Verify OTP" : "Send OTP"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </ModelPopUp>

        {/* Login/Logout Button */}
        <div className="mt-3 sm:mt-0 relative" ref={dropdownRef}>
          {user ? (
            <div className="inline-flex items-center gap-3">
              {/* Avatar */}
              <div className="p-3 border-b border-gray-100 flex items-center gap-1">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500 hover:border-blue-700 transition-colors focus:outline-none flex items-center justify-center bg-gray-200 text-gray-700 font-bold"
                >
                  {user?.name ? (
                    <span className="text-xs">
                      {user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .substring(0, 2)
                        .toUpperCase()}
                    </span>
                  ) : user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-blue-500 " />
                  )}
                </button>

                {/* User name */}
                <span className="font-semibold text-sm text-blue-700">
                  {user
                    ? `${user.firstName || ""}`.trim() || "Hey, User"
                    : "Hey, User"}
                </span>
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-[236px] ml-0 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-gray-100 flex items-center gap-1">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-8 h-8 rounded-full overflow-hidden border-2 border-blue-500 hover:border-blue-700 transition-colors focus:outline-none flex items-center justify-center bg-gray-200 text-gray-700 font-bold"
                    >
                      {user?.name ? (
                        <span className="text-xs">
                          {user.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()}
                        </span>
                      ) : user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-blue-500" />
                      )}
                    </button>

                    {/* User name */}
                    <span className="font-semibold text-sm text-blue-700">
                      {user?.firstName || user?.phone}
                    </span>
                  </div>

                  <ul className="flex flex-col py-1">
                    <li>
                      <button
                        onClick={goToProfile}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {" "}
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => alert("Go to Settings")}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="bg-gradient-to-r from-blue-600 to-purple-500 text-white text-xs px-4 py-2 rounded-2xl font-semibold shadow-md transition-transform hover:scale-105"
              >
                Login / Signup
              </button>

              {showLoginModal && pathname !== "./login" && (
                <LoginModal onClose={() => setShowLoginModal(false)} />
              )}
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarPage;
