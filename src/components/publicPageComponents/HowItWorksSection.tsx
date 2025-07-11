"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
type Props = {
  darkMode?: boolean;
};

const stepData = [
  {
    title: "Sign Up & Set Up",
    description: "Create your account and personalize your clinic’s dashboard.",
  },
  {
    title: "Sync Everything",
    description:
      "Integrate your calendar, patient records, and billing tools—effortlessly.",
  },
  {
    title: "Deliver Smarter Care",
    description:
      "Start offering high-quality, efficient care with digital support every step of the way.",
  },
];

const logos = [
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
  "/logo6.png",
  "/logo7.png",
  "/logo8.png",
];

const duplicatedLogos = [...logos, ...logos]; // for seamless looping

const HowItWorks: React.FC<Props> = ({ darkMode = false }) => {
  const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();
  return (
    <section
      className={clsx(
        "w-full",
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-[#E8F3F3] to-[#FFFFFF] text-gray-900"
      )}
    >
      {/* Heading */}
      <motion.h2
        className="text-5xl bg-[#086861] py-8 px-20 text-white font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        How It Works
      </motion.h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10 px-16 items-start">
        {/* Left: Steps */}
        <div className="flex flex-row lg:items-center items-center gap-6">
          {/* Step Buttons */}
          <div className="flex lg:flex-col flex-row gap-6 items-center">
            {stepData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={clsx(
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 transition",
                  i === activeStep
                    ? "bg-[#086861] text-white border-green-700"
                    : darkMode
                    ? "bg-gray-800 text-[#005C56] border-gray-600"
                    : "bg-white text-[#005C5645] border-gray-300 shadow"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <motion.h3
              className={clsx(
                "text-3xl font-extrabold mb-4 text-center",
                darkMode ? "text-green-600" : "text-[#005C56]"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Get Started in 3 Simple Steps
            </motion.h3>
            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "p-10 m-10 rounded-xl shadow-md w-full max-w-md",
                  darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                )}
              >
                <h3
                  className={clsx(
                    "text-2xl font-bold mb-2",
                    darkMode ? "text-green-600" : "text-[#086861]"
                  )}
                >
                  {stepData[activeStep].title}
                </h3>
                <p className="text-base">{stepData[activeStep].description}</p>
              </motion.div>
            </AnimatePresence>

            {/* CTA Button for Step 1 only */}

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/sign-up")}
              className={clsx(
                "mt-4 px-6 py-3 text-base md:w-full lg:w-md rounded-full font-semibold w-fit",
                darkMode
                  ? "bg-green-600 text-white"
                  : "bg-[#086861] text-white shadow-lg"
              )}
            >
              Start free trial
            </motion.button>
          </div>
        </div>

        {/* Right: Video Placeholder */}
        <motion.div
          className={clsx(
            "rounded-2xl flex items-center justify-center w-full h-64 md:h-80",
            darkMode ? "bg-green-800" : "bg-[#086861]"
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Play Icon */}
          <FontAwesomeIcon
            icon={faPlay}
            className="md:text-4xl lg:text-7xl text-white"
          />
        </motion.div>
      </div>

      {/* Logo Carousel */}
      <motion.div
        className="py-20 overflow-hidden select-none w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-3xl px-20 font-bold mb-8">
          Trusted by 10,000+ Doctors, Clinics & Hospitals Worldwide
        </p>

        <motion.div
          className="flex gap-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 10,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <div
              key={idx}
              className={clsx(
                "w-40 aspect-square rounded-2xl overflow-hidden bg-white p-4 shadow flex items-center justify-center",
                darkMode && "bg-gray-100"
              )}
            >
              <Image
                src={logo}
                alt={`logo-${idx}`}
                width={160}
                height={160}
                className="object-contain w-full h-full"
                priority={idx < 8}
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
