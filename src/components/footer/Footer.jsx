"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <footer className="footer skin-light-footer p-[32px]">
            <div>
                <Container>
                    <Row>
                        <Col lg={3} md={6}>
                            <div className="footer-widget">
                                <div className="brandImg">
                                    <Link
                                        href="/"
                                        className="text-[32px] font-bold text-white hover:scale-105 transition-transform duration-200 no-underline me-4 fw-bold"
                                    >
                                        <span className="text-pink-800 hover:text-pink-600 drop-shadow-md">
                                            Ryd
                                        </span>
                                        <span className="text-sky-800 hover:text-sky-600 drop-shadow-md">
                                            eWay
                                        </span>
                                    </Link>
                                </div>

                                <div className="footer-add">
                                    <p>
                                        We make your dream more beautiful & joyful with lots of
                                        happiness.
                                    </p>
                                </div>

                                <div className="foot-socials">
                                    <ul>
                                        <li>
                                            <Link href="#">
                                                <i
                                                    className="fa-brands fa-facebook"
                                                    style={{ color: "#316FF6" }}
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i
                                                    className="fa-brands fa-linkedin"
                                                    style={{ color: "#0077b5" }}
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i
                                                    className="fa-brands fa-google-plus"
                                                    style={{ color: "#dd4b39" }}
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i
                                                    className="fa-brands fa-twitter"
                                                    style={{ color: "#1DA1F2" }}
                                                />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="#">
                                                <i
                                                    className="fa-brands fa-dribbble"
                                                    style={{ color: "#444444" }}
                                                />
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div className="footer mt-4">
                                    <h4 className="widget-title">Book Taxis Across India</h4>
                                    <ul className="footer-menu">
                                        <li>
                                            <Link href="#">Cheapest Cabs in Delhi</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Delhi Call Taxi</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Luxury Cabs in Delhi</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Delhi Airport Taxi</Link>
                                        </li>
                                        <li>
                                            <Link href="#">Event & Conference Cabs</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>

                        {/* Top Routes */}
                        <Col lg={2} md={6}>
                            <div className="footer-widget">
                                <h4 className="widget-title">Top Routes</h4>
                                <ul className="footer-menu">
                                    <li>
                                        <Link href="#">Delhi To Agra</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Delhi To Lucknow</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Delhi To Rishikesh</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Delhi To Nainital</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Delhi To Jaipur</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Delhi To Dehradun</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Dehradun To Delhi</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Agra To Delhi</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Jaipur To Delhi</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Delhi To Manali</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Delhi To Haridwar</Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        {/* Trending Routes */}
                        <Col lg={2} md={6}>
                            <div className="footer-widget">
                                <h4 className="widget-title">Trending Routes</h4>
                                <ul className="footer-menu">
                                    {[
                                        "New Delhi",
                                        "Noida",
                                        "Gurugram",
                                        "Ghaziabad",
                                        "Faridabad",
                                        "Neemrana",
                                        "Bawal",
                                        "Manesar",
                                        "Meerut",
                                        "Rohtak",
                                        "Sonipat",
                                        "Alwar",
                                    ].map((city, i) => (
                                        <li key={i}>
                                            <Link href="#">Cab Hire in {city}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>

                        {/* Best Places */}
                        <Col lg={2} md={6}>
                            <div className="footer-widget">
                                <h4 className="widget-title">Best Places</h4>
                                <ul className="footer-menu">
                                    {[
                                        "Alwar",
                                        "Hapur",
                                        "Dabri",
                                        "Dwarka",
                                        "Dhaula Kuan",
                                        "Inderpuri",
                                        "Mahipalpur",
                                        "Amritsar",
                                        "Palwal",
                                        "Kullu",
                                        "Shimla",
                                        "Manali",
                                    ].map((place, i) => (
                                        <li key={i}>
                                            <Link href="#">Taxi Service in {place}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>

                        {/* Company Info */}
                        <Col lg={3} md={6}>
                            <div className="footer-widget">
                                <h4 className="widget-title">Company</h4>
                                <ul className="footer-menu">
                                    <li>
                                        <Link href="#">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Terms & Conditions</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Customer Support</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Careers</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Privacy</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Help & Support</Link>
                                    </li>
                                </ul>

                                <h4 className="widget-title mt-5">Payment Methods</h4>
                                <div className="pmt-wrap">
                                    <Image
                                        src="/images/payment.png"
                                        width={200}
                                        height={40}
                                        alt="Payment Methods"
                                        className="h-auto w-auto max-w-full"
                                    />
                                </div>

                                <div className="our-prtwrap mt-4">
                                    <h4 className="widget-title fw-medium">Our Partners</h4>
                                    <div className="prtn-thumbs d-flex align-items-center justify-content-start">
                                        <div className="pmt-wrap pe-4">
                                            <Image
                                                src="/images/mytrip.png"
                                                width={100}
                                                height={40}
                                                alt="MyTrip"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="pmt-wrap pe-4">
                                            <Image
                                                src="/images/tripadv.png"
                                                width={100}
                                                height={40}
                                                alt="TripAdvisor"
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="pmt-wrap pe-4">
                                            <Image
                                                src="/images/goibibo.png"
                                                width={100}
                                                height={40}
                                                alt="Goibibo"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom border-top">
                <Container>
                    <Row className="align-items-center justify-content-between">
                        <Col xl={5} lg={5} md={5}>
                            <p className="mb-3 text-light">
                                © {new Date().getFullYear()} rideway Private Limited. All
                                rights reserved.
                            </p>
                        </Col>
                        <Col xl={7} lg={7} md={7}>
                            <ul className="privacy p-0 d-flex justify-content-start justify-content-md-end text-start text-md-end m-0">
                                <li>
                                    <Link href="#" className="text-light text-xs">
                                        Terms of Services
                                    </Link>
                                </li>
                                <li className="ms-3">
                                    <Link href="#" className="text-light text-xs">
                                        Privacy Policies
                                    </Link>
                                </li>
                                <li className="ms-3">
                                    <Link href="#" className="text-light text-xs">
                                        Cookies
                                    </Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
}

export default Footer;
