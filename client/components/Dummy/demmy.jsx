"use client";
import React, { useState } from "react";
import flight from "@/public/icons/flight.png";
import hotel from "@/public/icons/hotel.png";
import tour from "@/public/icons/tour.png";
import visa from "@/public/icons/visa.png";
import Image from "next/image";
import Navbar from "../common/navbar/Navbar";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import DatePicker from "react-datepicker";
import search from "@/public/icons/search.svg";
import "react-datepicker/dist/react-datepicker.css";
import RequestNow from "../home/requestNow/RequestNow";
import Link from "next/link";

const options = require("../../airports.json");
const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: 0, // Remove padding from the control
    border: "none", // Remove all borders from the control
    boxShadow: "none", // Remove any box shadow
    fontSize: "13px",
    minHeight: "10px",
    width: "90%",
    "&:hover": {
      border: "none", // Remove border on hover
    },
  }),
  valueContainer: (provided) => ({
    ...provided,

    padding: 0,
    // Remove padding around the selected value
  }),
  menu: (provided) => ({
    ...provided,
    border: "none", // Remove all borders from the menu
    boxShadow: "none",
    // Remove any box shadow from the menu
  }),
  menuList: (provided) => ({
    ...provided,
    padding: 0, // Remove padding from menu list
    border: "none", // Remove all borders from the menu list
    fontSize: "12px",
  }),
  placeholder: (provided) => ({
    ...provided,
    marginLeft: 0, // Remove left margin from the placeholder
    paddingLeft: 0, // Remove left padding from the placeholder
  }),
  dropdownIndicator: () => ({
    display: "none", // Completely hide the dropdown indicator
  }),
  indicatorSeparator: () => ({
    display: "none", // Remove the vertical separator line
  }),
};

const animatedComponents = makeAnimated();
const FlightSearch = () => {
  const [categoryTab, setCategoryTab] = useState("flight");
  const [flyFrom, setFlyFrom] = useState("");
  const [flyFromPlaceholder, setFlyFromPlaceholder] = useState({
    label: "Dhaka, Bangladesh (DAC)",
    value: "DAC",
  });
  const [flyTo, setFlyTo] = useState("");
  const [flyToPlaceholder, setFlyToPlaceholder] = useState({
    label: "New York, USA (JFK)",
    value: "JFK",
  });

  const [wayTabs, setWayTabs] = useState("oneway");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date() + 1);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [childAges, setChildAges] = useState([]); // Default ages for children
  const [flightClass, setFlightClass] = useState("Economy");

  const handleIncrement = (setter, value) => setter(value + 1);
  const handleDecrement = (setter, value) => value > 0 && setter(value - 1);

  const handleChildrenIncrement = () => {
    setChildren(children + 1);
    setChildAges([...childAges, 2]); // Add a default age (e.g., 2 years) for the new child
  };

  const handleChildrenDecrement = () => {
    if (children > 0) {
      setChildren(children - 1);
      setChildAges(childAges.slice(0, -1)); // Remove the last child age
    }
  };
  const [travelerInputShow, setTravelerInputShow] = useState(false);

  const [cities, setCities] = useState([{ id: 1 }]); // Initial state with one city row

  // Function to handle adding a new city row
  const handleAddCity = () => {
    setCities([...cities, { id: cities.length + 1 }]); // Add a new city with a unique id
  };

  const handleDeleteCity = () => {
    if (cities.length > 1) {
      setCities(cities.slice(0, -1)); // Remove the last city row
    }
  };
  return (
    <section className="bg-[url('/images/banner-temp.jpg')] bg-cover bg-center bg-fixed  w-full h-fit md:max-h-screen ">
      <div className=" w-full container mx-auto ">
        <div className="">
          <Navbar />
        </div>
        <div className="   rounded-[22px] pb-20 my-20">
          <div className="px-5 md:px-20">
            <div className="relative bg-white p-6 container shadow-lg h-fit md:h-[84px] rounded-[22px] w-full md:w-[551px] mx-auto bottom-[-25px]">
              <div className="flex items-center justify-between px-2 md:px-14 flex-wrap">
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    categoryTab == "flight"
                      ? "border-b-4 border-[var(--tertiary)] py-2 "
                      : ""
                  }`}
                  onClick={() => setCategoryTab("flight")}
                >
                  <Image src={flight} alt="" className="w-[22px] h-[22px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Flight
                  </span>
                </div>
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    categoryTab == "hotel"
                      ? "border-b-4 border-[var(--tertiary)] py-2 "
                      : ""
                  }`}
                  onClick={() => setCategoryTab("hotel")}
                >
                  <Image src={hotel} alt="" className="w-[22px] h-[22px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Hotel
                  </span>
                </div>{" "}
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    categoryTab == "tour"
                      ? "border-b-4 border-[var(--tertiary)] py-2 "
                      : ""
                  }`}
                  onClick={() => setCategoryTab("tour")}
                >
                  <Image src={tour} alt="" className="w-[22px] h-[22px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Tour
                  </span>
                </div>{" "}
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    categoryTab == "visa"
                      ? "border-b-4 border-[var(--tertiary)] py-2"
                      : ""
                  }`}
                  onClick={() => setCategoryTab("visa")}
                >
                  <Image src={visa} alt="" className="w-[22px] h-[22px]" />
                  <span className="text-[var(--secondary)] text-[16px] font-semibold">
                    Visa
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white  h-fit rounded-[22px] pt-16 px-14 pb-10">
              {/* Way tabs */}
              <div className="   flex items-start  gap-5 ">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onChange={() => setWayTabs("oneway")}
                >
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      defaultChecked
                      type="radio"
                      className="h-5 w-5 cursor-pointer"
                      name="route"
                    />
                    <span className="text-[var(--secondary)] text-[12px] font-bold">
                      One way
                    </span>
                  </label>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onChange={() => setWayTabs("roundway")}
                >
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      checked={wayTabs == "roundway"}
                      type="radio"
                      className="h-5  w-5 cursor-pointer"
                      name="route"
                    />
                    <span className="text-[var(--secondary)] text-[12px] font-bold">
                      Round way
                    </span>
                  </label>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onChange={() => setWayTabs("multicity")}
                >
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      checked={wayTabs == "multicity"}
                      type="radio"
                      className="h-5  w-5 cursor-pointer"
                      name="route"
                    />
                    <span className="text-[var(--secondary)] text-[12px] font-bold">
                      Multi city
                    </span>
                  </label>
                </div>
              </div>
              {/* inputs section */}
              <div>
                <div className="mt-5 flex items-center justify-evenly gap-5 flex-wrap">
                  <div className="border-2 border-[#BEA8A8] pt-2 ps-5 rounded-[13px] w-[234px] h-[79px]">
                    <label className="w-full cursor-pointer">
                      <div className="block">
                        <span className="text-[var(--gray)] text-[10px] font-semibold block ">
                          FROM
                        </span>
                        <span className="text-[12px] font-semibold">
                          {flyFromPlaceholder.value}
                        </span>
                      </div>
                      <Select
                        className="cursor-pointer"
                        closeMenuOnSelect={true}
                        components={{
                          ...animatedComponents,
                        }}
                        value={flyFromPlaceholder}
                        onChange={(e) => {
                          setFlyFrom(e.value);
                          setFlyFromPlaceholder({
                            label: e.label,
                            value: e.value,
                          });
                        }}
                        options={options}
                        styles={customStyles}
                      />
                    </label>
                  </div>
                  <div className="border-2 border-[#BEA8A8] pt-2 ps-5 rounded-[13px] w-[234px] h-[79px]">
                    <label className="w-full cursor-pointer">
                      <div className="block">
                        <span className="text-[var(--gray)] text-[10px] font-semibold block ">
                          To
                        </span>
                        <span className="text-[12px] font-semibold">
                          {flyToPlaceholder.value}
                        </span>
                      </div>
                      <Select
                        className="cursor-pointer"
                        closeMenuOnSelect={true}
                        components={{
                          ...animatedComponents,
                        }}
                        value={flyToPlaceholder}
                        onChange={(e) => {
                          setFlyTo(e.value);
                          setFlyToPlaceholder({
                            label: e.label,
                            value: e.value,
                          });
                        }}
                        options={options}
                        styles={customStyles}
                      />
                    </label>
                  </div>
                  <div
                    className={`border-2 border-[#BEA8A8] pt-2 ps-5 rounded-[13px]  ${
                      wayTabs == "roundway" ? "  w-[270px]" : " w-[234px]"
                    }  h-[79px] flex `}
                  >
                    <label className="w-full cursor-pointer ">
                      <div className="block">
                        <span className="text-[var(--gray)] text-[9px] font-semibold block ">
                          Journey Date
                        </span>
                        <span className="text-[12px]">
                          {/* {flyFromPlaceholder.value} */}
                          Saturday
                        </span>
                      </div>

                      {/* Conditionally render the DayPicker */}
                      <DatePicker
                        minDate={new Date()}
                        selected={departureDate}
                        className="custom-datepicker-input"
                        calendarClassName="custom-datepicker-calendar"
                        onChange={(date) => setDepartureDate(date)}
                      />
                    </label>
                    {wayTabs == "roundway" && (
                      <div className="border-s-2 ps-7 ">
                        <label className="w-full cursor-pointer">
                          <div className="block">
                            <span className="text-[var(--gray)] text-[9px] font-semibold block ">
                              Return Date
                            </span>
                            <span className="text-[12px]">
                              {/* {flyFromPlaceholder.value} */}
                              Saturday
                            </span>
                          </div>

                          {/* Conditionally render the DayPicker */}
                          <DatePicker
                            minDate={departureDate}
                            selected={arrivalDate}
                            className="custom-datepicker-input"
                            calendarClassName="custom-datepicker-calendar"
                            onChange={(date) => setArrivalDate(date)}
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <div
                      className="border-2 border-[#BEA8A8] pt-2 ps-5 rounded-[13px] w-[234px] h-[79px]"
                      onClick={() => setTravelerInputShow(!travelerInputShow)}
                    >
                      <label className="w-full cursor-pointer">
                        <div className="block">
                          <span className="text-[var(--gray)] text-[10px] font-semibold block ">
                            Traveler, class
                          </span>
                          <span className="text-[12px] font-semibold block">
                            {adults + children + infants > 1 ? (
                              <>
                                {adults +
                                  children +
                                  infants +
                                  " " +
                                  "Travelers"}
                              </>
                            ) : (
                              <>
                                {adults + children + infants + " " + "Traveler"}
                              </>
                            )}
                          </span>
                          <span className="text-[12px]">{flightClass}</span>
                        </div>
                      </label>
                    </div>
                    <div>
                      {travelerInputShow && (
                        <div
                          className="absolute end-0 z-10 mt-2  rounded-md border border-gray-100 bg-white shadow-lg"
                          role="menu"
                        >
                          <div className="w-full p-4 bg-white rounded-lg shadow-md">
                            {/* Adults */}
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold">Adults</h3>
                                <p className="text-sm text-gray-500">
                                  12 years and above
                                </p>
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    handleDecrement(setAdults, adults)
                                  }
                                  className="text-lg font-semibold px-2"
                                >
                                  −
                                </button>
                                <span className="mx-2">{adults}</span>
                                <button
                                  onClick={() =>
                                    handleIncrement(setAdults, adults)
                                  }
                                  className="text-lg font-semibold px-2"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Children */}
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold">Children</h3>
                                <p className="text-sm text-gray-500">
                                  2–11 years
                                </p>
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={handleChildrenDecrement}
                                  className="text-lg font-semibold px-2"
                                >
                                  −
                                </button>
                                <span className="mx-2">{children}</span>
                                <button
                                  onClick={handleChildrenIncrement}
                                  className="text-lg font-semibold px-2"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Children Ages */}
                            {children > 0 && (
                              <div className="mb-4">
                                <h4 className="font-semibold">Child Ages</h4>
                                <div className="flex space-x-2 mt-2">
                                  {childAges.map((age, index) => (
                                    <select
                                      key={index}
                                      value={age}
                                      onChange={(e) => {
                                        const newAges = [...childAges];
                                        newAges[index] = Number(e.target.value);
                                        setChildAges(newAges);
                                      }}
                                      className="border rounded px-2 py-1"
                                    >
                                      {[...Array(12).keys()].map((i) => (
                                        <option key={i} value={i + 1}>
                                          {i + 1}
                                        </option>
                                      ))}
                                    </select>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Infants */}
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold">Infant</h3>
                                <p className="text-sm text-gray-500">
                                  Below 2 years
                                </p>
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    handleDecrement(setInfants, infants)
                                  }
                                  className="text-lg font-semibold px-2"
                                >
                                  −
                                </button>
                                <span className="mx-2">{infants}</span>
                                <button
                                  onClick={() =>
                                    handleIncrement(setInfants, infants)
                                  }
                                  className="text-lg font-semibold px-2"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Class Selection */}
                            <div className="mb-4">
                              <h3 className="font-semibold mb-2">Class</h3>
                              <div className="flex items-center space-x-4">
                                <div>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name="flightClass"
                                      value="Economy"
                                      checked={flightClass === "Economy"}
                                      onChange={() => setFlightClass("Economy")}
                                      className="mr-2"
                                    />
                                    Economy
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name="flightClass"
                                      value="Business"
                                      checked={flightClass === "Business"}
                                      onChange={() =>
                                        setFlightClass("Business")
                                      }
                                      className="mr-2"
                                    />
                                    Business
                                  </label>
                                </div>
                                <div>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name="flightClass"
                                      value="First"
                                      checked={flightClass === "First"}
                                      onChange={() => setFlightClass("First")}
                                      className="mr-2"
                                    />
                                    First
                                  </label>
                                  <label className="flex items-center">
                                    <input
                                      type="radio"
                                      name="flightClass"
                                      value="Premium Economy"
                                      checked={
                                        flightClass === "Premium Economy"
                                      }
                                      onChange={() =>
                                        setFlightClass("Premium Economy")
                                      }
                                      className="mr-2"
                                    />
                                    Premium
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* Done Button */}
                            <button
                              className="w-full bg-[var(--primary-btn)] text-white font-semibold py-2 rounded"
                              onClick={() => setTravelerInputShow(false)}
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {wayTabs !== "multicity" ? (
                    <div>
                      <Link href="/flight-result">
                        <button className="bg-[var(--primary-btn)] h-[79px] w-[79px] rounded-xl">
                          <Image
                            src={search}
                            alt="Search"
                            className="mx-auto w-[50px] p-3"
                          />
                        </button>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {wayTabs == "multicity" && (
                  <div>
                    {cities?.map((city) => (
                      <div
                        className="mt-5 flex items-center justify-evenly gap-5 flex-wrap"
                        key={city.id}
                      >
                        <div className="border-2 border-[#BEA8A8] pt-2 ps-5 rounded-[13px] w-[234px] h-[79px]">
                          <label className="w-full cursor-pointer">
                            <div className="block">
                              <span className="text-[var(--gray)] text-[10px] font-semibold block ">
                                FROM
                              </span>
                              <span className="text-[12px] font-semibold">
                                Select a city
                              </span>
                            </div>
                            <Select
                              className="cursor-pointer"
                              closeMenuOnSelect={true}
                              components={{
                                ...animatedComponents,
                              }}
                              // value={flyFromPlaceholder}

                              placeholder={"Click to choose an airport"}
                              onChange={(e) => {
                                setFlyFrom(e.value);
                                setFlyFromPlaceholder({
                                  label: e.label,
                                  value: e.value,
                                });
                              }}
                              options={options}
                              styles={customStyles}
                            />
                          </label>
                        </div>
                        <div className="border-2 border-[#BEA8A8] pt-2 ps-5 rounded-[13px] w-[234px] h-[79px]">
                          <label className="w-full cursor-pointer">
                            <div className="block">
                              <span className="text-[var(--gray)] text-[10px] font-semibold block ">
                                To
                              </span>
                              <span className="text-[12px] font-semibold">
                                Select a city
                              </span>
                            </div>
                            <Select
                              className="cursor-pointer"
                              closeMenuOnSelect={true}
                              components={{
                                ...animatedComponents,
                              }}
                              placeholder={"Click to choose an airport"}
                              // value={flyToPlaceholder}
                              onChange={(e) => {
                                setFlyTo(e.value);
                                setFlyToPlaceholder({
                                  label: e.label,
                                  value: e.value,
                                });
                              }}
                              options={options}
                              styles={customStyles}
                            />
                          </label>
                        </div>
                        <div
                          className={`border-2 border-[#BEA8A8] pt-2 ps-5 rounded-[13px] w-[234px]  h-[79px] flex `}
                        >
                          <label className="w-full cursor-pointer ">
                            <div className="block">
                              <span className="text-[var(--gray)] text-[9px] font-semibold block ">
                                Journey Date
                              </span>
                              <span className="text-[12px]">
                                {/* {flyFromPlaceholder.value} */}
                                Saturday
                              </span>
                            </div>

                            {/* Conditionally render the DayPicker */}
                            <DatePicker
                              minDate={new Date()}
                              selected={departureDate}
                              className="custom-datepicker-input"
                              calendarClassName="custom-datepicker-calendar"
                              onChange={(date) => setDepartureDate(date)}
                            />
                          </label>
                        </div>
                        <div class="flex items-center border border-gray-300 rounded-[13px] w-[234px]  h-[79px] overflow-hidden ">
                          <button
                            class="px-4 py-2 text-gray-600 text-[12px] w-[70%]"
                            onClick={handleAddCity}
                            disabled={cities.length > 2}
                          >
                            Add Another City
                          </button>
                          <button
                            class="border-l border-gray-300 p-2 flex items-center justify-center text-gray-400 hover:text-gray-600  w-[25%]  h-full "
                            onClick={handleDeleteCity}
                          >
                            <span className="bg-gray-200 rounded-full w-8 h-8 flex justify-center items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-white font-bold"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end mt-5">
                      <Link href={"/flight-result"}>
                        <button
                          className="bg-[var(--primary-btn)] h-[54px] w-[173px] rounded-md flex items-center justify-center"
                          onClick={() => <Link href={"flight-result"}></Link>}
                        >
                          <Image
                            src={search}
                            alt=""
                            className=" w-[50px] p-3"
                          />
                          <span className="text-[20px] text-white underline font-bold py-1">
                            Search
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <RequestNow />
      </div>
    </section>
  );
};

export default FlightSearch;