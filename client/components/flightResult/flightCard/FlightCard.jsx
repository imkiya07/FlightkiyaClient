// components/FlightCard.js

"use client";
import biman from "@/public/images/biman-bd.png";
import arrowRight from "@/public/icons/arrow-right.svg";
import right from "@/public/icons/right-arrow1.svg";
import arrowDown from "@/public/icons/down-arrow.svg";

import credit from "@/public/icons/credit.svg";
import Image from "next/image";
import { useState } from "react";
export default function FlightCard() {
  const [cards, setCards] = useState([
    {
      id: 1,
      airline: "Biman Airways",
      departure: "DAC",
      arrival: "CXB",
      duration: "2h 15m",
      stops: 0,
      price: 1000,
      currency: "BDT",
      image: biman,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel mauris vel felis faucibus scelerisque. Sed consectetur ipsum ac purus convallis, ac tempor lectus faucibus.",
    },
    {
      id: 2,
      airline: "Biman Airways",
      departure: "DAC",
      arrival: "CXB",
      duration: "2h 15m",
      stops: 0,
      price: 1000,
      currency: "BDT",
      image: biman,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      airline: "Biman Airways",
      departure: "DAC",
      arrival: "CXB",
      duration: "2h 15m",
      stops: 0,
      price: 1000,
      currency: "BDT",
      image: biman,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 4,
      airline: "Biman Airways",
      departure: "DAC",
      arrival: "CXB",
      duration: "2h 15m",
      stops: 0,
      price: 1000,
      currency: "BDT",
      image: biman,
      description: "Lorem ipsum dolor sit amet",
    },
    {
      id: 5,
      airline: "Biman Airways",
      departure: "DAC",
      arrival: "CXB",
      duration: "2h 15m",
      stops: 0,
      price: 1000,
      currency: "BDT",
      image: biman,
      description: "Lorem ipsum dolor sit amet",
    },
  ]);
  return (
    <>
      <div className="space-y-5 pb-10">
        {cards?.map((card) => (
          <div className="max-w-[909px]  bg-white relative  rounded-2xl   " key={card.id}>
            {/* Left section with airline info */}
            <div className="absolute left-[-15px] top-2 bg-[url('/images/badge.png')] bg-no-repeat bg-contain w-28 h-10">
              <span className="text-white text-[13px] p-5">Best Deal</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 h-full md:h-[145px]    w-full">
              <div className="py-5 px-1 ">
                <div className="mt-5">
                  <Image src={biman}></Image>
                </div>
              </div>
              <div className="flex items-start gap-2 py-5 px-1">
                <div>
                  <h2 className="text-[20px] font-semibold">15:30</h2>
                  <span className="text-[20px] ">DAC</span>
                </div>
                <div>
                  <span className="text-[14px] flex justify-center">
                    Non-stop
                  </span>
                  <Image src={arrowRight}></Image>
                </div>
                <div>
                  <h2 className="text-[20px] font-semibold">16:45</h2>
                  <span className="text-[20px] ">CXB</span>
                </div>
              </div>

              <div className="flex w-full gap-2">
                <p className="text-[14px] font-semibold w-full py-5 ">1h 15m</p>

                <div className="flex flex-col justify-between p-4 w-[600px] bg-green-100  ">
                  <div className="flex gap-2 items-center justify-end">
                    <Image src={credit}></Image>
                    <span className="text-[13px]">DOMB0724</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-black">৳ 5049/-</p>
                    <p className="text-sm line-through text-gray-400">
                      ৳ 6059/-
                    </p>
                  </div>

                  <button className="bg-purple-600 text-white py-2 px-4 rounded-lg flex justify-between items-center">
                    Select
                    <span>
                      <Image src={right}></Image>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t w-full  py-3 px-6 flex justify-between ">
              <div className="flex items-center gap-2">
                <span className="text-[10px] md:text-[13px]">
                  Partially Refundable
                </span>
                <Image src={arrowDown}></Image>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] md:text-[13px]">
                  Flight Details
                </span>
                <Image src={arrowDown}></Image>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
