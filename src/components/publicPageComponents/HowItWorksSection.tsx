"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700","900"],
});

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
  "/assets/prelogin-img/logo/logon1.png",
  "/assets/prelogin-img/logo/logon2.png",
  "/assets/prelogin-img/logo/logon3.png",
  "/assets/prelogin-img/logo/logon4.png",
  "/assets/prelogin-img/logo/logon5.png",
  "/assets/prelogin-img/logo/logon6.png",
  "/assets/prelogin-img/logo/logon7.png",
  "/assets/prelogin-img/logo/logon5.png",
  "/assets/prelogin-img/logo/logon1.png",
  "/assets/prelogin-img/logo/logon2.png",
  "/assets/prelogin-img/logo/logon3.png",
  "/assets/prelogin-img/logo/logon4.png",
  "/assets/prelogin-img/logo/logon5.png",
  "/assets/prelogin-img/logo/logon6.png",
  "/assets/prelogin-img/logo/logon7.png",
  "/assets/prelogin-img/logo/logon5.png",
  "/assets/prelogin-img/logo/logon1.png",
  "/assets/prelogin-img/logo/logon2.png",
  "/assets/prelogin-img/logo/logon3.png",
  "/assets/prelogin-img/logo/logon4.png",
  "/assets/prelogin-img/logo/logon5.png",
  "/assets/prelogin-img/logo/logon6.png",
  "/assets/prelogin-img/logo/logon7.png",
  "/assets/prelogin-img/logo/logon5.png"
  
];

const duplicatedLogos = [...logos, ...logos];

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
        className={clsx("text-3xl sm:text-4xl md:text-5xl bg-[#086861] py-6 sm:py-12 px-4 sm:px-10 md:px-20 text-white font-bold mb-4 ",inter.className)}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        How It Works
      </motion.h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10 px-4 sm:px-8 md:px-16 items-start">
        {/* Left: Steps */}
        <div className="flex flex-col lg:flex-row lg:items-center items-center gap-6 w-full">
          {/* Step Buttons */}
          <div className="flex lg:flex-col flex-row gap-6 items-center flex-wrap justify-center">
            {stepData.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveStep(i)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={clsx(
                  "w-10 h-10 sm:w-12 sm:h-12 rounded-full cursor-pointer flex items-center justify-center font-bold text-base sm:text-lg border-2 transition",
                  i === activeStep
                    ? "bg-[#086861] text-white border-green-700"
                    : darkMode
                    ? "bg-gray-800 text-[#005C56] border-gray-600"
                    : "bg-white text-[#005C5645] border-gray-300 shadow"
                    
                )}
              >
                                {i + 1}
                
                
              </motion.button>
            ))}
          </div>

          {/* Step Text */}
          <div className="flex flex-col justify-center items-center text-center px-4">
            <motion.h3
              className={clsx(
                "text-2xl sm:text-3xl font-black mb-4",
                darkMode ? "text-green-600" : "text-[#005C56]"
                , inter.className
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Get Started in 3 Simple Steps
            </motion.h3>
<AnimatePresence mode="wait">
  <motion.div
    key={activeStep}
    initial={{ opacity: 0, rotateY: 90 }}
    animate={{ opacity: 1, rotateY: 0 }}
    exit={{ opacity: 0, rotateY: -90 }}
    transition={{ duration: 0.5 }}
    className={clsx(
      " sm:p-8 m-6 sm:m-10 rounded-xl shadow-2xl w-full p-4  lg:max-w-md sm:max-w-lg",
      darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900",
      inter.className
    )}
  >
    <motion.h3
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className={clsx(
        "text-xl lg:text-start sm:text-2xl sm:mt-10 lg:m-2   font-bold mb-2",
        darkMode ? "text-green-600" : "text-[#086861]"
      )}
    >
      {stepData[activeStep].title}
    </motion.h3>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="sm:text-lg lg:text-xl font-light lg:text-start lg:mt-5 md:mb-10 lg:mb-6 sm:text-base"
    >
      {stepData[activeStep].description}
    </motion.p>
  </motion.div>
</AnimatePresence>


            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring" }}
              onClick={() => router.push("/sign-up")}
              className={clsx(
                "mt-2 sm:mt-4 px-4 sm:px-6 py-2 sm:py-3 text-md cursor-pointer sm:text-base md:w-full lg:w-sm rounded-full font-bold w-fit",
                darkMode
                  ? "bg-green-600 text-white"
                  : "bg-[#086861] text-white shadow-lg"
                  ,inter.className
              )}
            >
              Start free trial
            </motion.button>
          </div>
        </div>

        {/* Right: Video Placeholder */}
        <motion.div
          className={clsx(
            "rounded-2xl flex items-center justify-center w-full h-48 sm:h-64 md:h-80",
            darkMode ? "bg-green-800" : "bg-[#086861]"
          )}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.9,
              ease: "easeInOut",
            }}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-3xl sm:text-4xl lg:text-7xl text-white"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Logo Carousel */}
      <motion.div
        className="py-16 sm:py-20 overflow-hidden select-none w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className={clsx("text-xl sm:text-2xl md:text-3xl px-4 sm:px-8 md:px-20 font-extrabold mb-6 sm:mb-8 text-center sm:text-left",roboto.className)}>
          Trusted by 10,000+ Doctors, Clinics & Hospitals Worldwide
        </p>

        <motion.div
          className="flex gap-6 sm:gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((logo, idx) => (
            <motion.div
              key={idx}
              className={clsx(
                "w-45 sm:w-32 md:w-45 aspect-square rounded-2xl overflow-hidden  p-4  flex items-center justify-center",
                darkMode && ""
              )}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.1,
              }}
            >
              <Image
                src={logo}
                alt={`logo-${idx}`}
                width={200}
                height={160}
                className="object-contain"
                priority={idx < 8}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;
