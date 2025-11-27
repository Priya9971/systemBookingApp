"use client";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebarList/Sidebar";
import CabCard from "@/components/sidebarList/CabCard";
import PromotionBanner from "@/components/sidebarList/PromotionBanner";
import { setFilteredRoutes } from "@/redux/features/bookingSlice";
import { useRouter } from "next/navigation";



const capitalizeTripType = (str) =>
  str
    ? str.replace(/(^\w|[A-Z])/g, (s) => s.toUpperCase()).replace(/\s+/g, "")
    : "";

function FilterPage() {

  const dispatch = useDispatch();
  const { filteredRoutes } = useSelector((state) => state.booking);
  const [tripDetails, setTripDetails] = useState({ pickupLocation: {}, dropLocation: {} });
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("tripDetails");
    if (!storedData) return;

    const parsedData = JSON.parse(storedData);
    setTripDetails(parsedData);

    // ✅ Normalization helpers
    const normalize = (str) =>
      str?.toLowerCase().replace(/[\s-]/g, "").trim() || "";
    const normalizeCity = (city) =>
      city?.toLowerCase().replace(/division/i, "").trim() || "";

    // ✅ Extract and normalize data
    const pickupCity = normalizeCity(parsedData.pickupLocation?.city);
    const dropCity = normalizeCity(parsedData.dropLocation?.city);
    const tripType = normalize(parsedData.tripType);

    // ✅ Parse distance string safely
    const distanceString = parsedData.distance?.toLowerCase();
    const actualDis = distanceString
      ? parseFloat(distanceString.match(/\d+(\.\d+)?/)[0])
      : 0;

    // ✅ Handle pickup/return dates safely
    const pickupDate = parsedData.pickupDate ? new Date(parsedData.pickupDate) : null;
    const returnDate = parsedData.returnDate ? new Date(parsedData.returnDate) : null;

    // ✅ Calculate actualDistance based on your custom rules
    let actualDistance = 0;
    let diffInDays = 0;

    if (pickupDate && returnDate) {
      const diffInTime = returnDate.getTime() - pickupDate.getTime();
      diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // difference in days
    } else {
      diffInDays = 0; // default when one of the dates is missing
    }

    // ✅ Distance rules
    if (tripType === "roundtrip") {
      if (diffInDays === 0) {
        actualDistance = actualDis * 2; // same-day roundtrip
      } else if (diffInDays === 1) {
        actualDistance = 250 * 2;
      } else if (diffInDays === 2) {
        actualDistance = 250 * 3;
      } else if (diffInDays === 3) {
        actualDistance = 250 * 4;
      } else if (diffInDays === 4) {
        actualDistance = 250 * 5;
      } else {
        actualDistance = 250 * (diffInDays + 1); // for trips longer than 5 days
      }
    } else {
      // For one-way or hourly rentals, just use the map distance
      actualDistance = actualDis;
    }


    // ✅ Early exit validation
    if (
      !tripType ||
      !pickupCity ||
      (!dropCity && tripType !== "hourlyrental") ||
      (!actualDis && tripType !== "hourlyrental")
    )
      return;

    // ✅ Calculate route details
    const calculateRouteDetails = (route) => {
      if (normalize(route.tripType) === "hourlyrental") {
        return {
          ...route,
          actualDistance: 0,
          total_price: parseFloat(route.actualFare || route.total_price || 0),
          fare_breakdown: {
            baseFare: parseFloat(route.baseFare || 0),
            extraHour: parseFloat(route.extraHour || 0),
            extraKm: parseFloat(route.extraKm || 0),
            nightCharges: parseFloat(route.nightCharges || 0),
            convenienceFee: 0,
            gst: 0,
          },
        };
      }


      const {
        basekm = 0,
        per_km_charges = 0,
        per_km_extra_charges = 0,
        driver_charges_perday = 0,
        toll_tax = 0,
        airport_parking = 0,
        night_charges = 0,
        state_tax = 0,
        gst = 0,
        per_hour_charges = 0,
        hours = parsedData?.rentalHours || 1,
        minFare = 0, // optional minimum fare
      } = route || {};

      let baseFare = 0;
      let extraFare = 0;
      let distanceUsed = actualDistance;
      const driverCharges = driver_charges_perday;
      const convenienceFee = 58;

      console.log("actualDistance", actualDistance);

      // ✅ Fare logic
      if (tripType === "hourlyrental") {
        baseFare = Math.ceil(per_hour_charges * hours);
        distanceUsed = 0;
      } else {
        baseFare = Math.ceil(distanceUsed * per_km_charges);
      }


      console.log("per_km_charges", per_km_charges);


      const subtotal =
        baseFare +
        extraFare +
        toll_tax +
        state_tax +
        airport_parking +
        night_charges +
        driverCharges +
        convenienceFee;

      const gstAmount = (subtotal * gst) / 100;
      const total_price = Math.round(subtotal + gstAmount);

      console.log("💰 total_price:", total_price);

      return {
        ...route,
        actualDistance: distanceUsed,
        total_price,
        fare_breakdown: {
          baseFare,
          extraFare,
          driverCharges,
          tollTax: toll_tax,
          airportParking: airport_parking,
          nightCharges: night_charges,
          stateTax: state_tax,
          gst: Math.round(gstAmount),
          convenienceFee,
        },
      };
    };

    // ✅ Route filtering logic
    const filterRoutes = (routes) => {
      return routes.filter((route) => {
        const routeTripType = normalize(route.tripType);
        const source = normalizeCity(route.source);
        const destination = normalizeCity(route.destination);

        if (tripType === "hourlyrental")
          return routeTripType === "hourlyrental" && source === pickupCity;

        if (tripType === "airporttransfer")
          return (
            routeTripType === "airporttransfer" &&
            (source === pickupCity || destination === dropCity)
          );

        return (
          routeTripType === tripType &&
          source === pickupCity &&
          destination === dropCity
        );
      });
    };

    // ✅ Fetch both APIs and apply surge logic
    const fetchAndApplySurge = async () => {
      try {
        const [routesRes, hourlyRes] = await Promise.all([
          fetch("/api/routes"),
          fetch("/api/hourlyRental"),
        ]);

        const [routesData, hourlyData] = await Promise.all([
          routesRes.ok ? routesRes.json() : { data: [] },
          hourlyRes.ok ? hourlyRes.json() : { data: [] },
        ]);

        const allRoutes = [
          ...(routesData.data || []),
          ...(hourlyData.data || []),
        ];

        let matchedRoutes = filterRoutes(allRoutes);
        let processedRoutes = matchedRoutes.map(calculateRouteDetails);

        // ✅ Fetch Surge Data
        const surgeRes = await fetch("/api/surgeData");
        if (surgeRes.ok) {
          const surgeData = await surgeRes.json();
          const now = new Date();

          processedRoutes = processedRoutes.map((route) => {
            const isHourly = route.tripType === "hourlyrental";

            // ✅ Find applicable surge rule
            const surgeMatch = (surgeData.data || []).find((s) => {
              const start = new Date(s.startDate);
              const end = new Date(s.endDate);
              const inPeriod = now >= start && now <= end;

              const taxiTypeMatch = Array.isArray(s.taxiType)
                ? s.taxiType.some(
                  (type) => normalize(type) === normalize(route.carModel)
                )
                : true;

              const surgeFareTypeMatch = Array.isArray(s.surgeFareType)
                ? s.surgeFareType.some(
                  (type) => normalize(type) === normalize(route.tripType)
                )
                : true;

              const sourceMatch =
                s.sourceCity === "All Source Cities" ||
                normalizeCity(s.sourceCity) === normalizeCity(route.source);

              const destMatch =
                s.destinationCity === "All Destinations" ||
                normalizeCity(s.destinationCity) === normalizeCity(route.destination);

              return (
                inPeriod &&
                taxiTypeMatch &&
                surgeFareTypeMatch &&
                sourceMatch &&
                destMatch
              );
            });

            // ✅ Surge price application
            if (surgeMatch && surgeMatch.surgeAmount) {
              const surgePercent = parseFloat(surgeMatch.surgeAmount) || 0;
              const gstRate = route.gst || 0;

              const {
                baseFare = 0,
                extraFare = 0,
                tollTax = 0,
                airportParking = 0,
                nightCharges = 0,
                stateTax = 0,
                driverCharges = 0,
                convenienceFee = 0,
              } = route.fare_breakdown || {};

              let surgedTotal = route.total_price || 0;
              let surgedBaseFare = baseFare;

              if (isHourly) {
                // ✅ For hourly rentals — apply surge on total fare
                const surgeValue = (route.total_price * surgePercent) / 100;
                surgedTotal = Math.round(route.total_price + surgeValue);

                console.log("------ 🕒 Hourly Surge Debug Info ------");
                console.log("Car:", route.carModel);
                console.log("TripType:", route.tripType);
                console.log("Actual Distance:", 0);
                console.log("Per Km Charges:", route.per_km_charges);
                console.log("Base Fare:", baseFare);
                console.log("Extra Fare:", extraFare);
                console.log("Toll Tax:", tollTax);
                console.log("Airport Parking:", airportParking);
                console.log("Night Charges:", nightCharges);
                console.log("State Tax:", stateTax);
                console.log("Driver Charges:", driverCharges);
                console.log("Convenience Fee:", convenienceFee);
                console.log("GST (%):", gstRate);
                console.log("Surge %:", surgePercent);
                console.log("Total Before Surge:", route.total_price);
                console.log("Total After Surge:", surgedTotal);
                console.log("----------------------------------------");

                return {
                  ...route,
                  surged: true,
                  surgePercent,
                  total_price: surgedTotal,
                  actualDistance: 0, // ✅ Hourly rental always zero distance
                  fare_breakdown: {
                    ...route.fare_breakdown,
                    gst: Math.round((surgedTotal * gstRate) / 100),
                  },
                };
              } else {
                // ✅ For other trip types — apply surge only on base fare
                surgedBaseFare = Math.round(baseFare + (baseFare * surgePercent) / 100);

                const newSubtotal =
                  surgedBaseFare +
                  extraFare +
                  tollTax +
                  airportParking +
                  nightCharges +
                  stateTax +
                  driverCharges +
                  convenienceFee;

                const gstAmount = Math.round((newSubtotal * gstRate) / 100);
                surgedTotal = Math.round(newSubtotal + gstAmount);

                console.log("------ 🚖 Surge Debug Info ------");
                console.log("Car:", route.carModel);
                console.log("TripType:", route.tripType);
                console.log("Actual Distance:", route.actualDistance);
                console.log("Per Km Charges:", route.per_km_charges);
                console.log("Surge %:", surgePercent);
                console.log("Base Fare (Before):", baseFare);
                console.log("Base Fare (After):", surgedBaseFare);
                console.log("Extra Fare:", extraFare);
                console.log("Toll Tax:", tollTax);
                console.log("Airport Parking:", airportParking);
                console.log("Night Charges:", nightCharges);
                console.log("State Tax:", stateTax);
                console.log("Driver Charges:", driverCharges);
                console.log("Convenience Fee:", convenienceFee);
                console.log("GST Rate (%):", gstRate);
                console.log("GST Amount:", gstAmount);
                console.log("Total (Before):", route.total_price);
                console.log("Total (After Surge):", surgedTotal);
                console.log("-------------------------------");

                return {
                  ...route,
                  surged: true,
                  surgePercent,
                  total_price: surgedTotal,
                  fare_breakdown: {
                    ...route.fare_breakdown,
                    baseFare: surgedBaseFare,
                    gst: Math.round((surgedTotal * gstRate) / 100),
                  },
                };
              }
            }

            // 🟦 No surge matched
            return { ...route, surged: false };
          });
        }

        // ✅ Save final processed list
        dispatch(setFilteredRoutes(processedRoutes));
      } catch (err) {
        console.error("❌ Error fetching surge/routes data:", err);
      }
    };






    fetchAndApplySurge();
  }, [dispatch]);


  // Debug logs
  console.log("tripDetails", tripDetails);
  console.log("filteredRoutes", filteredRoutes);



  return (
    <div className="max-w-7xl sm:w-full mx-auto flex flex-col md:flex-row gap-4 py-6">
      <Sidebar />

      {/* Main content */}
      <div className="md:w-4/5 mt-10 md:mt-1 p-2">
        <div className="mb-3 border border-gray-300 rounded-xl shadow-md px-2 py-3 bg-white">
          {/* Header Section */}
          <h2 className="text-md font-bold mb-2 text-blue-900">
            {(() => {
              // Define which trip types should use 'name' (for flexibility)
              const useNameFor = ["AirportTransfer", "hourlyRental", "oneway", "roundtrip"];

              // Dynamically decide which field to use
              const useNameField = useNameFor.includes(tripDetails.tripType);

              const pickup = useNameField
                ? tripDetails.pickupLocation?.name || "Pickup"
                : tripDetails.pickupLocation?.city || "Pickup";

              const drop = useNameField
                ? tripDetails.dropLocation?.name || "Drop"
                : tripDetails.dropLocation?.city || "Drop";

              return `${pickup.slice(0, 19)}  To  ${drop.slice(0, 19)} - Available Cars`;
            })()}
          </h2>



          <p className="text-xs font-semibold sm:block text-blue-900">
            {capitalizeTripType(tripDetails.tripType)}{" "}
            {tripDetails.tripType === "hourlyRental" ? (
              <>
                || Rental Hours: {tripDetails.rentalHours || "2 hrs 20Km"}Hr.{" "}
                {tripDetails.rentalKm || "2 hrs 20Km"}km || Multiple stops within the city are included
              </>
            ) : (
              <>
                {" "}|| Estimated distance:{" "}
                <span className="font-bold">
                  {tripDetails.distance ? `${parseFloat(tripDetails.distance)} kms` : "0 kms"}
                </span>{" "}
                ||{" "}
                {tripDetails.tripType === "roundtrip"
                  ? "Multiple pickups, drops, unlimited halts & sightseeing included"
                  : "One pickup and one drop are included"}
              </>
            )}
          </p>
        </div>

        {/* ✅ Main Cab List Rendering */}
        {filteredRoutes && filteredRoutes.length > 0 ? (
          filteredRoutes.map((data, index) => {
            const carType = data.carType?.toLowerCase() || "sedan";
            const seater = data.seater ?? (carType === "suv" ? 6 : 4);
            const bags = data.bags ?? (carType === "suv" ? 6 : carType === "sedan" ? 4 : 2);

            // ✅ Handle Surge or Normal Pricing
            const finalPrice = Math.round(data.total_price || 0);
            const discount = data.discount || 10;
            const taxes = data.gst || 0;
            const surged = data.fare_breakdown?.surgePercent || 0; // If surge applied

            // ✅ Original base price (before surge or discount)
            const surgedPriceBeforeDiscount = finalPrice / (1 - discount / 100);
            const originalPrice = Math.round(surgedPriceBeforeDiscount);

            // ✅ Image logic
            let images = ["/images/Tour/cabImage.png"];
            const model = data.carModel?.toLowerCase() || "";

            if (carType === "sedan" || model.includes("dzire")) {
              images = [
                "/images/Tour/cabImage.png",
                "/images/Tour/sedan2.png",
                "/images/Tour/sedan3.png",
              ];
            } else if (carType === "suv" || model.includes("ertiga") || model.includes("xylo")) {
              images = [
                "/images/Tour/ErtigaNew.png",
                "/images/Tour/suv2.png",
                "/images/Tour/suv3.png",
              ];
            } else if (model.includes("cryst") || model.includes("innova")) {
              images = [
                "/images/Tour/InnovaCrysta.png",
                "/images/Tour/innova2.png",
                "/images/Tour/innova3.png",
              ];
            }

            // ✅ Build car object for <CabCard>
            const car = {
              images,
              image: images[0],
              tag: surged ? `Surge +${surged}%` : data.carType || "Standard",
              name: data.carModel || "Sedan",
              rating: data.rating || 4.5,
              type: data.carType || "Sedan",
              seater,
              bags,
              features: data.features || ["TISSUES", "SANITISER", "CAR FRESHNER"],
              originalPrice,
              price: finalPrice,
              taxes,
              discount,
              extraCharge: data.per_km_extra_charges || 0,
            };

            return (
              <React.Fragment key={data._id || index}>
                <CabCard car={car} tripDetails={tripDetails} />
                {(index + 1) % 2 === 0 && <PromotionBanner />}
              </React.Fragment>
            );
          })
        ) : (
          <p className="text-gray-500 text-sm mt-4">
            No cars available for the selected route.
          </p>
        )}
      </div>
    </div>

  );
}

export default FilterPage;
