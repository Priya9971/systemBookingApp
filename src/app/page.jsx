import Header from "@/components/header/Header";
import DownloadApp from '../components/downloadApp/DownloadApp';
import TrendingDestination from "@/components/trendingPlace/TrendingDestination";
import MenuIndicator from "@/components/MenuIndicator/MenuIndicator";
import Footer from "@/components/footer/Footer";
import CatSlider from "@/components/catSlider/CatSlider"
import WhyChooseUS from "@/components/WhyChooseUS/whychoose"
import AboutCompany from "@/components/AboutCompany/aboutCompany";
import BannerAndFAQ from "@/components/BannerAndFAQ/BannerAndFAQ";
import RentalCabs from "@/components/RentalCabs/rentalCabs";

export default function Home() {
  return (
    <div className="">
      <Header/>
      <DownloadApp />
      <CatSlider />
      <WhyChooseUS/>
      <RentalCabs/>
      <TrendingDestination/>
      <BannerAndFAQ/>
      <Footer/>
      <MenuIndicator/>
    </div>
  );
}
