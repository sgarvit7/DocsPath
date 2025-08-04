import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  currentStep,
}) => {
  const getProgressPercentage = () => {
    switch (currentStep) {
      case 1:
        return 20;
      case 2:
        return 40;
      case 3:
        return 60;
      case 4:
        return 80;
      default:
        return 80;
    }
  };

  const getImage = () => {
    switch (currentStep) {
      case 1:
        return "/assets/onboarding/docs/doc.jpeg";
      case 2:
        return "/assets/onboarding/docs/doc8.avif";
      case 3:
        return "/assets/onboarding/docs/doc100.webp";
      case 4:
        return "/assets/onboarding/docs/doc77.png";
      default:
        return "/assets/onboarding/docs/doc10.jpeg";
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 overflow-hidden">
      <div className="fixed top-4 right-4 z-50">
        <a
          href="/sign-up"
          className="bg-teal-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-medium hover:bg-teal-700 transition"
        >
          Register as a Admin
        </a>
      </div>

      {/* Background decorative elements */}
      <Image
        src="/assets/bg-pattern.png"
        alt=""
        width={500}
        height={350}
        className="absolute -top-10 -left-10 z-0 opacity-50 rotate-180"
      />
      <Image
        src="/assets/lower-bg-pattern.png"
        alt=""
        width={500}
        height={350}
        className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-50"
      />

      {/* Main container */}
      <div className="flex items-center justify-center p-4 z-50">
       <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.3 }}
  className="bg-white rounded-2xl mt-10 shadow-2xl z-50 overflow-hidden w-full max-w-4xl"
  style={{ minHeight: "500px" }}
>
  <div className="flex flex-col lg:flex-row h-full">
    {/* Left side - Branding */}
    <div className="w-full lg:w-[380px] h-60 lg:h-auto bg-[white] relative overflow-hidden text-white">
      <div className="h-full">
        <Image
          src={getImage()}
          alt="Docspath"
          width={1100}
          height={100}
          className="object-cover w-full h-full"
        />
      </div>
    </div>

    {/* Right side - Form content */}
    <div className="w-full lg:w-2/3 p-6 sm:p-8 overflow-y-auto max-h-[75vh] flex flex-col">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#086861] mb-1 sm:mb-2">
          Doctor onboarding
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm">
          Sign Up & Begin Your Journey!
        </p>

        {/* Progress bar */}
        <div className="mt-4 sm:mt-6">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <motion.div
              className="bg-[#086861] h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <div className="flex justify-center items-center m-2">
            <div className="text-right text-[#086861] font-bold text-xs sm:text-sm">
              {getProgressPercentage()}%
            </div>
          </div>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1">{children}</div>
    </div>
  </div>
</motion.div>

      </div>
    </div>
  );
};

export default OnboardingLayout;
