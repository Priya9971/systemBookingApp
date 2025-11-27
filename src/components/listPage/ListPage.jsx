"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { setRentalHours } from "@/redux/features/locationSlice";


const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const libraries = ["places"];

function ListPage() {
  const router = useRouter();
  const rentalHours = useSelector((state) => state.location?.rentalHours) || { hours: "4", km: "40" };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      pickupDate: "",
      pickupTime: "",
      tripType: "oneway",
    },
  });

  const tripType = watch("tripType");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const pickupRef = useRef(null);
  const dropRef = useRef(null);



  useEffect(() => {
    // ✅ Only run in the browser
    if (typeof window === "undefined") return;

    const storedDataRaw = window.localStorage.getItem("tripDetails");
    if (!storedDataRaw) return;

    const storedData = JSON.parse(storedDataRaw);
    const updatedValues = { ...storedData };

    // Normalize pickup time (24-hour format)
    if (storedData.pickupDate?.date) {
      updatedValues.pickupDate = storedData.pickupDate.date;
      updatedValues.pickupTime = convertTo24HourFormat(storedData.pickupDate.time || "");
    } else if (storedData.pickupTime) {
      updatedValues.pickupTime = convertTo24HourFormat(storedData.pickupTime);
    }

    // Normalize return time
    if (storedData.returnDate?.date) {
      updatedValues.returnDate = storedData.returnDate.date;
      updatedValues.returnTime = convertTo24HourFormat(storedData.returnDate.time || "");
    } else if (storedData.returnTime) {
      updatedValues.returnTime = convertTo24HourFormat(storedData.returnTime);
    }

    // Set all form values
    Object.keys(updatedValues).forEach((key) => {
      setValue(key, updatedValues[key]);
    });

    // Create query params
    const pickupCity = storedData.pickupLocation?.city || "UnknownPickup";
    const dropCity = storedData.dropLocation?.city || "UnknownDrop";

    const queryParams = new URLSearchParams({
      pc: pickupCity.slice(0, 3).toUpperCase(),
      dc: dropCity.slice(0, 3).toUpperCase(),
      dt: updatedValues.pickupDate || "",
      tm: updatedValues.pickupTime || "",
      tt: storedData.tripType || "",
      dist: String(storedData.distance || 0),
      dur: storedData.duration || "",
    });

    router.push(`/cabs?${queryParams.toString()}`);
  }, [setValue, router]);



  const convertTo24HourFormat = (timeStr) => {
    if (!timeStr) return "";

    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = String(parseInt(hours, 10) + 12);
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours.padStart(2, "0")}:${minutes}`; // Ensure "HH:mm" format
  };

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    localStorage.setItem("tripDetails", JSON.stringify(data));
  };


  return (
    <div className="listpage bg-gradient-to-br from-blue-700 to-purple-500 flex items-center justify-center p-2 sm:p-6 md:p-2">
      <div className="container mx-auto max-w-screen-2xl"> {/* Increased max-width for more horizontal space */}
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl px-20 py-2 border border-white border-opacity-20">

          {tripType === "oneway" && (
            <form onSubmit={handleSubmit(onSubmit)} className="grid text-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-3 items-end"> {/* Force 6 columns on 2xl screens */}

              {/* Trip Type Selection */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1"> {/* Each element takes 1 column on 2xl */}
                <label htmlFor="tripType" className="text-sm  font-semibold text-gray-200 mb-1">Trip Type</label>
                <div className="relative">
                  <select
                    id="tripType"
                    {...register("tripType")}
                    value={tripType}
                    onChange={(e) => setValue("tripType", e.target.value)}
                    className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none pr-8"
                  >
                    <option value="oneway">Outstation One-way</option>
                    <option value="roundtrip">Outstation Round-trip</option>
                    <option value="AirportTransfer">Airport Transfer</option>
                    <option value="hourlyRental">Rentals</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              {/* Pickup Location (Google Autocomplete) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="onewayPickup" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Location</label>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => (pickupRef.current = autocomplete)}
                    onPlaceChanged={() => {
                      if (pickupRef.current) {
                        const place = pickupRef.current.getPlace();
                        setValue("pickupLocation.name", place.formatted_address || place.name);
                      }
                    }}
                    options={{ componentRestrictions: { country: "IN" } }}
                  >
                    <input
                      id="onewayPickup"
                      {...register("pickupLocation.name")}
                      className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter Pickup Location"
                    />
                  </Autocomplete>
                )}
              </div>

              {/* Drop Location (Google Autocomplete) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="onewayDrop" className="text-sm font-semibold text-gray-200 mb-1">Drop Location</label>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => (dropRef.current = autocomplete)}
                    onPlaceChanged={() => {
                      if (dropRef.current) {
                        const place = dropRef.current.getPlace();
                        setValue("dropLocation.name", place.formatted_address || place.name);
                      }
                    }}
                    options={{ types: ["geocode"], componentRestrictions: { country: "IN" } }}
                  >
                    <input
                      id="onewayDrop"
                      {...register("dropLocation.name")}
                      className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter Drop Location"
                    />
                  </Autocomplete>
                )}
              </div>

              {/* Pickup Date */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="onewayPickupDate" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Date</label>
                <input
                  id="onewayPickupDate"
                  {...register("pickupDate")}
                  type="date"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Pickup Time */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="onewayPickupTime" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Time</label>
                <input
                  id="onewayPickupTime"
                  {...register("pickupTime")}
                  type="time"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Search Button for Oneway */}
              <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1 2xl:col-span-1 justify-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-pink-700 hover:to-red-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Find Cabs
                </button>
              </div>

            </form>
          )}

          {tripType === "roundtrip" && (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-8 gap-3 items-end">

              {/* Trip Type Selection (Integrated into the form) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="tripType" className="text-sm font-semibold text-gray-200 mb-1">Trip Type</label>
                <div className="relative">
                  <select
                    id="tripType"
                    {...register("tripType")}
                    value={tripType}
                    onChange={(e) => setValue("tripType", e.target.value)}
                    className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none pr-8"
                  >
                    <option value="oneway">Outstation One-way</option>
                    <option value="roundtrip">Outstation Round-trip</option>
                    <option value="AirportTransfer">Airport Transfer</option>
                    <option value="hourlyRental">Rentals</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              {/* Pickup Location */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="roundtripPickup" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Location</label>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => (pickupRef.current = autocomplete)}
                    onPlaceChanged={() => {
                      if (pickupRef.current) {
                        const place = pickupRef.current.getPlace();
                        setValue("pickupLocation.name", place.formatted_address || place.name);
                      }
                    }}
                    options={{ componentRestrictions: { country: "IN" } }}
                  >
                    <input
                      id="roundtripPickup"
                      {...register("pickupLocation.name")}
                      className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter Pickup Location"
                    />
                  </Autocomplete>
                )}
              </div>

              {/* Drop Location */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="roundtripDrop" className="text-sm font-semibold text-gray-200 mb-1">Drop Location</label>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => (dropRef.current = autocomplete)}
                    onPlaceChanged={() => {
                      if (dropRef.current) {
                        const place = dropRef.current.getPlace();
                        setValue("dropLocation.name", place.formatted_address || place.name);
                      }
                    }}
                    options={{ types: ["geocode"], componentRestrictions: { country: "IN" } }}
                  >
                    <input
                      id="roundtripDrop"
                      {...register("dropLocation.name")}
                      className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter Drop Location"
                    />
                  </Autocomplete>
                )}
              </div>

              {/* Pickup Date */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="roundtripPickupDate" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Date</label>
                <input
                  id="roundtripPickupDate"
                  {...register("pickupDate")}
                  type="date"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Pickup Time */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="roundtripPickupTime" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Time</label>
                <input
                  id="roundtripPickupTime"
                  {...register("pickupTime")}
                  type="time"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Return Date */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="returnDate" className="text-sm font-semibold text-gray-200 mb-1">Return Date</label>
                <input
                  id="returnDate"
                  {...register("returnDate")}
                  type="date"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Return Time */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="returnTime" className="text-sm font-medium text-slate-100">Return Time</label>
                <input
                  id="returnTime"
                  {...register("returnTime")}
                  type="time"
                  className="p-3 w-full border rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Search Button for Roundtrip */}
              <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1 2xl:col-span-1 justify-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-pink-700 hover:to-red-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Find Cabs
                </button>
              </div>
            </form>
          )}

          {tripType === "AirportTransfer" && (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 items-end">

              {/* Trip Type Selection (Integrated into the form for single-line display) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="tripType" className="text-sm font-semibold text-gray-200 mb-1">Trip Type</label>
                <div className="relative">
                  <select
                    id="tripType"
                    {...register("tripType")}
                    value={tripType}
                    onChange={(e) => setValue("tripType", e.target.value)}
                    className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none pr-8"
                  >
                    <option value="oneway">Outstation One-way</option>
                    <option value="roundtrip">Outstation Round-trip</option>
                    <option value="AirportTransfer">Airport Transfer</option>
                    <option value="hourlyRental">Rentals</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              {/* Pickup Location (Google Autocomplete) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="airportPickupLocation" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Location</label>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => (pickupRef.current = autocomplete)}
                    onPlaceChanged={() => {
                      if (pickupRef.current) {
                        const place = pickupRef.current.getPlace();
                        setValue("pickupLocation.name", place.formatted_address || place.name);
                      }
                    }}
                    options={{ componentRestrictions: { country: "IN" } }}
                  >
                    <input
                      id="airportPickupLocation"
                      {...register("pickupLocation.name")}
                      className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter Pickup Location"
                    />
                  </Autocomplete>
                )}
              </div>

              {/* Drop Location (Google Autocomplete) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="airportDropLocation" className="text-sm font-semibold text-gray-200 mb-1">Drop Location</label>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => (dropRef.current = autocomplete)}
                    onPlaceChanged={() => {
                      if (dropRef.current) {
                        const place = dropRef.current.getPlace();
                        setValue("dropLocation.name", place.formatted_address || place.name);
                      }
                    }}
                    options={{ types: ["geocode"], componentRestrictions: { country: "IN" } }}
                  >
                    <input
                      id="airportDropLocation"
                      {...register("dropLocation.name")}
                      className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter Drop Location"
                    />
                  </Autocomplete>
                )}
              </div>

              {/* Pickup Date */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="airportPickupDate" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Date</label>
                <input
                  id="airportPickupDate"
                  {...register("pickupDate")}
                  type="date"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Pickup Time */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="airportPickupTime" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Time</label>
                <input
                  id="airportPickupTime"
                  {...register("pickupTime")}
                  type="time"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Search Button */}
              <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1 2xl:col-span-1 justify-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-pink-700 hover:to-red-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Find Cabs
                </button>
              </div>
            </form>
          )}

          {tripType === "hourlyRental" && (
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 text-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 items-end">

              {/* Trip Type Selection (Integrated into the form for single-line display) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="tripType" className="text-sm font-semibold text-gray-200 mb-1">Trip Type</label>
                <div className="relative">
                  <select
                    id="tripType"
                    {...register("tripType")}
                    value={tripType}
                    onChange={(e) => setValue("tripType", e.target.value)}
                    className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none pr-8"
                  >
                    <option value="oneway">Outstation One-way</option>
                    <option value="roundtrip">Outstation Round-trip</option>
                    <option value="AirportTransfer">Airport Transfer</option>
                    <option value="hourlyRental">Hourly Rentals</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
                </div>
              </div>

              {/* Pickup Location (Google Autocomplete) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="hourlyRentalPickupLocation" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Location</label>
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) => (pickupRef.current = autocomplete)}
                    onPlaceChanged={() => {
                      if (pickupRef.current) {
                        const place = pickupRef.current.getPlace();
                        setValue("pickupLocation.name", place.formatted_address || place.name);
                      }
                    }}
                    options={{ componentRestrictions: { country: "IN" } }}
                  >
                    <input
                      id="hourlyRentalPickupLocation"
                      {...register("pickupLocation.name")}
                      className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="Enter Pickup Location"
                    />
                  </Autocomplete>
                )}
              </div>

              {/* Rental Duration (Hours) */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label className="text-sm font-semibold text-gray-200 mb-1">Rental Duration (Hours)</label>
                <input
                  id="rentalHours"
                  type="text"
                  value={
                    rentalHours?.hours
                      ? `${rentalHours.hours} Hr / ${rentalHours.km} km`
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // only numbers
                    const hours = Number(value);
                    const km = hours ? hours * 10 : 0;
                    dispatch(setRentalHours({ hours, km }));
                    setValue("rentalHours", { hours, km });
                  }}
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="e.g., 4 Hr / 40 km"
                />

              </div>


              {/* Pickup Date */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="hourlyRentalPickupDate" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Date</label>
                <input
                  id="hourlyRentalPickupDate"
                  {...register("pickupDate")}
                  type="date"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Pickup Time */}
              <div className="flex flex-col col-span-full sm:col-span-1 2xl:col-span-1">
                <label htmlFor="hourlyRentalPickupTime" className="text-sm font-semibold text-gray-200 mb-1">Pick-up Time</label>
                <input
                  id="hourlyRentalPickupTime"
                  {...register("pickupTime")}
                  type="time"
                  className="p-3 w-full border border-gray-300 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>

              {/* Search Button */}
              <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1 2xl:col-span-1 justify-end">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 to-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:from-pink-700 hover:to-red-700 transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Find Cabs
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

export default ListPage;
