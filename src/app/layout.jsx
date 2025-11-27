import { Inter } from "next/font/google";
import "./globals.css";
import "./style.css";
import Navbar from "@/components/navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.jsx";
import "./next.config.js";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Cab Booking | Book cheap, Budget & Luxury Cabs-GorideWay",
  description: "Online Cab Booking | Book cheap, Budget & Luxury Cabs-GorideWay",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
