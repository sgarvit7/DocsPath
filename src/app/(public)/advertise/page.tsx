"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import clsx from "clsx";
import { Inter, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

const features = [
  {
    title: "Reach Doctors, Promote Your Medical Products",
    desc: "Gain direct access to verified healthcare professionals and showcase your medicines, medical devices and innovative healthcare solution.",
    img: "/assets/prelogin-img/adv1.jpg",
  },
  {
    title: "Targeted Visibility",
    desc: "Get your products in front of healthcare professionals who are actively seeking relevant medical solutions.",
    img: "/assets/prelogin-img/adv2.jpg",
  },
  {
    title: "High Engagement",
    desc: "Maximize your exposure with ad placements that ensure doctors see your offerings and increase interaction.",
    img: "/assets/prelogin-img/adv3.jpg",
  },
  {
    title: "Quick & Simple Setup",
    desc: "Set up your advertisement campaign in no time with our user-friendly platform and reach the right audience.",
    img: "/assets/prelogin-img/adv4.jpg",
  },
];

const Bubble = ({
  size,
  top,
  left,
  right,
  bottom,
}: {
  size: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}) => (
  <div
    className="absolute bg-white dark:bg-teal-600 rounded-full "
    style={{
      width: `${size}px`,
      height: `${size}px`,
      top,
      left,
      right,
      bottom,
      boxShadow: "0 4px 20px rgba(9, 118, 109, 0.9)",
    }}
  />
);

const AdvertisePage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={clsx(darkMode && "dark", roboto.className)}>
      <div className="pt-1 dark:bg-gray-900 relative overflow-hidden">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 flex bg-[#08686117] p-2 rounded-full items-center space-x-3 z-10">
          <Bell className="w-6 h-6" />
          <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Dark mode
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={clsx(
              "relative w-10 h-5 rounded-full cursor-pointer border border-black transition-colors duration-200",
              darkMode ? "bg-teal-600" : "bg-white"
            )}
          >
            <div
              className={clsx(
                "absolute -top-0.5 -left-2 w-6 h-6 bg-[#4AB0A8] border border-black rounded-full transition-transform duration-200",
                darkMode ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Heading */}
        <div className="text-center mb-12 mt-12">
          <h1 className={clsx("text-4xl font-bold text-shadow-lg text-teal-800 dark:text-teal-300", inter.className)}>
            Advertise with Us
          </h1>
        </div>

        {/* Cards Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-4 sm:px-6">
          {/* Card 1 */}
          <div className="md:col-span-12">
            <div
              className="bg-white border-teal-800 dark:bg-gray-800 p-6 rounded-[30px] shadow-lg flex flex-col md:flex-row items-center gap-6 border dark:border-gray-700"
              style={{
                boxShadow: "0 4px 20px rgba(9, 118, 109, 0.7)",
              }}
            >
              <div className="md:w-1/2">
                <h2 className="text-2xl pl-2 font-bold text-[#005A51] dark:text-teal-300">
                  {features[0].title}
                </h2>
                <p className="text-lg pl-2 text-[#7B809A] leading-relaxed mt-2 dark:text-[white]">
                  {features[0].desc}
                </p>
              </div>
              <div className="w-full md:w-1/2 h-60 relative overflow-hidden border-teal-900 border-2 rounded-[30px]">
                <Image
                  src={features[0].img}
                  alt={features[0].title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="md:col-span-6">
            <div
              className="bg-white border-1 border-gray-500 dark:bg-gray-800 p-6 rounded-[50px] shadow-xl flex flex-col sm:flex-row items-center gap-4 border dark:border-gray-700"
              style={{
                boxShadow: "0 4px 20px rgba(9, 118, 109, 0.7)",
              }}
            >
              <div>
                <h2 className="text-xl font-bold text-[#005A51] dark:text-teal-300">
                  {features[1].title}
                </h2>
                <p className="text-md text-[#7B809A] leading-relaxed mt-1 dark:text-[white]">
                  {features[1].desc}
                </p>
              </div>
              <Image
                src={features[1].img}
                alt={features[1].title}
                width={140}
                height={120}
                className="rounded-[28px]"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="md:col-span-6">
            <div
              className="bg-white border-1 border-gray-500 dark:bg-gray-800 p-6 rounded-[50px] lg:mt-25 shadow-md flex flex-col sm:flex-row items-center gap-4 border dark:border-gray-700"
              style={{
                boxShadow: "0 4px 20px rgba(9, 118, 109, 0.7)",
              }}
            >
              <div>
                <h2 className="text-xl font-bold text-[#344767] dark:text-teal-300">
                  {features[2].title}
                </h2>
                <p className="text-md text-[#7B809A] leading-relaxed mt-1 dark:text-[white]">
                  {features[2].desc}
                </p>
              </div>
              <Image
                src={features[2].img}
                alt={features[2].title}
                width={220}
                height={180}
                className="rounded-[30px] mr-1"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-9 ml-4 sm:ml-8 lg:ml-[200px] mt-3">
            <div
              className="bg-white dark:bg-gray-800 p-6 border-1 border-gray-500 shadow-2xl flex flex-col sm:flex-row items-center gap-6 border dark:border-gray-700"
              style={{
                boxShadow: "0 4px 20px rgba(9, 118, 109, 0.8)",
                borderRadius: "50px",
                marginTop: "-6px",
              }}
            >
              <Image
                src={features[3].img}
                alt={features[3].title}
                width={200}
                height={180}
                className="rounded-[41px]"
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#005A51] dark:text-teal-300">
                  {features[3].title}
                </h2>
                <p className="text-md text-[#7B809A] leading-relaxed mt-1 dark:text-[white]">
                  {features[3].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bubbles */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {/* left bubles */}
          <Bubble size={85} top="690px" left="150px" />
          <Bubble size={58} top="830px" left="140px" />
          <Bubble size={35} bottom="280px" left="90px" />
          {/* bottom  */}
          <Bubble size={35} bottom="170px" right="600px" />
          <Bubble size={22} bottom="135px" right="550px" />
          <Bubble size={18} bottom="95px" right="570px" />
          {/* right */}
          <Bubble size={85} bottom="380px" right="124px" />
          <Bubble size={55} bottom="300px" right="106px" />
          <Bubble size={35} bottom="255px" right="46px" />
        </div>

        {/* CTA Button */}
        <div className="mt-23 mb-10  text-end pr-4 sm:pr-10 lg:pr-[320px] pb-4">
          <button className="px-6 py-3 bg-[#086861] hover:bg-teal-600 text-white rounded-full font-semibold transition">
            <a href="/sales-card">
            Get started Now
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvertisePage;
